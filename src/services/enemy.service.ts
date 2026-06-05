import { rC } from "../storage/activeMatchesStorage";
import { db } from "../storage/playersDataBase";
import { findPlayerById } from "../storage/playersDataBaseActions";
import { joinWaitingMatch } from "./matchMaking.service";
import { moveInMatch } from "./match.service";

const BOT_ID = "bot_001";
const BOT_INITIAL_BALANCE = "3000000000000000000"; // 3 ETH
const JOIN_AFTER_MS = 30_000; // join waiting match after 30 s
const SCAN_INTERVAL_MS = 5_000;
const MOVE_MIN_MS = 2_000;
const MOVE_MAX_MS = 5_000;

function ensureBot(): void {
  const exists = db.prepare("SELECT playerId FROM players WHERE playerId = ?").get(BOT_ID);
  if (!exists) {
    db.prepare(
      `INSERT INTO players (playerId, playerBalance, points, games, wins)
       VALUES (?, ?, 0, 0, 0)`,
    ).run(BOT_ID, BOT_INITIAL_BALANCE);
    console.log(`[EnemyService] Bot player created (${BOT_ID})`);
  }
}

function randomDelay(): Promise<void> {
  const ms = MOVE_MIN_MS + Math.random() * (MOVE_MAX_MS - MOVE_MIN_MS);
  return new Promise((r) => setTimeout(r, ms));
}

async function isBotBusy(): Promise<boolean> {
  const active = await rC.get(`player:${BOT_ID}:activeMatch`);
  return !!active;
}

async function tryJoin(): Promise<void> {
  if (await isBotBusy()) return;

  const keys = await rC.keys("waiting:match:*");
  const now = Date.now();

  for (const key of keys) {
    if (key.includes(":trylock") || key.includes(":join")) continue;

    const raw = await rC.get(key);
    if (!raw) continue;

    let match: any;
    try { match = JSON.parse(raw); } catch { continue; }

    if (match.status !== "waiting") continue;
    if (match.creator === BOT_ID) continue;
    if ((match.players?.length ?? 0) >= 2) continue;

    const age = now - (match.createdAt ?? now);
    if (age < JOIN_AFTER_MS) continue;

    const bot = findPlayerById(BOT_ID);
    if (!bot) continue;
    const botBalance = BigInt(bot.playerBalance ?? "0");
    const bid = BigInt(match.bid ?? "0");
    if (botBalance < bid || bid === 0n) continue;

    console.log(`[EnemyService] Bot joining match ${match.matchId} (age ${Math.round(age / 1000)}s)`);

    const joined = await joinWaitingMatch(BOT_ID, match.matchId, "");
    if (joined) {
      console.log(`[EnemyService] Bot joined match ${joined.matchId}, currentTurn=${joined.currentTurn}`);
      watchMatch(joined.matchId);
    }

    break; // one match at a time
  }
}

async function watchMatch(matchId: string): Promise<void> {
  let moving = false;

  const interval = setInterval(async () => {
    if (moving) return;

    try {
      const raw = await rC.get(`match:${matchId}`);
      if (!raw) {
        clearInterval(interval);
        return;
      }

      const match = JSON.parse(raw);

      if (match.status === "finished") {
        clearInterval(interval);
        console.log(`[EnemyService] Match ${matchId} finished`);
        return;
      }

      if (match.status !== "active" || match.currentTurn !== BOT_ID) return;

      const closed: any[] = match.board.filter((c: any) => !c.openedBy);
      if (closed.length === 0) return;

      moving = true;

      await randomDelay();

      const cell = closed[Math.floor(Math.random() * closed.length)];
      const clientMoveId = `bot_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

      const result = await moveInMatch(matchId, BOT_ID, cell.id, clientMoveId);

      if (result.error) {
        console.warn(`[EnemyService] Move error in ${matchId}: ${result.error}`);
      } else {
        console.log(`[EnemyService] Bot moved cell ${cell.id} in match ${matchId}`);
      }

      if (result.match?.status === "finished") {
        clearInterval(interval);
        console.log(`[EnemyService] Match ${matchId} finished after bot move`);
      }

      moving = false;
    } catch (err) {
      console.error(`[EnemyService] Watch error in match ${matchId}:`, err);
      moving = false;
    }
  }, 1_000);
}

export function startEnemyService(): void {
  ensureBot();
  setInterval(tryJoin, SCAN_INTERVAL_MS);
  console.log(`[EnemyService] Started — bot ID: ${BOT_ID}, joins after ${JOIN_AFTER_MS / 1000}s`);
}
