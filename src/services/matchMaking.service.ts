// Поиск и создание пары для игры

import { Match } from "../structures/match.struct";
import { generateId } from "../utils/idGenerate";
import { rC } from "../storage/activeStorage";
import { startAndSaveMatch } from "./match.service";

/* тайп для луаскрипта ниже */
type MatchAction =
  | { type: "join"; matchId: string }
  | { type: "create" }
  | { type: "wait" };

/* луа скрипт для работы с редисом  */
async function getMatchAction(): Promise<MatchAction> {
  // rC.eval выполняет луа скрипт в редиссе
  const result = await rC.eval(
    /* получаем самый старый матч который ждет соперника, если такой матч есть то вернем join,
   если такого нет, пробуем поставить лок на крейт матч, если удалось - то create,
   если не удалось поставить лок, то просим чуть чуть подождать */
    `
    local matchId = redis.call("ZRANGE", "waiting:matches", 0, 0)[1]

    if matchId then
      return { "join", matchId }
    end

    local lock = redis.call(
      "SET",
      "lock:waiting:match:create",
      "1",
      "NX",
      "PX",
      3000
    )

    if lock then
      return { "create", "" }
    end

    return { "wait", "" }
    `,
    { keys: [], arguments: [] }
  );

  if (!result) {
    throw new Error("Lua script returned null");
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

/* основной цикл матч мейкинга */
export async function joinOrCreateMatch(
  playerId: string,
  bid: number
): Promise<Match> {
  while (true) {
    const action = await getMatchAction();

    // исходя из полученного в гетМачЕкшен решаем что делаем дальше
    if (action.type === "join") {
      const match = await joinWaitingMatch(playerId);
      if (match) return match;
    }

    if (action.type === "create") {
      const match = await createWaitingMatch(playerId, bid);
      // снимаем lock
      await rC.del("lock:waiting:match:create");
      return match;
    }

    // wait => короткая пауза
    let attempts = 0;
    await new Promise((r) => setTimeout(r, 50));
    attempts++;
    if (attempts > 20) {
      // максимум 1 секунда
      throw new Error(`${playerId} не смог подключиться к матчу`);
    }
  }
}

/* создание ожидающего матча */
export async function createWaitingMatch(
  playerId: string,
  bid: number
): Promise<Match> {
  // генерируем укикальный матчАйди
  const id = await generateId();

  const match: Match = {
    id, // строка (address пользоватля)
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

/* подключение к матчу */
export async function joinWaitingMatch(
  playerId: string
): Promise<Match | null> {
  // получаем последний ожидающий матч
  const oldestWaitingMatch = await rC.zRange("waiting:matches", 0, 0);
  if (oldestWaitingMatch.length === 0) {
    // значит нет ожидающих матчей
    return null;
  }

  //парсим его матчАйди (в редисе они в виде списка вроде бы)
  const matchId = oldestWaitingMatch[0];
  const lockKey = `waiting:match:${matchId}:lock`;

  // локаем данный матч
  const locked = await rC.set(lockKey, "1", { NX: true, PX: 3000 });
  if (!locked) {
    // значит кто то уже создал лок на этот матч быстрей
    return null;
  }

  try {
    // если анти кейсы прошли, то берем этот матч из редис
    const raw = await rC.get(`waiting:match:${matchId}`);
    if (!raw) {
      // если вдруг его уже не стало по какой то причине - то удаляем его из вейтинг на этом уровне
      await rC.zRem("waiting:matches", matchId);
      return null;
    }

    // парсим данные полученного матча с редиса
    const match = JSON.parse(raw);

    if (match.status !== "waiting") {
      // если матч уже актив (не вейтинг) по какой то причине - то скипаем
      return null;
    }

    // в случае если вейтинг, то =>
    match.players.push(playerId);
    match.balances[playerId] = 0;
    match.status = "active";

    const readyMatch = await startAndSaveMatch(match);

    // сохраняем матч в активные в редис
    await rC.set(`match:${match.id}`, JSON.stringify(readyMatch));
    // удаляем матч из ожидающих в редис
    await rC.zRem("waiting:matches", matchId);

    // возвращаем  объект собраного матча
    return readyMatch;
  } finally {
    // удаляем все возможные локи в данной сессии
    await rC.del(lockKey);
  }
}
