/* Поиск и создание пары для игры */

import { Match } from "../structures/match.struct";
import { generateId } from "../utils/idGenerate";
import { rC } from "../storage/activeStorage";
import { startAndSaveMatch } from "./match.service";
import { createMatch_onContract } from "./contracts/contract.service";
import { hashBoard } from "../utils/boardHash";
import { createBoard } from "./game.service";

/* Тип для луа скрипта ниже */
type MatchAction =
  | { type: "join"; matchId: string }
  | { type: "create" }
  | { type: "wait" };

/* Луа скрипт для работы с редисом  */
async function getMatchAction(): Promise<MatchAction> {
  const result = await rC.eval(
    `
    -- 1. Сначала ищем матчи для присоединения
    local matchIds = redis.call("ZRANGE", "waiting:matches", 0, 9)  -- Смотрим 10 матчей
    
    if matchIds and #matchIds > 0 then
      -- Пробуем каждый матч по очереди
      for i = 1, #matchIds do
        local matchId = matchIds[i]
        local exists = redis.call("EXISTS", "waiting:match:" .. matchId)
        
        if exists == 1 then
          -- Пытаемся залочить этот матч для попытки присоединения
          local tryLockKey = "waiting:match:" .. matchId .. ":trylock"
          local lock = redis.call(
            "SET",
            tryLockKey,
            ARGV[1],
            "NX",
            "PX",
            200  -- TTL: 200ms 
          )
          
          if lock then
            return { "join", matchId }
          end
        else
          -- Удаляем несуществующий матч из списка ожидания
          redis.call("ZREM", "waiting:matches", matchId)
        end
      end
    end
    
    -- 2. Создание нового матча - только если очень мало ожидающих
    local waitingCount = redis.call("ZCARD", "waiting:matches")
    
    -- Если уже есть 10+ ожидающих матчей, не создаем новые (ждем пока очистятся)
    if waitingCount > 10 then
      return { "wait", "" }
    end
    
    -- 3. Создаем новый матч с коротким lock
    local lock = redis.call(
      "SET",
      "lock:waiting:match:create",
      ARGV[1],
      "NX",
      "PX",
      500  -- TTL: 500ms lock на создание матча
    )
    
    if lock then
      return { "create", "" }
    end
    
    return { "wait", "" }
    `,
    {
      keys: [],
      arguments: [`${Date.now()}:${Math.random()}`],
    },
  );

  if (!result) {
    return { type: "wait" };
  }

  const [type, matchId] = result as [string, string];

  if (type === "join") {
    return { type: "join", matchId };
  }

  if (type === "create") {
    return { type: "create" };
  }

  return { type: "wait" };
}

/* Основная функция матч мейкинга, подключиться к матчу, либо создать свой */
export async function joinOrCreateMatch(
  playerId: string,
  bid: number,
  token: string,
): Promise<Match> {
  const maxAttempts = 200;
  const initialWaitTime = 20;

  let totalWaitTime = 0;
  let lastActionType = "";

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const action = await getMatchAction();
    lastActionType = action.type;

    // Если нашли матч для присоединения
    if (action.type === "join") {
      const match = await joinWaitingMatch(playerId, action.matchId, token);
      if (match) {
        console.log(
          `Player ${playerId} joined match ${match.id} on attempt ${attempt + 1}`,
        );
        return match;
      }
      // Если не удалось присоединиться, сразу следующая попытка
      continue;
    }

    // Если нужно создать новый матч
    if (action.type === "create") {
      try {
        const match = await createWaitingMatch(playerId, bid);
        console.log(
          `Player ${playerId} created match ${match.id} on attempt ${attempt + 1}`,
        );
        return match;
      } catch (error) {
        // Если не удалось создать, продолжаем попытки
        console.log(`Player ${playerId} failed to create match: ${error}`);
        continue;
      } finally {
        // Всегда снимаем lock на создание (даже если ошибка)
        await rC.del("lock:waiting:match:create").catch(() => {});
      }
    }

    // Если нужно подождать (wait) - используем умную задержку
    let waitTime = initialWaitTime;

    // Увеличиваем задержку экспоненциально если долго ждем
    if (attempt > 20) {
      waitTime = Math.min(waitTime * Math.pow(1.3, attempt - 20), 300);
    }

    // Случайное отклонение для распределения нагрузки (предотвращает синхронизацию)
    waitTime = waitTime * (0.8 + Math.random() * 0.4);

    await new Promise((r) => setTimeout(r, waitTime));
    totalWaitTime += waitTime;

    // Если ждем слишком долго, пробуем принудительно создать матч
    if (totalWaitTime > 8000 && attempt > maxAttempts / 2) {
      console.log(
        `Player ${playerId} trying force create after ${totalWaitTime}ms`,
      );
      try {
        const match = await createWaitingMatch(playerId, bid);
        return match;
      } catch (error) {
        // Если не получилось, продолжаем обычный цикл
      }
    }
  }

  // Последняя попытка - пробуем создать матч ласт шанс перед ошибкой
  try {
    console.log(`Player ${playerId} last resort create`);
    const match = await createWaitingMatch(playerId, bid);
    return match;
  } catch (error) {
    console.log(
      `Player ${playerId} completely failed after ${maxAttempts} attempts, last action: ${lastActionType}`,
    );
    throw new Error(
      `${playerId} не смог подключиться к матчу после ${maxAttempts} попыток`,
    );
  }
}

/* Создание ожидающего матча */
export async function createWaitingMatch(
  playerId: string,
  bid: number,
): Promise<Match> {
  // Проверяем, не создает ли уже этот игрок матч
  const playerLockKey = `player:creating:${playerId}`;
  const playerLocked = await rC.set(playerLockKey, "1", {
    NX: true, // Только если ключа нет
    PX: 3000, // TTL: 3000ms (3 секунды) для блокировки игрока от создания нескольких матчей
  });

  if (!playerLocked) {
    throw new Error(`Player ${playerId} is already creating a match`);
  }

  try {
    const id = await generateId();

    const match: Match = {
      id,
      createdAt: Date.now(),
      creator: playerId,
      players: [playerId],
      bid,
      total: bid * 2,
      count: 12,
      board: [],
      balances: { [playerId]: 0 },
      status: "waiting",
      turnStartedAt: 0,
    };

    // транзакция атомарный сейв
    const multi = rC.multi();

    // Если игрок уйдет, матч автоматически удалится через 5 минут
    multi.set(`waiting:match:${match.id}`, JSON.stringify(match), {
      EX: 300, // TTL: 300 секунд = 5 минут
    });

    // id матча в отсортированный список ожидающих
    multi.zAdd("waiting:matches", {
      score: Date.now(),
      value: match.id,
    });

    // Снимаем глобальный lock на создание матча
    multi.del("lock:waiting:match:create");

    await multi.exec();

    return match;
  } finally {
    // Всегда снимаем блокировку игрока (даже если была ошибка)
    await rC.del(playerLockKey).catch(() => {});
  }
}

/* Подключение к матчу */
export async function joinWaitingMatch(
  playerId: string,
  matchId: string,
  token: string,
): Promise<Match | null> {
  const lockKey = `waiting:match:${matchId}:join`;
  const lockValue = `${Date.now()}:${playerId}`;

  // Ставим lock на присоединение к конкретному матчу
  const locked = await rC.set(lockKey, lockValue, {
    NX: true, // Только если ключа нет
    PX: 1000, // TTL: 1000ms (1 секунда) для блокировки матча на время присоединения
  });

  if (!locked) {
    return null; // Кто-то уже пытается присоединиться к этому матчу
  }

  try {
    // Получаем данные матча из Redis
    const raw = await rC.get(`waiting:match:${matchId}`);
    if (!raw) {
      // Если матч не найден, удаляем его из списка ожидания
      await rC.zRem("waiting:matches", matchId).catch(() => {});
      return null;
    }

    const match = JSON.parse(raw);

    // Проверяем условия присоединения
    if (
      match.status !== "waiting" ||
      match.players.length >= 2 ||
      Date.now() - match.createdAt > 30000
    ) {
      // Матч старше 30 секунд

      // Быстрый откат - обрабатываем невалидный матч
      if (match.status === "waiting" && match.players.length < 2) {
        // Возвращаем матч в список ожидания только если он свежий (< 5 секунд)
        if (Date.now() - match.createdAt < 5000) {
          await rC.zAdd("waiting:matches", {
            score: Date.now(), // Обновляем время для приоритета
            value: match.id,
          });
        } else {
          // Старый матч (> 5 секунд) - удаляем навсегда
          const multi = rC.multi();
          multi.del(`waiting:match:${matchId}`);
          multi.zRem("waiting:matches", matchId);
          await multi.exec();
        }
      }
      return null;
    }

    const board = createBoard(match.bid * 2, 12);
    const boardHash = hashBoard(board);

    try {
      const onChainId = await createMatch_onContract(
        match.players[0],
        playerId,
        token,
        boardHash,
      );

      match.onChainId = onChainId;
    } catch (error) {
      console.error("Ошибка создания матча:", error);
      throw error;
    }

    match.players.push(playerId);
    match.balances[playerId] = 0;
    match.status = "active";
    match.board = board;
    match.boardHash = boardHash;

    const readyMatch = await startAndSaveMatch(match);

    // Атомарно сохраняем изменения
    const multi = rC.multi();

    // Удаляем ожидающий матч
    multi.del(`waiting:match:${matchId}`);

    // Удаляем матч из списка ожидающих
    multi.zRem("waiting:matches", matchId);

    await multi.exec();

    return readyMatch;
  } catch (error) {
    console.error(`Error joining match ${matchId}:`, error);
    return null;
  } finally {
    // Всегда снимаем lock на присоединение (даже если была ошибка)
    await rC.del(lockKey).catch(() => {});
  }
}
