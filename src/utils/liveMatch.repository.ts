import { db } from "../../../storage/db";
import { Match } from "../../../structures/match.struct";


/* БД временная для хранения LIVE данных под восстановление в случае краша редис */
/* сохранить данные в нашу sqlку */
export function saveLiveMatch(match: Match) {

  // подгатавливаем
  const stmt = db.prepare(`
    INSERT INTO matches (
      id,
      created_at,
      bid,
      total,
      players,
      balances,
      board
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // сохраняем, игроки, балансы и борд - в виде jsona 
  stmt.run(
    match.id,
    match.createdAt,
    Date.now(),
    match.bid,
    match.total,
    JSON.stringify(match.players), 
    JSON.stringify(match.balances),
    JSON.stringify(match.board)
  );
}
