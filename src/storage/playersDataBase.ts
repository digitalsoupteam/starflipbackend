import Database from "better-sqlite3";

export const db = new Database("players.db");

db.prepare(
  `
CREATE TABLE IF NOT EXISTS players (
  playerId TEXT PRIMARY KEY,
  telegramId TEXT UNIQUE,
  googleId TEXT UNIQUE,
  playerBalance TEXT NOT NULL DEFAULT '0',
  games INTEGER NOT NULL DEFAULT 0,
  wins INTEGER NOT NULL DEFAULT 0,
  points INTEGER NOT NULL DEFAULT 0,
  lastFaucetAt INTEGER NOT NULL DEFAULT 0,
  lastPointsAt INTEGER NOT NULL DEFAULT 0,
  walletAddress TEXT UNIQUE,
  encryptedPrivateKey TEXT
)
`,
).run();