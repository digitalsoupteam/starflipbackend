// Создание и обновление отдельного матча

import { Match, MoveResult } from "../../structures/match.struct";
import { saveFinishedMatch } from "./utils/match.repository";
import { createBoard } from "./game.service";
import { makeMove } from "./game.service";
import { hashBoard } from "./utils/boardHash";
import {
  rC,
  activeGet,
  activeSave,
  GetResult,
} from "../../storage/activeStorage";

/* создает "экземпляр" отдельного матча */
export function startMatch(match: Match): Match {
  if (match.players.length !== 2) {
    throw new Error("Для старта нужно дождаться 2-го игрока");
  }

  const [p1, p2] = match.players;
  const board = createBoard(match.total, match.count);
  const currentTurn = Math.random() < 0.5 ? p1 : p2;

  return {
    ...match,
    board,
    balances: { [p1]: 0, [p2]: 0 },
    currentTurn,
    status: "active",
    boardHash: hashBoard(board),
  };
}

/* асинк-обертка: создает матч и сохраняет его */
export async function startAndSaveMatch(match: Match): Promise<Match> {
  const newMatch = startMatch(match);

  const saveRes = await activeSave(newMatch);
  if (!saveRes.ok) {
    console.error("Не удалось сохранить матч", saveRes.error);
  }

  return newMatch;
}

/* сохранить текущее состояние матча */
export async function saveMatch(match: Match): Promise<boolean> {
  const res = await activeSave(match);

  if (!res.ok) {
    console.error(`Redis save error (match ${match.id})`, res.error);
    return false;
  }

  return true;
}

/* получить текущее состояние матча */
export async function getMatch(matchId: string): Promise<GetResult> {
  const res = await activeGet(matchId);

  if (!res.ok) {
    console.error(`Redis get error (match ${matchId})`, res.error);
  }

  return res;
}

/* применить ход к матчу */
export async function moveInMatch(
  matchId: string,
  playerId: string,
  boxId: number
): Promise<MoveResult> {
  const lockKey = `match:${matchId}:lock`;
  const cooldownKey = `player:${playerId}:cooldown`;

  // Проверяем, не находится ли игрок в периоде ожидания
  const isCoolingDown = await rC.get(cooldownKey);
  if (isCoolingDown) {
    return { error: "too fast, wait for your turn" };
  }

    // Пытаемся взять лок на матч
  const locked = await rC.set(lockKey, "1", { NX: true, PX: 3000 });
  if (!locked) {
    return { error: "match is busy" };
  }

  try {
    const res = await getMatch(matchId);

    if (!res.ok) {
      return { error: "storage error" };
    }

    if (!res.match) {
      return { error: "match not found" };
    }

    const match = res.match;

    if (!match.currentTurn || match.currentTurn !== playerId) {
       // Устанавливаем кулдавн на 15 секунд для игрока
      await rC.set(cooldownKey, "1", { PX: 15000 });
      return { error: "its not your turn" };
    }

    const result = makeMove(match, playerId, boxId);

      if (!result.error && result.match) {
      // Сохраняем матч в Redis
      const saved = await saveMatch(result.match);
      if (!saved) return { error: "failed to save match" };

      // Если матч завершён, архивируем в sqlite
      if (result.match.status === "finished") {
        saveFinishedMatch(result.match); 
      }

    return result;
  }
  } finally {
    await rC.del(lockKey);
  }
  return { error: "unknown error" };
}
