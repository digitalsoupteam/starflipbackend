import Database from "better-sqlite3";

export const db = new Database("players.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS players (
    address TEXT PRIMARY KEY,
    games INTEGER NOT NULL DEFAULT 0,
    wins INTEGER NOT NULL DEFAULT 0
  )
`).run();