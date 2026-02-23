/* Восстановление, реконекты */

import { rC } from "../storage/activeStorage";
import { getActiveMatch, clearActiveMatch } from "./playerMatch.service";
import { Match } from "../structures/match.struct";
import { saveMatch } from "./match.service";

export type ResumeResult =
  | { ok: true; match: Match }
  | { ok: false; reason: "no_active_match" | "match_not_found" };

/* Вернуться в матч, если он еще есть */
export async function resumeMatch(
  playerId: string
): Promise<ResumeResult> {
  const matchId = await getActiveMatch(playerId);

  if (!matchId) {
    return { ok: false, reason: "no_active_match" };
  }

  try {
    const raw = await rC.get(`match:${matchId}`);

    if (!raw) {
      await clearActiveMatch(playerId);
      return { ok: false, reason: "match_not_found" };
    }

    let match: Match;
    try {
      match = JSON.parse(raw) as Match;
    } catch (e) {
      // шибка парсинга JSON - матч сломан, очищаем
      await clearActiveMatch(playerId);
      return { ok: false, reason: "match_not_found" };
    }

    if (match.status === "active") {
      await saveMatch(match);
    }

    // если матч теперь finished, очищаем активный матч
    if (match.status === "finished") {
      await clearActiveMatch(playerId);
    }

    return { ok: true, match };
  } catch (error) {
    // Любая другая ошибка Redis
    console.error(`Error resuming match for player ${playerId}:`, error);
    await clearActiveMatch(playerId);
    return { ok: false, reason: "match_not_found" };
  }
}




/* Кирилл, пример использования для фронта примерно такой:

при старте приложения / реконнекте
const res = await api.resumeMatch(playerId);
если получили res => показываем его на экране (значит есть куда рекконнектиться)
else
идём в matchmaking
joinOrCreateMatch(); (значит пользователь не имеет игр, не вылетал, а просто создает матч)
*/


