import { Match, MoveResult } from "../structures/match.struct";
import { makeMove } from "./game.service";
import { rC, activeSave, GetResult } from "../storage/activeMatchesStorage";
import { setActiveMatch } from "./playerMatch.service";

export function startMatch(match: Match): Match {
  if (match.players.length !== 2) {
    throw new Error("You need to wait for the second player to join before you can start.");
  }

  const [p1, p2] = match.players;
  const currentTurn = Math.random() < 0.5 ? p1 : p2;

  return {
    ...match,
    balances: { [p1]: "0", [p2]: "0" },
    currentTurn,
    turnStartedAt: Date.now(),
  };
}

export async function startAndSaveMatch(match: Match): Promise<Match> {
  const newMatch = startMatch(match);

  const saveRes = await activeSave(newMatch);

  if (!saveRes.ok) {
    console.error("The match could not be saved", saveRes.error);
  }

  // matchMeta survives the main match TTL -- used by resume flow
  const matchMetaKey = `matchMeta:${newMatch.matchId}`;
  try {
    await rC.set(
      matchMetaKey,
      JSON.stringify({
        matchId: newMatch.matchId,
        status: newMatch.status,
      }),
    );
  } catch (err) {
    console.error("Failed to save matchMeta:", err);
  }

  for (const p of newMatch.players) {
    await setActiveMatch(p, newMatch.matchId);
  }
  return newMatch;
}

export async function saveMatch(match: Match): Promise<boolean> {
  const res = await activeSave(match);

  if (!res.ok) {
    console.error(`Redis save error (match ${match.matchId})`, res.error);
    return false;
  }

  return true;
}

export async function getMatch(matchId: string): Promise<GetResult> {
  try {
    const data = await rC.get(`match:${matchId}`);
    if (!data) return { ok: false, error: "not_found" };
    return { ok: true, match: JSON.parse(data) as Match };
  } catch (error) {
    return { ok: false, error: "storage_error" };
  }
}

export async function moveInMatch(
  matchId: string,
  playerId: string,
  boxId: number,
  clientMoveId: string,
): Promise<MoveResult> {
  const lockKey = `match:${matchId}:lock`;
  const cooldownKey = `player:${playerId}:cooldown`;

  const isCoolingDown = await rC.get(cooldownKey);
  if (isCoolingDown) {
    return { error: "too fast, wait for your turn" };
  }

  // 3-second distributed lock prevents concurrent moves on the same match
  const locked = await rC.set(lockKey, "1", { NX: true, PX: 3000 });
  if (!locked) {
    return { error: "match is busy" };
  }

  try {
    const res = await getMatch(matchId);

    if (!res.ok) {
      if (res.error === "not_found") {
        return { error: "match not found" };
      }
      return { error: "storage error" };
    }

    const match = res.match;

    if (!clientMoveId) {
      return { error: "clientMoveId required" };
    }

    // Idempotent: frontend may retry the same move on reconnect
    if (match.lastMoveId === clientMoveId) {
      return { match };
    }

    if (!match.currentTurn || match.currentTurn !== playerId) {
      // Penalize wrong-turn attempts to prevent spam
      await rC.set(cooldownKey, "1", { PX: 15000 });
      return { error: "its not your turn" };
    }

    const result = await makeMove(match, playerId, boxId);

    if (!result.error && result.match) {
      result.match.lastMoveId = clientMoveId;
      result.match.turnStartedAt = Date.now();
    }

    if (!result.error && result.match && result.match.status !== "finished") {
      const saved = await saveMatch(result.match);
      if (saved) {
        for (const p of result.match.players) {
          await setActiveMatch(p, result.match.matchId);
        }
      }
      if (!saved) {
        return { error: "failed to save match" };
      }
    }

    return result;
  } finally {
    await rC.del(lockKey);
  }
}
