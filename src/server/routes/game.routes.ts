import { Router } from "express";
import { joinOrCreateMatch } from "../../services/matchMaking.service";
import { getMatch, moveInMatch } from "../../services/match.service";
import { resumeMatch } from "../../services/resumeMatch.service";
import { getActiveMatch } from "../../services/playerMatch.service";
import { db } from "../../storage/playersDataBase";
import { PlayerRecord, getRank } from "../../storage/playersDataBaseActions";
import { authMiddleware } from "../auth.middleware";
import { refreshToken } from "../../utils/auth/auth";
import {
  claimFaucet,
  claimDailyPoints,
} from "../../storage/playersDataBaseActions";

const IS_MAINNET = process.env.GAME_MODE === "mainnet";

export const gameRouter = Router();

/* Хелпер для форматирования board — не отдаём value закрытых клеток */
function formatBoard(match: any) {
  if (match.status === "waiting") return [];
  return match.board.map((box: any) => ({
    id: box.id,
    openedBy: box.openedBy ?? null,
    // value видно только если клетка открыта
    value: box.openedBy ? box.value : undefined,
  }));
}

/* Хелпер для форматирования матча — одно место, нет дублирования */
function formatMatch(match: any) {
  return {
    matchId: match.matchId,
    status: match.status,
    players: match.players,
    currentTurn: match.currentTurn ?? null,
    balances: match.balances,
    turnStartedAt: match.turnStartedAt,
    boardHash: match.boardHash ?? null,
    lastMoveId: match.lastMoveId ?? null,
    board: formatBoard(match),
  };
}

/* ===== JOIN — войти в матч или создать новый ===== */
// authMiddleware проверяет JWT → кладёт playerId в req.playerId
gameRouter.post("/join", authMiddleware, async (req, res) => {
  try {
    const { bid, token } = req.body;
    const playerId = req.playerId!; // берём из JWT, не из body — нельзя подменить

    if (!bid || !token) {
      return res.status(400).json({ error: "bid and token are required" });
    }

    const match = await joinOrCreateMatch(playerId, String(bid), token);

    // После успешного join — выдаём свежий токен (продлеваем сессию)
    const newToken = refreshToken(playerId);

    res.json({
      message:
        match.status === "waiting" ? "waiting for opponent" : "match started",
      token: newToken, // фронт сохраняет и использует этот токен дальше
      match: formatMatch(match),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* ===== MATCH — получить текущий матч игрока ===== */
gameRouter.get("/match", authMiddleware, async (req, res) => {
  try {
    const playerId = req.playerId!;

    const matchId = await getActiveMatch(playerId);
    if (!matchId) {
      return res.status(404).json({ error: "player has no active match" });
    }

    const result = await getMatch(matchId);
    if (!result.ok || !result.match) {
      return res.status(404).json({ error: "match not found" });
    }

    const newToken = refreshToken(playerId);

    res.json({
      token: newToken,
      match: formatMatch(result.match),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* ===== MOVE — сделать ход ===== */
gameRouter.post("/move", authMiddleware, async (req, res) => {
  try {
    const { matchId, boxId, clientMoveId } = req.body;
    const playerId = req.playerId!;

    if (!matchId || boxId === undefined || !clientMoveId) {
      return res.status(400).json({
        error: "matchId, boxId and clientMoveId are required",
      });
    }

    const result = await moveInMatch(
      matchId,
      playerId,
      Number(boxId),
      clientMoveId,
    );

    if (result.error) return res.status(400).json({ error: result.error });
    if (!result.match)
      return res.status(404).json({ error: "match not found" });

    // После каждого хода — продлеваем токен (игрок активен, не AFK)
    const newToken = refreshToken(playerId);

    res.json({
      message: "move successful",
      token: newToken,
      match: formatMatch(result.match),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* ===== RESULT — результат завершённого матча ===== */
gameRouter.get("/result/:matchId", authMiddleware, async (req, res) => {
  try {
    const { matchId } = req.params;
    const playerId = req.playerId!;

    const result = await getMatch(matchId);
    if (!result.ok || !result.match) {
      return res.status(404).json({ error: "match not found" });
    }

    const match = result.match;
    if (match.status !== "finished") {
      return res.status(400).json({ error: "match is not finished yet" });
    }

    const newToken = refreshToken(playerId);

    res.json({
      token: newToken,
      match: {
        ...formatMatch(match),
        // В финальном результате отдаём все значения клеток
        board: match.board.map((box: any) => ({
          id: box.id,
          openedBy: box.openedBy ?? null,
          value: box.value,
        })),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* ===== RESUME — восстановить сессию после разрыва ===== */
gameRouter.post("/resume", authMiddleware, async (req, res) => {
  try {
    const playerId = req.playerId!;

    const result = await resumeMatch(playerId);
    if (!result.ok) {
      return res
        .status(404)
        .json({ error: "No active match found", reason: result.reason });
    }

    const newToken = refreshToken(playerId);

    res.json({
      message:
        result.match.status === "finished"
          ? "match finished"
          : "session restored",
      token: newToken,
      match: formatMatch(result.match),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* ===== STATS — статистика игрока ===== */
// Этот роут публичный — authMiddleware не нужен, смотреть статистику может любой
gameRouter.get("/player/:playerId/stats", async (req, res) => {
  try {
    const { playerId } = req.params;
    if (!playerId)
      return res.status(400).json({ error: "playerId is required" });

    const record = db
      .prepare("SELECT * FROM players WHERE playerId = ?")
      .get(playerId) as PlayerRecord | undefined;

    if (!record) return res.status(404).json({ error: "player not found" });

    const rank = getRank(record.games, record.wins);

    res.json({
      playerId: record.playerId,
      games: record.games,
      wins: record.wins,
      points: record.points ?? 0,
      rank,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* ===== FAUCET — бесплатные тестовые токены ===== */
gameRouter.post("/faucet", authMiddleware, async (req, res) => {
  if (IS_MAINNET) {
    return res.status(403).json({ error: "Faucet is disabled on mainnet" });
  }
  try {
    const playerId = req.playerId!;
    const result = claimFaucet(playerId);

    if (!result.success) {
      return res.status(429).json({ error: result.reason }); // 429 = Too Many Requests
    }

    res.json({
      message: "Tokens claimed successfully",
      balance: result.balance,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export const DAILY_POINTS = 30;
export const FIRST_LOGIN_POINTS = 300;

/* ===== DAILY POINTS — ежедневные поинты ===== */
gameRouter.post("/claim-points", authMiddleware, async (req, res) => {
  try {
    const playerId = req.playerId!;
    const result = claimDailyPoints(playerId);

    if (!result.success) {
      return res.status(429).json({ error: result.reason });
    }

    res.json({
      message: result.isFirstLogin
        ? `Welcome! You received ${FIRST_LOGIN_POINTS} points`
        : `Daily points claimed! You received ${DAILY_POINTS} points`,
      points: result.points,
      isFirstLogin: result.isFirstLogin,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
