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
  encryptedPrivateKey TEXT,
  inviteCode TEXT UNIQUE,
  referrerId TEXT,
  referralEthEarned TEXT NOT NULL DEFAULT '0'
)
`,
).run();

// SQLite ALTER TABLE can't add UNIQUE columns — add plain, then enforce via index below
const existingCols = (
  db.prepare("PRAGMA table_info(players)").all() as { name: string }[]
).map((c) => c.name);

for (const [col, def] of [
  ["inviteCode",          "TEXT"], // UNIQUE enforced via index below
  ["referrerId",          "TEXT"],
  ["referralEthEarned",   "TEXT NOT NULL DEFAULT '0'"],
  ["lastGameAt",          "INTEGER NOT NULL DEFAULT 0"],
] as const) {
  if (!existingCols.includes(col)) {
    db.prepare(`ALTER TABLE players ADD COLUMN ${col} ${def}`).run();
  }
}

db.prepare(
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_players_inviteCode ON players (inviteCode)`
).run();
