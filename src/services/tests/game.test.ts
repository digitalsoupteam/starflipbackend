import { Match, MoveResult } from '../../../structures/match.struct';
import { createBoard, makeMove } from '../game.service';

// Создаем тестовый матч
const match: Match = {
  id: 'test-match',
  createdAt: Date.now(),
  creator: 'player1',
  players: ['player1', 'player2'],
  bid: 50,
  total: 100,
  count: 12,
  board: createBoard(100, 12), // создаем поле сразу
  balances: { player1: 0, player2: 0 },
  currentTurn: 'player1',
  status: 'active',
};

// Функция для пошагового теста
function playAllMoves(testMatch: Match) {
  console.log('--- Старт игры ---');
  for (let i = 0; i < testMatch.count; i++) {
    const currentPlayer = testMatch.currentTurn!;
    const boxId = i; // просто открываем по порядку
    const result: MoveResult = makeMove(testMatch, currentPlayer, boxId);

   if (result.error) {
  console.log(`Ошибка: ${result.error}`);
} else if (result.match) {
  console.log(`Ход ${i + 1}: ${currentPlayer} открыл клетку ${boxId}`);
  console.log('Балансы:', result.match.balances);

  // обновляем матч для следующего хода
  testMatch.board = result.match.board;
  testMatch.currentTurn = result.match.currentTurn;
  testMatch.status = result.match.status;
} else {
  console.log('Что-то пошло не так: result.match отсутствует');
}

  }

  console.log('--- Игра завершена ---');
  console.log('Статус матча:', testMatch.status);
  console.log('Итоговые балансы:', testMatch.balances);
}

// Запуск теста
playAllMoves(match);
