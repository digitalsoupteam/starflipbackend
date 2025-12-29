// Поиск и подбор соперников

import { Match } from "../../structures/match.struct";
import { createBoard } from "./game.service";
import { generateId } from "./utils/idGenerate";
import { rC } from "../../storage/activeStorage";

export async function joinOrCreateMatch(
  playerId: string,
  bid: number
): Promise<Match> {
  // Пытаемся присоединиться к существующему матч
  try {
    const match = await joinWaitingMatch(playerId);
    if (match) {
      // Играем в уже существующем матче
      return match;
    }

    // Если свободного матча нет — создаём новый
    const newMatch = await createWaitingMatch(playerId, bid);
    return newMatch;
  } catch (error) {
    // Если что-то пошло не так — возвращаем понятную ошибку
    throw new Error(
      `Не удалось найти или создать матч: ${
        error instanceof Error ? error.message : error
      }`
    );
  }
}

/* создание ожидающего матча */
async function createWaitingMatch(
  playerId: string,
  bid: number
): Promise<Match> {
 const id = await generateId();

const match: Match = {
  id, // строка
  createdAt: Date.now(),
  creator: playerId,
  players: [playerId],
  bid,
  total: bid * 2,
  count: 12,
  board: [],
  balances: { [playerId]: 0 },
  status: "waiting",
};

  // записываем в редис новый ожидающий мач
  await rC.set(`waiting:match:${match.id}`, JSON.stringify(match));

  // айди матча ставим в отдельный сортировнаный список с айдишниками
  await rC.zAdd("waiting:matches", {
    score: Date.now(),
    value: match.id,
  });

  //возвращаем сам обьект матча
  return match;
}

async function joinWaitingMatch(playerId: string): Promise<Match | null> {
  //получаем самый последний мач он приходит в виде масива, вытаскиваем элемент либо нул
  const oldestWaitingMatch = await rC.zRange("waiting:matches", 0, 0);
  if (oldestWaitingMatch.length === 0) {
    return null;
  }
  const matchId = oldestWaitingMatch[0];

  // создаем ключ лока чтобы залочить этот матч исключив гонку кликов на 3 сек
  const lockKey = `waiting:match:${matchId}:lock`;
  const locked = await rC.set(lockKey, "1", { NX: true, PX: 3000 });
  if (!locked) {
    throw new Error("Матч уже занят, попробуйте другой");
  }

  try {
    // поверка что матч с этим айди есть и доступен
    const raw = await rC.get(`waiting:match:${matchId}`);
    if (!raw) {
      // JSON не найден чистим ZSET
      await rC.zRem("waiting:matches", matchId);
      throw new Error("Матч недоступен, найдите новый");
    }

    const match = JSON.parse(raw);

    if (match.status !== "waiting") {
      throw new Error("Матч уже активен, найдите другой");
    }

    // дбавляем второго игрока
    match.players.push(playerId);
    match.balances[playerId] = 0;

    // меняем матч статус: waiting => active
    match.status = "active";
    match.board = createBoard(match.total, match.count);
    match.currentTurn = match.players[Math.floor(Math.random() * match.players.length)];

    // сохраняем обновлённый матч в Redis
    await rC.set(`match:${match.id}`, JSON.stringify(match));

    // убираем из ZSET ожидания
    await rC.zRem("waiting:matches", matchId);

    return match;
  } catch (error) {
    // глобальный еррор
    throw new Error(
      `Ошибка при получении матча: ${
        error instanceof Error ? error.message : error
      }`
    );
  } finally {
    await rC.del(lockKey);
  }
}
