import { makeMove, createBoard } from '../game.service';
import { Match } from '../../../structures/match.struct';

/* мнимый матч ОБНОВИТЬ ПОЛЯ! */
let match: Match = {
  id: 'test-match',
  status: 'active',
  players: ['player1', 'player2'],
  currentTurn: 'player1',
  balances: {
    player1: 0,
    player2: 0,
  },
  board: createBoard(200, 12),
};

/* функция создает поочередное вскрытие двумя игроками клеток с 1 по 12-ую */
function playAllMoves(match: Match) {
  let currentMatch = match;

  for (let i = 0; i < 12; i++) {
    const currentPlayer = currentMatch.currentTurn;
    const boxToOpen = currentMatch.board.find(b => !b.openedBy);

    if (!boxToOpen) break;

    const result = makeMove(currentMatch, currentPlayer, boxToOpen.id);

    if (result.error) {
      console.log(`Turn ${i + 1}: ${currentPlayer} err:`, result.error);
      break;
    } else {
      console.log(`Turn ${i + 1}: ${currentPlayer} open ${boxToOpen.id}`);
      console.log('Balances:', result.match.balances);
    }

    currentMatch = result.match;
  }

  console.log('Game is over! Status:', currentMatch.status);
  console.log('Finished Balances:', currentMatch.balances);
}

/* start test */
playAllMoves(match);