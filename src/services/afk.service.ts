import { rC, activeSave } from "../storage/activeMatchesStorage";
import { Match } from "../structures/match.struct";
import { updatePlayersStatsWithRank, depositBalance } from "../storage/playersDataBaseActions";

const AFK_TIMEOUT_MS = 5 * 60 * 1000;
const CHECK_INTERVAL_MS = 15 * 1000;

/* AFK payout: afk player keeps only what they opened; active player takes all remaining cells */
function calcAfkBalances(
  match: Match,
  afkPlayerId: string,
): Record<string, string> {
  const activePlayerId = match.players.find((p) => p !== afkPlayerId)!;

  const afkOpened = BigInt(match.balances[afkPlayerId] ?? "0");
  const activeOpened = BigInt(match.balances[activePlayerId] ?? "0");

  const unopenedTotal = match.board
    .filter((box) => !box.openedBy)
    .reduce((acc, box) => acc + BigInt(box.value), 0n);

  const activeTotal = activeOpened + unopenedTotal;

  return {
    [afkPlayerId]: afkOpened.toString(),
    [activePlayerId]: activeTotal.toString(),
  };
}

async function finalizeAfkMatch(
  match: Match,
  afkPlayerId: string,
): Promise<void> {
  const activePlayerId = match.players.find((p) => p !== afkPlayerId)!;

  const finalBalances = calcAfkBalances(match, afkPlayerId);

  const finishedMatch: Match = {
    ...match,
    status: "finished",
    currentTurn: undefined,
    balances: finalBalances,
  };

  await activeSave(finishedMatch);

  await rC.set(
    `matchMeta:${match.matchId}`,
    JSON.stringify({ matchId: match.matchId, status: "finished" }),
  );

  updatePlayersStatsWithRank(match.players, activePlayerId, finalBalances);

  // 2-minute TTL — Redis cleans itself up
  const expireSec = 120;
  await rC.expire(`match:${match.matchId}`, expireSec);
  await rC.expire(`matchMeta:${match.matchId}`, expireSec);
  for (const playerId of match.players) {
    await rC.expire(`player:${playerId}:activeMatch`, expireSec);
  }

  console.log(
    `AFK finalize: match ${match.matchId}, afk=${afkPlayerId}, active=${activePlayerId}`,
  );
  console.table(
    match.players.map((p) => ({
      playerId: p,
      payout: finalBalances[p],
      role: p === afkPlayerId ? "AFK" : "WINNER",
    })),
  );
}

/* Cleans up a stuck match (no currentTurn) — refunds each unique player their bid */
async function cleanupStuckMatch(match: Match): Promise<void> {
  const seen = new Set<string>();
  for (const playerId of match.players) {
    if (!seen.has(playerId)) {
      seen.add(playerId);
      const count = match.players.filter((p) => p === playerId).length;
      try {
        depositBalance(playerId, BigInt(match.bid) * BigInt(count));
      } catch (err) {
        console.error(`Stuck match refund error for ${playerId}:`, err);
      }
    }
  }
  await rC.del(`match:${match.matchId}`);
  await rC.del(`matchMeta:${match.matchId}`);
  for (const playerId of seen) {
    await rC.del(`player:${playerId}:activeMatch`);
  }
  console.log(`Stuck match ${match.matchId} cleaned up, refunded ${match.bid} × count to unique players`);
}

async function checkMatchAfk(matchId: string): Promise<void> {
  const raw = await rC.get(`match:${matchId}`);
  if (!raw) return;

  let match: Match;
  try {
    match = JSON.parse(raw) as Match;
  } catch {
    return;
  }

  if (match.status !== "active") return;

  // No currentTurn means the match is stuck (e.g. player joined their own match).
  // Clean it up after the AFK timeout so the player isn't blocked forever.
  if (!match.currentTurn) {
    const elapsed = Date.now() - match.turnStartedAt;
    if (elapsed >= AFK_TIMEOUT_MS) {
      console.log(`Stuck match detected: ${match.matchId}, cleaning up`);
      await cleanupStuckMatch(match);
    }
    return;
  }

  const elapsed = Date.now() - match.turnStartedAt;
  if (elapsed < AFK_TIMEOUT_MS) return;

  const afkPlayerId = match.currentTurn;

  console.log(
    `AFK detected: match ${match.matchId}, player ${afkPlayerId}, elapsed ${Math.round(elapsed / 1000)}s`,
  );

  await finalizeAfkMatch(match, afkPlayerId);
}

export function startAfkWatcher(): void {
  console.log(
    `AFK watcher started (timeout=${AFK_TIMEOUT_MS / 1000}s, interval=${CHECK_INTERVAL_MS / 1000}s)`,
  );

  setInterval(async () => {
    try {
      // SCAN instead of KEYS to avoid blocking Redis
      let cursor = "0";
      do {
        const result = await rC.scan(cursor, {
          MATCH: "match:*",
          COUNT: 100,
        });

        cursor = result.cursor;

        for (const key of result.keys) {
          // Skip match:123:lock, match:123:join, etc. — only process match:{matchId}
          const parts = key.split(":");
          if (parts.length !== 2) continue;

          const matchId = parts[1];
          await checkMatchAfk(matchId).catch((err) => {
            console.error(`AFK check error for match ${matchId}:`, err);
          });
        }
      } while (cursor !== "0");
    } catch (err) {
      console.error("AFK watcher error:", err);
    }
  }, CHECK_INTERVAL_MS);
}
