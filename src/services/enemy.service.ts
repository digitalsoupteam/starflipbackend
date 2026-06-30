import { rC } from "../storage/activeMatchesStorage";
import { db } from "../storage/playersDataBase";
import { findPlayerById } from "../storage/playersDataBaseActions";
import { joinWaitingMatch } from "./matchMaking.service";
import { moveInMatch } from "./match.service";
import { parseUsdtToUnits } from "../utils/usdt";

/** Bot player IDs — UUID format so they look like regular players */
const BOTS = [
  "a3f8c201-94b7-4e5d-82c3-d7f192a05b8e",
  "b7e2d490-1c83-4f6a-95b2-e3c817d04f2a",
  "c91a5b73-2d84-4e8f-b103-f4d926c18e3b",
];
const BOT_SET = new Set(BOTS);

const BOT_INITIAL_BALANCE = "4000"; // 4,000 USDT
const BOT_INITIAL_PTS    = 400;
const JOIN_AFTER_MS      = 30_000;
const SCAN_INTERVAL_MS   = 5_000;
const MOVE_MIN_MS        = 2_000;
const MOVE_MAX_MS        = 5_000;
const MAINTENANCE_MODE   = true;

function randomDelay(): Promise<void> {
  const ms = MOVE_MIN_MS + Math.random() * (MOVE_MAX_MS - MOVE_MIN_MS);
  return new Promise((r) => setTimeout(r, ms));
}

function ensureBots(): void {
  // Migrate legacy bot_001 → first bot ID
  const legacy = db.prepare("SELECT playerId FROM players WHERE playerId = ?").get("bot_001");
  if (legacy) {
    db.prepare("UPDATE players SET playerId = ? WHERE playerId = 'bot_001'").run(BOTS[0]);
    console.log(`[EnemyService] Migrated bot_001 → ${BOTS[0]}`);
  }

  for (const botId of BOTS) {
    const exists = db.prepare("SELECT playerId FROM players WHERE playerId = ?").get(botId);
    if (!exists) {
      db.prepare(
        `INSERT INTO players (playerId, playerBalance, points, games, wins)
         VALUES (?, ?, ?, 0, 0)`,
      ).run(botId, BOT_INITIAL_BALANCE, BOT_INITIAL_PTS);
      console.log(`[EnemyService] Created bot ${botId}`);
    }
  }
}

/** On startup: if the bot's activeMatch key points at a dead/finished match,
 *  clear it so the bot can pick up new games. If the match is still active,
 *  resume watching it. */
async function recoverBot(botId: string): Promise<void> {
  const matchId = await rC.get(`player:${botId}:activeMatch`);
  if (!matchId) return;

  const raw = await rC.get(`match:${matchId}`);
  if (!raw) {
    await rC.del(`player:${botId}:activeMatch`);
    console.log(`[EnemyService] ${botId.slice(0, 8)}: cleared stale activeMatch (${matchId})`);
    return;
  }

  const match = JSON.parse(raw);
  if (match.status === "finished") {
    await rC.del(`player:${botId}:activeMatch`);
    console.log(`[EnemyService] ${botId.slice(0, 8)}: cleared finished activeMatch`);
    return;
  }

  console.log(`[EnemyService] ${botId.slice(0, 8)}: resuming watch on match ${matchId}`);
  watchMatch(botId, matchId);
}

async function tryJoinForBot(botId: string): Promise<void> {
  const active = await rC.get(`player:${botId}:activeMatch`);
  if (active) return;

  const keys = await rC.keys("waiting:match:*");
  const now  = Date.now();

  for (const key of keys) {
    if (key.includes(":trylock") || key.includes(":join")) continue;

    const raw = await rC.get(key);
    if (!raw) continue;

    let match: any;
    try { match = JSON.parse(raw); } catch { continue; }

    if (match.status !== "waiting") continue;
    if (match.creator === botId) continue;
    if (BOT_SET.has(match.creator)) continue;          // never join another bot's match
    if ((match.players?.length ?? 0) >= 2) continue;

    const age = now - (match.createdAt ?? now);
    if (age < JOIN_AFTER_MS) continue;

    const bot = findPlayerById(botId);
    if (!bot) continue;
    const bal = parseUsdtToUnits(bot.playerBalance ?? "0");
    const bid = parseUsdtToUnits(match.bid ?? "0");
    if (bid === 0n || bal < bid) continue;

    console.log(`[EnemyService] ${botId.slice(0, 8)}: joining ${match.matchId} (age ${Math.round(age / 1000)}s)`);

    const joined = await joinWaitingMatch(botId, match.matchId, "");
    if (joined) {
      console.log(`[EnemyService] ${botId.slice(0, 8)}: joined ${joined.matchId}, turn=${joined.currentTurn}`);
      watchMatch(botId, joined.matchId);
    }

    break; // one match per scan cycle
  }
}

async function watchMatch(botId: string, matchId: string): Promise<void> {
  let moving = false;

  const interval = setInterval(async () => {
    if (moving) return;

    try {
      const raw = await rC.get(`match:${matchId}`);
      if (!raw) { clearInterval(interval); return; }

      const match = JSON.parse(raw);

      if (match.status === "finished") {
        clearInterval(interval);
        console.log(`[EnemyService] ${botId.slice(0, 8)}: match ${matchId} finished`);
        return;
      }

      if (match.status !== "active" || match.currentTurn !== botId) return;

      const closed: any[] = match.board.filter((c: any) => !c.openedBy);
      if (closed.length === 0) return;

      moving = true;
      await randomDelay();

      const cell        = closed[Math.floor(Math.random() * closed.length)];
      const clientMoveId = `bot_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      const result      = await moveInMatch(matchId, botId, cell.id, clientMoveId);

      if (result.error) {
        console.warn(`[EnemyService] ${botId.slice(0, 8)}: move error — ${result.error}`);
      }
      if (result.match?.status === "finished") {
        clearInterval(interval);
        console.log(`[EnemyService] ${botId.slice(0, 8)}: match ${matchId} finished after move`);
      }

      moving = false;
    } catch (err) {
      console.error(`[EnemyService] ${botId.slice(0, 8)}: error in ${matchId}:`, err);
      moving = false;
    }
  }, 1_000);
}

export function startEnemyService(): void {
  if (MAINTENANCE_MODE) {
    console.log("[EnemyService] Disabled during technical work");
    return;
  }

  ensureBots();

  // Recover all bots from potential stale state, then start their scan loops
  Promise.all(BOTS.map(recoverBot)).then(() => {
    BOTS.forEach((botId, i) => {
      // Stagger start times to reduce simultaneous join attempts on the same match
      setTimeout(() => {
        setInterval(() => tryJoinForBot(botId), SCAN_INTERVAL_MS);
      }, i * 1_500); // 0s / 1.5s / 3s
    });
  });

  console.log(`[EnemyService] Started — ${BOTS.length} bots, join after ${JOIN_AFTER_MS / 1000}s`);
}
