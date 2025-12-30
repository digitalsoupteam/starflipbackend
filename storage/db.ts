import Database from "better-sqlite3";

export const db = new Database("game.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS matches (
    id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL,
    finished_at INTEGER NOT NULL,
    bid INTEGER NOT NULL,
    total INTEGER NOT NULL,
    winner TEXT,
    players TEXT NOT NULL,
    balances TEXT NOT NULL,
    board TEXT NOT NULL
  );
`);


db.exec(`
  CREATE TABLE IF NOT EXISTS liveMatches (
    id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL,
    bid INTEGER NOT NULL,
    total INTEGER NOT NULL,
    players TEXT NOT NULL,
    balances TEXT NOT NULL,
    board TEXT NOT NULL
  );
`);