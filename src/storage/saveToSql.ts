import { db } from "./sqlLite";

export interface PlayerRecord {
  address: string;
  games: number;
  wins: number;
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
    if (games >= rank.games && wins >= rank.wins) return rank.name;
  }
  return "Early Adopter";
}

export function updatePlayersStatsWithRank(players: string[], winner: string) {
  const insertStmt = db.prepare(`
    INSERT INTO players (address, games, wins)
    VALUES (@address, @games, @wins)
  `);

  const updateStmt = db.prepare(`
    UPDATE players
    SET games = games + 1,
        wins = wins + @winIncrement
    WHERE address = @address
  `);

  const selectStmt = db.prepare(`SELECT * FROM players WHERE address = ?`);

  const transaction = db.transaction(() => {
    for (const addr of players) {

      const record = selectStmt.get(addr) as PlayerRecord | undefined;
      const isWinner = addr.toLowerCase() === winner.toLowerCase();
      const winIncrement = isWinner ? 1 : 0;

      if (!record) {
        insertStmt.run({ address: addr, games: 1, wins: winIncrement });
      } else {
        updateStmt.run({ address: addr, winIncrement });
      }
    }
  });

  transaction();


  const stats = players.map(addr => {
    const record = selectStmt.get(addr) as PlayerRecord;
    return {
      address: record.address,
      games: record.games,
      wins: record.wins,
      rank: getRank(record.games, record.wins),
    };
  });

  console.log(`Players stats updated for match: ${players.join(", ")}`);
  return stats;
}
