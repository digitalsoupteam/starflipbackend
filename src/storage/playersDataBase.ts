import Database from "better-sqlite3";

export const db = new Database("players.db");

const LEGACY_UNITS_PER_COIN = 1_000_000_000_000_000_000n;
const USDT_PER_LEGACY_COIN = 2_000n;
const USDT_BALANCE_VERSION = "USDT_INTEGER_V1";
const LEGACY_REFERRAL_EARNED_COL = ["referral", "Eth", "Earned"].join("");

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
  referralUsdtEarned TEXT NOT NULL DEFAULT '0'
)
`,
).run();

// SQLite ALTER TABLE can't add UNIQUE columns — add plain, then enforce via index below
const existingCols = (
  db.prepare("PRAGMA table_info(players)").all() as { name: string }[]
).map((c) => c.name);

if (existingCols.includes(LEGACY_REFERRAL_EARNED_COL) && !existingCols.includes("referralUsdtEarned")) {
  db.prepare(`ALTER TABLE players RENAME COLUMN ${LEGACY_REFERRAL_EARNED_COL} TO referralUsdtEarned`).run();
  const index = existingCols.indexOf(LEGACY_REFERRAL_EARNED_COL);
  existingCols[index] = "referralUsdtEarned";
}

for (const [col, def] of [
  ["inviteCode",          "TEXT"], // UNIQUE enforced via index below
  ["referrerId",          "TEXT"],
  ["referralUsdtEarned",  "TEXT NOT NULL DEFAULT '0'"],
  ["lastGameAt",          "INTEGER NOT NULL DEFAULT 0"],
] as const) {
  if (!existingCols.includes(col)) {
    db.prepare(`ALTER TABLE players ADD COLUMN ${col} ${def}`).run();
  }
}

db.prepare(
  `CREATE UNIQUE INDEX IF NOT EXISTS idx_players_inviteCode ON players (inviteCode)`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS app_meta (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )`,
).run();

function legacyBalanceToWholeUsdt(value: string | null | undefined): string {
  const legacyAmount = BigInt(value ?? "0");
  return ((legacyAmount * USDT_PER_LEGACY_COIN) / LEGACY_UNITS_PER_COIN).toString();
}

const balanceVersion = db
  .prepare("SELECT value FROM app_meta WHERE key = ?")
  .get("balanceCurrency") as { value: string } | undefined;

if (balanceVersion?.value !== USDT_BALANCE_VERSION) {
  const rows = db
    .prepare("SELECT playerId, playerBalance, referralUsdtEarned FROM players")
    .all() as {
      playerId: string;
      playerBalance: string;
      referralUsdtEarned: string;
    }[];

  const update = db.prepare(
    `UPDATE players
     SET playerBalance = ?, referralUsdtEarned = ?
     WHERE playerId = ?`,
  );

  const migrate = db.transaction(() => {
    for (const row of rows) {
      update.run(
        legacyBalanceToWholeUsdt(row.playerBalance),
        legacyBalanceToWholeUsdt(row.referralUsdtEarned),
        row.playerId,
      );
    }

    db.prepare(
      `INSERT INTO app_meta (key, value)
       VALUES (?, ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    ).run("balanceCurrency", USDT_BALANCE_VERSION);
  });

  migrate();
  console.log(`DB migration complete: balances converted to integer USDT (${USDT_BALANCE_VERSION})`);
}
