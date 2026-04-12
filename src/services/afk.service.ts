/* src/services/afk.service.ts */

import { rC, activeSave } from "../storage/activeMatchesStorage";
import { Match } from "../structures/match.struct";
import { updatePlayersStatsWithRank } from "../storage/playersDataBaseActions";

const AFK_TIMEOUT_MS = 5 * 60 * 1000; // 5 минут
const CHECK_INTERVAL_MS = 15 * 1000; // проверяем каждые 15 секунд

/* 
  Считаем итоговые балансы при AFK:
  - afkPlayer    → только то что уже открыл
  - activePlayer → своё открытое + весь остаток поля (нераскрытые клетки)
*/
function calcAfkBalances(
  match: Match,
  afkPlayerId: string,
): Record<string, string> {
  const activePlayerId = match.players.find((p) => p !== afkPlayerId)!;

  // Сколько каждый уже открыл
  const afkOpened = BigInt(match.balances[afkPlayerId] ?? "0");
  const activeOpened = BigInt(match.balances[activePlayerId] ?? "0");

  // Сумма нераскрытых клеток
  const unopenedTotal = match.board
    .filter((box) => !box.openedBy)
    .reduce((acc, box) => acc + BigInt(box.value), 0n);

  // Активный игрок забирает своё + весь остаток поля
  const activeTotal = activeOpened + unopenedTotal;

  return {
    [afkPlayerId]: afkOpened.toString(),
    [activePlayerId]: activeTotal.toString(),
  };
}

/* Завершение матча по AFK */
async function finalizeAfkMatch(
  match: Match,
  afkPlayerId: string,
): Promise<void> {
  const activePlayerId = match.players.find((p) => p !== afkPlayerId)!;

  const finalBalances = calcAfkBalances(match, afkPlayerId);

  // Обновляем статус матча
  const finishedMatch: Match = {
    ...match,
    status: "finished",
    currentTurn: undefined,
    balances: finalBalances,
  };

  // Сохраняем финальное состояние в Redis
  await activeSave(finishedMatch);

  // Обновляем matchMeta
  await rC.set(
    `matchMeta:${match.matchId}`,
    JSON.stringify({ matchId: match.matchId, status: "finished" }),
  );

  // Победитель — активный игрок (он не ушёл в AFK)
  // Записываем статистику и балансы в БД
  updatePlayersStatsWithRank(match.players, activePlayerId, finalBalances);

  // TTL на Redis ключи — 2 минуты, потом сами удалятся
  const expireSec = 120;
  await rC.expire(`match:${match.matchId}`, expireSec);
  await rC.expire(`matchMeta:${match.matchId}`, expireSec);
  for (const playerId of match.players) {
    await rC.expire(`player:${playerId}:activeMatch`, expireSec);
  }

  console.log(
    `AFK finalize: match ${match.matchId}, afk=${afkPlayerId}, active=${activePlayerId}`,
  );
  console.table(
    match.players.map((p) => ({
      playerId: p,
      payout: finalBalances[p],
      role: p === afkPlayerId ? "AFK" : "WINNER",
    })),
  );
}

/* Проверяем один матч на AFK */
async function checkMatchAfk(matchId: string): Promise<void> {
  const raw = await rC.get(`match:${matchId}`);
  if (!raw) return;

  let match: Match;
  try {
    match = JSON.parse(raw) as Match;
  } catch {
    return;
  }

  // Нас интересуют только активные матчи
  if (match.status !== "active") return;

  // Нет currentTurn — что-то пошло не так, пропускаем
  if (!match.currentTurn) return;

  const elapsed = Date.now() - match.turnStartedAt;
  if (elapsed < AFK_TIMEOUT_MS) return;

  // Игрок чей сейчас ход — AFK
  const afkPlayerId = match.currentTurn;

  console.log(
    `AFK detected: match ${match.matchId}, player ${afkPlayerId}, elapsed ${Math.round(elapsed / 1000)}s`,
  );

  await finalizeAfkMatch(match, afkPlayerId);
}

/* Запускаем фоновый процесс */
export function startAfkWatcher(): void {
  console.log(
    `AFK watcher started (timeout=${AFK_TIMEOUT_MS / 1000}s, interval=${CHECK_INTERVAL_MS / 1000}s)`,
  );

  setInterval(async () => {
    try {
      // Берём все активные матчи из Redis по паттерну match:*
      // Используем SCAN чтобы не блокировать Redis (в отличие от KEYS)
      let cursor = "0";
      do {
        const result = await rC.scan(cursor, {
          MATCH: "match:*",
          COUNT: 100,
        });

        cursor = result.cursor;

        for (const key of result.keys) {
          // Пропускаем ключи типа match:123:lock, match:123:join и тп
          // Нам нужны только match:{matchId} — без двоеточия после matchId
          const parts = key.split(":");
          if (parts.length !== 2) continue;

          const matchId = parts[1];
          await checkMatchAfk(matchId).catch((err) => {
            console.error(`AFK check error for match ${matchId}:`, err);
          });
        }
      } while (cursor !== "0");
    } catch (err) {
      console.error("AFK watcher error:", err);
    }
  }, CHECK_INTERVAL_MS);
}
