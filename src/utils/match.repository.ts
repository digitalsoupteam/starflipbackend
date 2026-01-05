import { db } from "../../../storage/db";
import { Match } from "../../../structures/match.struct";
import { getGameResult } from "../game.service";

/* БД постоянная для хранения истории матчей */
/* сохранить данные в нашу sqlку */
export async function saveFinishedMatch(match: Match) {
  if (match.status !== "finished") {
    throw new Error("Матч ещё не завершён");
  }

  //вычисляем победителя
  const result = getGameResult(match);
  const winner = result && "winner" in result ? result.winner : null;

  // подгатавливаем
  const stmt = db.prepare(`
    INSERT INTO matches (
      id,
      created_at,
      finished_at,
      bid,
      total,
      winner,
      players,
      balances,
      board
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // сохраняем, игроки, балансы и борд - в виде jsona 
  stmt.run(
    match.id,
    match.createdAt,
    Date.now(),
    match.bid,
    match.total,
    winner,
    JSON.stringify(match.players), 
    JSON.stringify(match.balances),
    JSON.stringify(match.board)
  );
}
