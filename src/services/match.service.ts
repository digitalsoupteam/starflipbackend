// Создание и обновление отдельного матча

import { Match, MoveResult } from "../../structures/match.struct";
import { createBoard } from "./game.service";
import { makeMove } from "./game.service";
import { matches } from "../../storage/storage";
import { hashBoard } from "./utils/boardHash";

/* 

принимает из Lobby объект скомпанованного матча и меняет его на status active дополняя его

Match {
  id: string;                     // id матча                                                                       //генерируется в lobby
  createdAt: number;              // timestamp создания                                                           //генерируется в lobby
  creator: string;                // создатель матча (players[0])                                              //генерируется в lobby

  players: string[];              // [player1] | [player1, player2]

  bid: number;                    // ставка одного игрока                                                  //генерируется в lobby
  total: number;                  // общая сумма (bid * 2)                                                //генерируется в lobby
  count: number;                  // количество клеток (у нас базово 12)                                  //генерируется в lobby

  board: Box[];                   // игровое поле (пустое в waiting)                                //генерируется в match
  balances: Record<string, number>; // балансы игроков
  boardHash: string,

  currentTurn?: string;           // чей ход (только при active)

  status: 'waiting' | 'active' | 'finished'; //status 
}


/* основная функция, создает "экзепляр" отдельного матча */

export function startMatch(match: Match): Match {
  if (match.players.length !== 2) {
    throw new Error('Для старта нужно дождаться 2-го игрока');
  }

  const [p1, p2] = match.players;
  const board = createBoard(match.total, match.count);

  const startedMatch: Match = {
    ...match,
    board,
    balances: { [p1]: 0, [p2]: 0 },
    currentTurn: Math.random() < 0.5 ? p1 : p2,
    status: 'active',
    boardHash: hashBoard(board), // хеш-доски 
  };

  //сохраняем матч после старта
  saveMatch(startedMatch);
  return startedMatch; //этот ретурн типа сразу где-то поюзать в ответе на фронте мб
}


/* вспомогательная функция, сохранить текущее состояние отдельного матча */
export function saveMatch(match: Match): void {
  matches.set(match.id, match);
}

/* вспомогательная функция, получить текущее состояние отдельного матча */
export function getMatch(matchId: string): Match | null {
  const match = matches.get(matchId);
  if (match !== undefined) {
    return match;
  } else {
    return null;
  }
}

/* вспомогательная функция, на основе функции из game.service, достает матч,
применяет ход и обновляет данный матча, если все проверки пройдены */
export function moveInMatch(
  matchId: string,
  playerId: string,
  boxId: number
): MoveResult {
  //достаём матч
  const match = getMatch(matchId);

  if (!match) {
    return { error: "match not found" };
  }

  //прогоняем game.service
  const result = makeMove(match, playerId, boxId);

  //если все ок - сохраняем мач
  if (!result.error && result.match) {
    saveMatch(result.match);
  }

  return result;
}
