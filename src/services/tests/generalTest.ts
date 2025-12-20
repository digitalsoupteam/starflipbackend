
import { Match, MoveResult } from "../../../structures/match.struct";
import { findOrCreateMatch } from "../matchMaking.service";
import { moveInMatch, startMatch} from "../match.service";
import { hashBoard } from "../utils/boardHash";

//  Настройка игроков и ставки 
const player1 = "Nik";
const player2 = "Kirill";
const bid = 50;

// Создаем матч через matchmaking 
let match: Match = findOrCreateMatch(player1, bid);
console.log("Создано ожидание матча:", match);

// Второй игрок присоединяется 
match = findOrCreateMatch(player2, bid);
console.log("Игрок 2 присоединился, матч активен:", match);

//  Стартуем матч через match.service 
match = startMatch(match);
console.log("Матч стартанул:", match);
console.log("Хеш доски:", hashBoard(match.board));

//  Ходы игроков 
while (match.status !== "finished") {
  const playerId = match.currentTurn!;
  
  // Ищем первый закрытый бокс
  const boxToOpen = match.board.find(b => !b.openedBy);
  if (!boxToOpen) break;

  const result: MoveResult = moveInMatch(match.id, playerId, boxToOpen.id);

  if (result.error) {
    console.error("Ошибка хода:", result.error);
    break;
  }

  match = result.match!;
  console.log(`Ход игрока ${playerId}, открыл бокс ${boxToOpen.id}`);
  console.log("Баланс:", match.balances);
  console.log("Текущий ход:", match.currentTurn);
}

//  Игра окончена  
console.log("Игра завершена!");
console.log("Финальные балансы:", match.balances);
console.log("Результат игры:", match.status);
console.log("Хеш финальной доски:", hashBoard(match.board));
