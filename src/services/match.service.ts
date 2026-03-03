// Запуск матча, Сохранение, Примнение ходов

import { Match, MoveResult } from "../structures/match.struct";
import { makeMove } from "./game.service";
import {
  rC,
  activeGet,
  activeSave,
  GetResult,
} from "../storage/activeStorage";
import { setActiveMatch } from "./playerMatch.service";

export const TURN_TIMEOUT_MS = 300_000; // 5 минут ТАЙМЛЕФТ хода / рекконнекта

/* создает "экземпляр" отдельного матча */
export function startMatch(match: Match): Match {
  if (match.players.length !== 2) {
    throw new Error("Для старта нужно дождаться 2-го игрока");
  }

  const [p1, p2] = match.players;
  const currentTurn = Math.random() < 0.5 ? p1 : p2;

  return {
    ...match,
    balances: { [p1]: 0, [p2]: 0 },
    currentTurn,
    turnStartedAt: Date.now(),
  };
}

/* асинк-обертка: создает матч и сохраняет его */
export async function startAndSaveMatch(match: Match): Promise<Match> {
  const newMatch = startMatch(match);

  const saveRes = await activeSave(newMatch);

  if (!saveRes.ok) {
    console.error("Не удалось сохранить матч", saveRes.error);
  }

  // сейв копии матча для подьема после ТТЛ
  const matchMetaKey = `matchMeta:${newMatch.id}`;
  try {
    await rC.set(
      matchMetaKey,
      JSON.stringify({
        matchId: newMatch.id,
        onChainId: newMatch.onChainId ?? null,
      }),
    );
  } catch (err) {
    console.error("Не удалось сохранить matchMeta:", err);
  }

  for (const p of newMatch.players) {
    await setActiveMatch(p, newMatch.id);
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
  try {
    const data = await rC.get(`match:${matchId}`);
    if (!data) return { ok: false, error: "not_found" }; // если нет данных, ok: false
    return { ok: true, match: JSON.parse(data) as Match }; // тут match точно есть
  } catch (error) {
    return { ok: false, error: "storage_error" };
  }
}

/* применить ход к матчу */
export async function moveInMatch(
  matchId: string,
  playerId: string,
  boxId: number,
  clientMoveId: string,
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
      if (res.error === "not_found") {
        return { error: "match not found" };
      }
      return { error: "storage error" };
    }

    const match = res.match;

    if (!clientMoveId) {
      return { error: "clientMoveId required" };
    }

    if (match.lastMoveId === clientMoveId) {
      return { match };
    } //проверка фронта на дошедший клик

    if (!match.currentTurn || match.currentTurn !== playerId) {
      // Устанавливаем кулдавн на 15 секунд для игрока
      await rC.set(cooldownKey, "1", { PX: 15000 });
      return { error: "its not your turn" };
    }

    const result = await makeMove(match, playerId, boxId);

    if (!result.error && result.match) {
      result.match.lastMoveId = clientMoveId;
      result.match.turnStartedAt = Date.now();
    }

    if (!result.error && result.match) {
      const saved = await saveMatch(result.match);
      if (saved) {
        for (const p of result.match.players) {
          await setActiveMatch(p, result.match.id);
          const turnKey = `match:${result.match.id}:turn`;
          const nextPlayer = result.match.currentTurn; // это игрок, который ходит следующим
          if (nextPlayer) {
            await rC.set(turnKey, nextPlayer, { EX: TURN_TIMEOUT_MS / 1000 });
          }
        }
      }
      if (!saved) {
        return { error: "failed to save match" };
      }
    }

    return result;
  } finally {
    await rC.del(lockKey);
  }
}

/* Кирилл, важно заметь тут есть клиент мув айди, то есть Фронт при клике должен каждый раз крипторандомом генерировать string
, который будет проверяться на новизну в случае если он совпал = значит ход уже засчитан, чтобы не было рассинхрона фронт/бек в 
случае падения связи в моменте клика по клетке */
