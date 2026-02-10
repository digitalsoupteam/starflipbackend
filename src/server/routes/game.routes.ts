import { Router } from "express";
import { joinOrCreateMatch } from "../../services/matchMaking.service";
import { getMatch, moveInMatch, startAndSaveMatch } from "../../services/match.service";
import { getGameResult } from "../../services/game.service";
import { resumeMatch } from "../../services/resumeMatch.service";
import { clearActiveMatch } from "../../services/playerMatch.service";

/* Роутинг для всей игры */
export const gameRouter = Router();

/* Начать поиск матча */
gameRouter.post("/join", async (req, res) => {
  try {
    const { playerId, bid } = req.body;
    
    if (!playerId || !bid) {
      return res.status(400).json({ error: "playerId and bid are required" });
    }

    const match = await joinOrCreateMatch(playerId, bid);
    res.json({
      message: match.status === "waiting" ? "waiting for opponent" : "match started",
      match
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* Получить информацию о матче */
gameRouter.get("/match/:matchId", async (req, res) => {
  try {
    const { matchId } = req.params;
    const result = await getMatch(matchId);

    if (!result.ok) {
      return res.status(404).json({ error: "match not found" });
    }

    const match = result.match!;
    const response: any = {
      matchId: match.id,
      status: match.status,
      players: match.players,
      currentTurn: match.currentTurn,
      balances: match.balances,
      turnStartedAt: match.turnStartedAt,
      boardHash: match.boardHash,
      lastMoveId: match.lastMoveId
    };

    // Если матч активен, не показываем содержимое закрытых ячеек
    if (match.status === "active") {
      response.board = match.board.map(box => ({
        id: box.id,
        openedBy: box.openedBy,
        value: box.openedBy ? box.value : undefined // Скрываем значение закрытых ячеек
      }));
    } else {
      response.board = match.board; // Показываем всё для завершенных матчей
    }

    // Если игра завершена, добавляем результат
    if (match.status === "finished") {
      const result = getGameResult(match);
      response.result = result;
    }

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* Сделать ход */
gameRouter.post("/move", async (req, res) => {
  try {
    const { matchId, playerId, boxId, clientMoveId } = req.body;

    if (!matchId || !playerId || boxId === undefined) {
      return res.status(400).json({ 
        error: "matchId, playerId and boxId are required" 
      });
    }

    if (!clientMoveId) {
      return res.status(400).json({
        error: "clientMoveId is required for idempotency"
      });
    }

    const result = await moveInMatch(
      matchId, 
      playerId, 
      Number(boxId),
      clientMoveId
    );

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    const response: any = {
      message: "move successful",
      match: {
        matchId: result.match!.id,
        status: result.match!.status,
        currentTurn: result.match!.currentTurn,
        balances: result.match!.balances,
        turnStartedAt: result.match!.turnStartedAt,
        boardHash: result.match!.boardHash,
        lastMoveId: result.match!.lastMoveId
      }
    };

    // Показываем обновленную доску (только открытые ячейки) 
    response.match.board = result.match!.board.map(box => ({
      id: box.id,
      openedBy: box.openedBy,
      value: box.openedBy ? box.value : undefined
    }));

    // Если игра завершена, добавляем результат 
    if (result.match!.status === "finished") {
      const gameResult = getGameResult(result.match!);
      response.result = gameResult;
    }

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* Получить результаты игры */
gameRouter.get("/result/:matchId", async (req, res) => {
  try {
    const { matchId } = req.params;
    const result = await getMatch(matchId);

    if (!result.ok) {
      return res.status(404).json({ error: "match not found" });
    }

    const match = result.match!;
    
    if (match.status !== "finished") {
      return res.status(400).json({ error: "match is not finished yet" });
    }

    const gameResult = getGameResult(match);
    res.json(gameResult);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* Восстановить сессию игрока (реконнект) */
gameRouter.post("/resume", async (req, res) => {
  try {
    const { playerId } = req.body;
    
    if (!playerId) {
      return res.status(400).json({ error: "playerId is required" });
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
      message: match.status === "finished" ? "match finished" : "session restored",
      match: {
        matchId: match.id,
        status: match.status,
        players: match.players,
        currentTurn: match.currentTurn,
        balances: match.balances,
        turnStartedAt: match.turnStartedAt,
        boardHash: match.boardHash,
        lastMoveId: match.lastMoveId
      }
    };

    // Если матч активен, не показываем содержимое закрытых ячеек
    if (match.status === "active") {
      response.match.board = match.board.map(box => ({
        id: box.id,
        openedBy: box.openedBy,
        value: box.openedBy ? box.value : undefined
      }));
    } else {
      response.match.board = match.board;
      // Если матч завершен, добавляем результат
      if (match.status === "finished") {
        const gameResult = getGameResult(match);
        response.result = gameResult;
      }
    }

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* Старт матча вручную (для тестирования) */
gameRouter.post("/start-test", async (req, res) => {
  try {
    const { match } = req.body;
    
    if (!match) {
      return res.status(400).json({ error: "match object is required" });
    }

    // Проверяем, что есть 2 игрока для старта
    if (match.players.length !== 2) {
      return res.status(400).json({ error: "Need 2 players to start" });
    }

    const startedMatch = await startAndSaveMatch(match);
    
    res.json({
      message: "match started",
      match: startedMatch
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* Проверить статус таймера хода */
gameRouter.get("/check-timeout/:matchId", async (req, res) => {
  try {
    const { matchId } = req.params;
    const result = await getMatch(matchId);

    if (!result.ok) {
      return res.status(404).json({ error: "match not found" });
    }

    const match = result.match!;
    
    if (match.status !== "active" || !match.currentTurn || !match.turnStartedAt) {
      return res.json({ 
        timeout: false, 
        message: "Match not in active turn state" 
      });
    }

    const now = Date.now();
    const timeSinceTurnStart = now - match.turnStartedAt;
    const TURN_TIMEOUT_MS = 300_000; // 5 минут
    
    res.json({
      timeout: timeSinceTurnStart > TURN_TIMEOUT_MS,
      timeSinceTurnStart,
      turnStartedAt: match.turnStartedAt,
      currentTurn: match.currentTurn,
      timeLeft: Math.max(0, TURN_TIMEOUT_MS - timeSinceTurnStart)
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});