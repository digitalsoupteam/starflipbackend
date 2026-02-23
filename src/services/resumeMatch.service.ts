/* Восстановление, реконекты */

import { rC } from "../storage/activeStorage";
import { getActiveMatch, clearActiveMatch } from "./playerMatch.service";
import { Match } from "../structures/match.struct";
import { saveMatch } from "./match.service";
import { getGameResult } from "./game.service";

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


/* Восстановить активный матч игрока (reconnect) */
gameRouter.post("/resume", async (req, res) => {
  try {
    const { playerId } = req.body;

    if (!playerId) {
      return res.status(400).json({
        error: "playerId is required"
      });
    }

    const result = await resumeMatch(playerId);

    if (!result.ok) {
      return res.status(404).json({
        error: "No active match found",
        reason: result.reason
      });
    }

    const match = result.match;

    const response: any = {
      message:
        match.status === "finished"
          ? "match finished"
          : "session restored",
      match: {
        matchId: match.id,
        status: match.status,
        players: match.players,
        currentTurn: match.currentTurn,
        balances: match.balances,
        turnStartedAt: match.turnStartedAt,
        boardHash: match.boardHash,
        lastMoveId: match.lastMoveId,
        board:
          match.status === "active"
            ? match.board.map(box => ({
                id: box.id,
                openedBy: box.openedBy,
                value: box.openedBy ? box.value : undefined
              }))
            : match.board
      }
    };

    if (match.status === "finished") {
      response.result = getGameResult(match);
    }

    return res.json(response);
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "internal error"
    });
  }
});

/* Кирилл, пример использования для фронта примерно такой:

при старте приложения / реконнекте
const res = await api.resumeMatch(playerId);
если получили res => показываем его на экране (значит есть куда рекконнектиться)
else
идём в matchmaking
joinOrCreateMatch(); (значит пользователь не имеет игр, не вылетал, а просто создает матч)
*/


