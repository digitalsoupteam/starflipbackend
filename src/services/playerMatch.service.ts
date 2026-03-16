/* В каком матче какой игрок находится */

import { rC } from "../storage/activeStorage";

const key = (playerId: string) => `player:${playerId}:activeMatch`;

/* Сохраняет игрока playedId в матче matchId в памяти Redis */
export async function setActiveMatch(playerId: string, matchId: string) {
  await rC.set(key(playerId), matchId, { EX: 86400 }); // сутки
}

/* Спрашивает Redis: "В каком матче сейчас игрок player123?" */
export async function getActiveMatch(playerId: string): Promise<string | null> {
  // null если игрок не в игре
  return await rC.get(key(playerId));
}

/* Удаляет запись о том, что игрок находится в матче. (Игрок вышел/игра закончилась) */
export async function clearActiveMatch(playerId: string) {
  const redisKey = `player:${playerId}:activeMatch`;

  console.log("Deleting active match key:", redisKey);
  await rC.expire(redisKey, 60);
}
