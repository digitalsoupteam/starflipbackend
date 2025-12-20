// Движок игры

import { Match, Box, MoveResult } from "../../structures/match.struct";
import { randomizePool } from "./utils/random";
import { hashBoard } from "./utils/boardHash";

/* основная функция, делает ход, но проверяет validateMove(), прежде, чем ходить, если все ок то делает applyMove(), обновляя данные матча, также проверяет, если все клетки заполнены isGameOver() возвращая статус finished для матча */
export function makeMove(
  match: Match,
  playerId: string,
  boxId: number
): MoveResult {
  // проверка на ошибку валидации
  const error = validateMove(match, playerId, boxId);
  if (error) {
    return { match, error };
  }
  // если валидация пройдена обновление переменных и статуса матча
  const updatedMatch = applyMove(match, playerId, boxId);

  // если игра закончена обновление статуса матча
  if (isGameOver(updatedMatch)) {
    updatedMatch.status = "finished";
  }

  return { match: updatedMatch };
}

/* вспомогательная функция, создает игровое поле в рандомном порядке */
export function createBoard(total: number, count: number): Box[] {
  //создает рандомное распределение total монет по count боксам
  const values: number[] = randomizePool(total, count);
  return values.map((value, index) => ({
    id: index,
    value,
  }));
}

/* вспомогательная функция, проверяет возможность хода (активные клетки, ход игрока) */
export function validateMove(
  match: Match,
  playerId: string,
  boxId: number
): string | null {
  //проверяет, если статус матча не active, значит ходить нельзя
  if (match.status !== "active") {
    return "match not active";
  }

  //проверяет, если текущий ход не данного игрока, значит ходить нельзя
  if (match.currentTurn !== playerId) {
    return "its not your turn";
  }

  //проверяет, данный бокс не существует, значит ходить по нему нельзя
  const box = match.board.find((b) => b.id === boxId);
  if (!box) {
    return "box was not found";
  }

  //проверяет, данный бокс открыт, значит ходить по нему нельзя

  if (box.openedBy) {
    return "box is already open";
  }

  // если все проверки пройдены
  return null;
}

/* вспомогательная функция, применяет ход и обновляет статус матча, если все проверки пройдены */
export function applyMove(match: Match, playerId: string, boxId: number): Match {
  const box = match.board.find(b => b.id === boxId)!;

  box.openedBy = playerId;
  match.balances[playerId] = (match.balances[playerId] ?? 0) + box.value;

  // обновляем текущий ход
  const nextPlayer = match.players.find(p => p !== playerId);
  if (nextPlayer) {
    match.currentTurn = nextPlayer;
  }

  // обновляем хеш доски после хода
  match.boardHash = hashBoard(match.board);

  return match;
}

/* вспомогательная функция, проверяет, открыто ли все поле, что является концом игры в случае true */
export function isGameOver(match: Match): boolean {
  return match.board.every((box) => box.openedBy !== undefined);
}

/* вспомогательная функция, возвращает результаты матча */
export function getGameResult(match: Match) {
  const entries = Object.entries(match.balances);

  if (entries.length !== 2) return null;

  const [p1, p2] = entries;

  //победил игрок 1
  if (p1[1] > p2[1]) {
    return {
      winner: p1[0],
      loser: p2[0],
      balances: match.balances,
    };
  }

  //победил игрок 2
  if (p2[1] > p1[1]) {
    return {
      winner: p2[0],
      loser: p1[0],
      balances: match.balances,
    };
  }

  // ничья
  return {
    draw: true,
    balances: match.balances,
  };
}
