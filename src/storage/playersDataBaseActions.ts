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


export function createPlayer() {
  const playerId = crypto.randomUUID();
  const { address, encryptedPrivateKey } = generateWallet();

  db.prepare(
    `
    INSERT INTO players (playerId, walletAddress, encryptedPrivateKey)
    VALUES (?, ?, ?)
  `,
  ).run(playerId, address, encryptedPrivateKey);

  return findPlayerById(playerId);
}

export function linkTelegram(playerId: string, telegramId: string) {
  db.prepare(
    `
    UPDATE players
    SET telegramId = ?
    WHERE playerId = ?
  `,
  ).run(telegramId, playerId);
}

export function linkGoogle(playerId: string, googleId: string) {
  db.prepare(
    `
    UPDATE players
    SET googleId = ?
    WHERE playerId = ?
  `,
  ).run(googleId, playerId);
}

export function updatePlayersStatsWithRank(
  players: string[],
  winner: string,
  matchBalances: Record<string, string>,
) {
  const selectStmt = db.prepare(`
    SELECT * FROM players WHERE playerId = ?
  `);

  const updateStmt = db.prepare(`
    UPDATE players
    SET 
      games = games + 1,
      wins = wins + @winIncrement,
      points = points + @pointsIncrement,
      playerBalance = @newBalance
    WHERE playerId = @playerId
  `);

  const transaction = db.transaction(() => {
    for (const playerId of players) {
      const record = selectStmt.get(playerId) as any;

      if (!record) {
        throw new Error(`Player ${playerId} not found`);
      }

      const isWinner = playerId === winner;

      const dbBalance = BigInt(record.playerBalance ?? "0");
      const matchResult = BigInt(matchBalances[playerId] ?? "0");

      const newBalance = dbBalance + matchResult;

      updateStmt.run({
        playerId,
        winIncrement: isWinner ? 1 : 0,
        pointsIncrement: isWinner ? 30 : 10,
        newBalance: newBalance.toString(),
      });
    }
  });

  transaction();
}

export function depositBalance(playerId: string, amount: string | bigint) {
  const amt = typeof amount === "string" ? BigInt(amount) : amount;

  const record = db
    .prepare(`SELECT playerBalance FROM players WHERE playerId = ?`)
    .get(playerId) as any;

  if (!record) throw new Error(`Player ${playerId} not found`);

  const current = BigInt(record.playerBalance ?? "0");
  const newBalance = current + amt;

  db.prepare(
    `
    UPDATE players SET playerBalance = ?
    WHERE playerId = ?
  `,
  ).run(newBalance.toString(), playerId);
}

export function withdrawBalance(playerId: string, amount: string | bigint) {
  const amt = typeof amount === "string" ? BigInt(amount) : amount;

  const record = db
    .prepare(`SELECT playerBalance FROM players WHERE playerId = ?`)
    .get(playerId) as any;

  if (!record) throw new Error(`Player ${playerId} not found`);

  const current = BigInt(record.playerBalance ?? "0");

  if (current < amt) {
    throw new Error(`Insufficient balance for player ${playerId}`);
  }

  const newBalance = current - amt;

  db.prepare(
    `
    UPDATE players SET playerBalance = ?
    WHERE playerId = ?
  `,
  ).run(newBalance.toString(), playerId);
}

const FAUCET_AMOUNT = 10_000_000_000_000_000n; // 0.01 ETH
const FAUCET_COOLDOWN_MS = 24 * 60 * 60 * 1000;

export function claimFaucet(playerId: string): {
  success: boolean;
  reason?: string;
  balance?: string;
} {
  const record = db
    .prepare(`SELECT * FROM players WHERE playerId = ?`)
    .get(playerId) as any;

  if (!record) {
    return { success: false, reason: "Player not found" };
  }

  const now = Date.now();
  const lastClaim = record.lastFaucetAt ?? 0;
  const elapsed = now - lastClaim;

  // Проверяем cooldown
  if (elapsed < FAUCET_COOLDOWN_MS) {
    const remainingMs = FAUCET_COOLDOWN_MS - elapsed;
    const remainingHours = Math.ceil(remainingMs / 1000 / 60 / 60);
    return {
      success: false,
      reason: `Come back in ${remainingHours} hour(s)`,
    };
  }

  const current = BigInt(record.playerBalance ?? "0");
  const newBalance = current + FAUCET_AMOUNT;

  db.prepare(
    `
    UPDATE players
    SET playerBalance = ?, lastFaucetAt = ?
    WHERE playerId = ?
  `,
  ).run(newBalance.toString(), now, playerId);

  return { success: true, balance: newBalance.toString() };
}

const DAILY_POINTS = 30;
const FIRST_LOGIN_POINTS = 300;
const POINTS_COOLDOWN_MS = 24 * 60 * 60 * 1000; // 24 часа

export function claimDailyPoints(playerId: string): {
  success: boolean;
  reason?: string;
  points?: number;
  isFirstLogin?: boolean;
} {
  const record = db
    .prepare(`SELECT * FROM players WHERE playerId = ?`)
    .get(playerId) as any;

  if (!record) {
    return { success: false, reason: "Player not found" };
  }

  const now = Date.now();
  const lastClaim = record.lastPointsAt ?? 0;
  const elapsed = now - lastClaim;
  const isFirstLogin = lastClaim === 0; // neverclaimed?

  if (!isFirstLogin && elapsed < POINTS_COOLDOWN_MS) {
    const remainingMs = POINTS_COOLDOWN_MS - elapsed;
    const remainingHours = Math.ceil(remainingMs / 1000 / 60 / 60);
    return {
      success: false,
      reason: `Come back in ${remainingHours} hour(s)`,
    };
  }

  const pointsToAdd = isFirstLogin ? FIRST_LOGIN_POINTS : DAILY_POINTS;
  const newPoints = (record.points ?? 0) + pointsToAdd;

  db.prepare(
    `
    UPDATE players
    SET points = ?, lastPointsAt = ?
    WHERE playerId = ?
  `,
  ).run(newPoints, now, playerId);

  return {
    success: true,
    points: newPoints,
    isFirstLogin,
  };
}
