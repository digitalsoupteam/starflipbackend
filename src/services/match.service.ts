// Создание и обновление отдельного матча

import { Match, MoveResult } from '../../structures/match.struct';
import { createBoard, makeMove } from './game.service';
import { matches } from '../../storage/storage';

/* 

принимает из Lobby объект скомпанованного матча:

Match {
  id: string;                                          //генерирутеся в лобби
  playeтьrs: [string, string];                          //генерирутеся в лобби
  board: Box[];                                       //генерируется в match
  balances: Record<string, number>;                  //генерируется в лобби
  currentTurn: string;                             //генерируется в match
  status: 'waiting' | 'active' | 'finished';         //меняется в match
  total: number;                                    //генерируется в лобби
  count: number;                                   //генерируется в лобби (сonst 12)
}
*/ 

/* основная функция, создает "условный экзепляр" отдельного матча */
function createMatch(match: Match): Match {
  return {
    ...match,
    board: createBoard(match.total, match.count),
    status: 'active',
  };
}

/* вспомогательная функция, сохранить текущее состояние отдельного матча */
function saveMatch(match: Match): void {
matches.set(match.id, match);
}

/* вспомогательная функция, получить текущее состояние отдельного матча */
function getMatch(matchId: string): Match | null {
  const match = matches.get(matchId);
  if (match !== undefined) {
    return match;
  } else {
    return null;
  }
}

/* вспомогательная функция, применяет ход и обновляет статус матча, если все проверки пройдены */
// makeMove(
//   matchId: string,
//   playerId: string,
//   boxId: number
// ): MoveResult {
//     return 
// }