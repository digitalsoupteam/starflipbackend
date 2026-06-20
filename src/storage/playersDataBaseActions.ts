import { db } from "./playersDataBase";
import { generateWallet } from "../utils/wallet";

export interface PlayerRecord {
  playerId: string;
  playerBalance: string;
  games: number;
  wins: number;
  points: number;
  telegramId?: string;
  googleId?: string;
  inviteCode?: string;
  referrerId?: string;
  referralUsdtEarned?: string;
}

const RANKS = [
  { name: "Flipper Rank 1", games: 100, wins: 50 },
  { name: "Flipper Rank 2", games: 50, wins: 25 },
  { name: "Flipper Rank 3", games: 25, wins: 15 },
  { name: "Flipper Rank 4", games: 10, wins: 5 },
  { name: "Flipper Rank 5", games: 10, wins: 0 },
  { name: "Early Adopter", games: 0, wins: 0 },
];

export function getRank(games: number, wins: number) {
  for (const rank of RANKS) {
    if (games >= rank.games && wins >= rank.wins) {
      return rank.name;
    }
  }
  return "Early Adopter";
}

// ── Invite codes ──────────────────────────────────────────────────────────────

function generateInviteCode(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function ensureInviteCode(playerId: string): string {
  const record = db
    .prepare("SELECT inviteCode FROM players WHERE playerId = ?")
    .get(playerId) as any;

  if (record?.inviteCode) return record.inviteCode;

  let code = generateInviteCode();
  while (db.prepare("SELECT 1 FROM players WHERE inviteCode = ?").get(code)) {
    code = generateInviteCode();
  }

  db.prepare("UPDATE players SET inviteCode = ? WHERE playerId = ?").run(
    code,
    playerId,
  );

  return code;
}

export function findPlayerByInviteCode(code: string) {
  return db
    .prepare("SELECT * FROM players WHERE inviteCode = ?")
    .get(code) as any;
}

// ── Referral ──────────────────────────────────────────────────────────────────

/** Referrer is set once and never changed */
export function setReferrer(playerId: string, referrerId: string): boolean {
  if (playerId === referrerId) return false;

  const record = db
    .prepare("SELECT referrerId FROM players WHERE playerId = ?")
    .get(playerId) as any;

  if (!record || record.referrerId) return false;

  db.prepare("UPDATE players SET referrerId = ? WHERE playerId = ?").run(
    referrerId,
    playerId,
  );
  return true;
}

/** +5 pts + 50% of the fixed integer USDT fee, credited each time the referred player finishes a game */
export function addReferralReward(
  referrerId: string,
  feeShare: bigint,
): void {
  const record = db
    .prepare(
      "SELECT playerBalance, points, referralUsdtEarned FROM players WHERE playerId = ?",
    )
    .get(referrerId) as any;

  if (!record) return;

  const newBalance =
    BigInt(record.playerBalance ?? "0") + feeShare;
  const newPoints = (record.points ?? 0) + 5;
  const newReferralUsdt =
    BigInt(record.referralUsdtEarned ?? "0") + feeShare;

  db.prepare(`
    UPDATE players
    SET playerBalance = ?, points = ?, referralUsdtEarned = ?
    WHERE playerId = ?
  `).run(
    newBalance.toString(),
    newPoints,
    newReferralUsdt.toString(),
    referrerId,
  );
}

// ── Lookup ────────────────────────────────────────────────────────────────────

export function findPlayerById(playerId: string) {
  return db
    .prepare(`SELECT * FROM players WHERE playerId = ?`)
    .get(playerId) as any;
}

export function findPlayerByTelegramId(telegramId: string) {
  return db
    .prepare(`SELECT * FROM players WHERE telegramId = ?`)
    .get(telegramId) as any;
}

export function findPlayerByGoogleId(googleId: string) {
  return db
    .prepare(`SELECT * FROM players WHERE googleId = ?`)
    .get(googleId) as any;
}

export function findPlayerByWalletAddress(walletAddress: string) {
  return db
    .prepare(`SELECT * FROM players WHERE walletAddress = ?`)
    .get(walletAddress) as any;
}

// ── Create / Link ─────────────────────────────────────────────────────────────

export function createPlayer() {
  const playerId = crypto.randomUUID();
  const { address, encryptedPrivateKey } = generateWallet();

  db.prepare(
    `INSERT INTO players (playerId, walletAddress, encryptedPrivateKey)
     VALUES (?, ?, ?)`,
  ).run(playerId, address, encryptedPrivateKey);

  ensureInviteCode(playerId);

  return findPlayerById(playerId);
}

export function linkTelegram(playerId: string, telegramId: string) {
  db.prepare(
    `UPDATE players SET telegramId = ? WHERE playerId = ?`,
  ).run(telegramId, playerId);
}

export function linkGoogle(playerId: string, googleId: string) {
  db.prepare(
    `UPDATE players SET googleId = ? WHERE playerId = ?`,
  ).run(googleId, playerId);
}

// ── Stats ─────────────────────────────────────────────────────────────────────

export function updatePlayersStatsWithRank(
  players: string[],
  winner: string,
  matchBalances: Record<string, string>,
) {
  const selectStmt = db.prepare(`SELECT * FROM players WHERE playerId = ?`);

  const updateStmt = db.prepare(`
    UPDATE players
    SET
      games = games + 1,
      wins = wins + @winIncrement,
      points = points + @pointsIncrement,
      playerBalance = @newBalance,
      lastGameAt = @lastGameAt
    WHERE playerId = @playerId
  `);

  const transaction = db.transaction(() => {
    for (const playerId of players) {
      const record = selectStmt.get(playerId) as any;
      if (!record) throw new Error(`Player ${playerId} not found`);

      const isWinner = playerId === winner;
      const dbBalance = BigInt(record.playerBalance ?? "0");
      const matchResult = BigInt(matchBalances[playerId] ?? "0");
      const newBalance = dbBalance + matchResult;

      updateStmt.run({
        playerId,
        winIncrement: isWinner ? 1 : 0,
        pointsIncrement: isWinner ? 30 : 10,
        newBalance: newBalance.toString(),
        lastGameAt: Date.now(),
      });
    }
  });

  transaction();
}

// ── Balance helpers ───────────────────────────────────────────────────────────

function parseWholeUsdt(amount: string | number | bigint): bigint {
  if (typeof amount === "bigint") return amount;
  const text = String(amount).trim();
  if (!/^\d+(\.\d+)?$/.test(text)) {
    throw new Error(`Invalid USDT amount: ${amount}`);
  }
  return BigInt(text.split(".")[0] || "0");
}

export function depositBalance(playerId: string, amount: string | bigint) {
  const amt = parseWholeUsdt(amount);
  const record = db
    .prepare(`SELECT playerBalance FROM players WHERE playerId = ?`)
    .get(playerId) as any;
  if (!record) throw new Error(`Player ${playerId} not found`);
  const newBalance = BigInt(record.playerBalance ?? "0") + amt;
  db.prepare(`UPDATE players SET playerBalance = ? WHERE playerId = ?`).run(
    newBalance.toString(),
    playerId,
  );
}

export function withdrawBalance(playerId: string, amount: string | bigint) {
  const amt = parseWholeUsdt(amount);
  const record = db
    .prepare(`SELECT playerBalance FROM players WHERE playerId = ?`)
    .get(playerId) as any;
  if (!record) throw new Error(`Player ${playerId} not found`);
  const current = BigInt(record.playerBalance ?? "0");
  if (current < amt)
    throw new Error(`Insufficient balance for player ${playerId}`);
  db.prepare(`UPDATE players SET playerBalance = ? WHERE playerId = ?`).run(
    (current - amt).toString(),
    playerId,
  );
}

// ── Faucet / Points ───────────────────────────────────────────────────────────

const FAUCET_AMOUNT = 2_000n; // 2,000 test USDT
const FAUCET_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24h

export function claimFaucet(playerId: string): {
  success: boolean;
  reason?: string;
  balance?: string;
} {
  const record = db
    .prepare(`SELECT * FROM players WHERE playerId = ?`)
    .get(playerId) as any;
  if (!record) return { success: false, reason: "Player not found" };

  const now = Date.now();
  const elapsed = now - (record.lastFaucetAt ?? 0);

  if (elapsed < FAUCET_COOLDOWN_MS) {
    const remainingHours = Math.ceil(
      (FAUCET_COOLDOWN_MS - elapsed) / 1000 / 60 / 60,
    );
    return { success: false, reason: `Come back in ${remainingHours} hour(s)` };
  }

  const newBalance = BigInt(record.playerBalance ?? "0") + FAUCET_AMOUNT;
  db.prepare(
    `UPDATE players SET playerBalance = ?, lastFaucetAt = ? WHERE playerId = ?`,
  ).run(newBalance.toString(), now, playerId);

  return { success: true, balance: newBalance.toString() };
}

export const DAILY_POINTS = 30;
export const FIRST_LOGIN_POINTS = 300;
const POINTS_COOLDOWN_MS = 24 * 60 * 60 * 1000;

export function claimDailyPoints(playerId: string): {
  success: boolean;
  reason?: string;
  points?: number;
  isFirstLogin?: boolean;
} {
  const record = db
    .prepare(`SELECT * FROM players WHERE playerId = ?`)
    .get(playerId) as any;
  if (!record) return { success: false, reason: "Player not found" };

  const now = Date.now();
  const lastClaim = record.lastPointsAt ?? 0;
  const elapsed = now - lastClaim;
  const isFirstLogin = lastClaim === 0;

  if (!isFirstLogin && elapsed < POINTS_COOLDOWN_MS) {
    const remainingHours = Math.ceil(
      (POINTS_COOLDOWN_MS - elapsed) / 1000 / 60 / 60,
    );
    return { success: false, reason: `Come back in ${remainingHours} hour(s)` };
  }

  const pointsToAdd = isFirstLogin ? FIRST_LOGIN_POINTS : DAILY_POINTS;
  const newPoints = (record.points ?? 0) + pointsToAdd;

  db.prepare(
    `UPDATE players SET points = ?, lastPointsAt = ? WHERE playerId = ?`,
  ).run(newPoints, now, playerId);

  return { success: true, points: newPoints, isFirstLogin };
}
