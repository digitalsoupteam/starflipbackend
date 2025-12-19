// Поиск, подбор соперников

import { Match } from '../../structures/match.struct';
import {saveMatch } from './match.service';
import { waitingMatches } from '../../storage/storage';
import { createBoard } from './game.service';
import { generateId } from './utils/idGenerate';

/* основная функция, поиск или создание матча */
export function findOrCreateMatch(playerId: string, bid: number): Match {
  // Попробовать подключиться к существующему ожидающему матчу
  const joinedMatch = joinWaitingMatch(playerId);
  if (joinedMatch) {
    return joinedMatch;
  }

  // Если свободных матчей нет — создаём новый
  return createWaitingMatch(playerId, bid);
}

/* доп функция, создает матч в статусе Ождания(лобби) */
function createWaitingMatch(playerId: string, bid: number): Match {
  const match: Match = {
    id: generateId(), //функция создает рандомный id и проверяет повторения
    createdAt: Date.now(),
    creator: playerId,
    players: [playerId],
    bid,
    total: bid * 2,
    count: 12,
    board: [],
    balances: { [playerId]: 0 },
    status: 'waiting',
  };

  waitingMatches.set(match.id, match);
  return match;
}

/* доп функция, подключается к ожидающему матчу */
function joinWaitingMatch(playerId: string): Match | null {
  for (const [id, match] of waitingMatches) {
    if (match.status === 'waiting') {
      match.players.push(playerId);
      match.balances[playerId] = 0;
      match.status = 'active';
      match.board = createBoard(match.total, match.count);

      waitingMatches.delete(id); // удаляем из waiting
      saveMatch(match);        // сохраняем в активные матчи
      return match;
    }
  }
  return null; // свободных матчей нет
}
