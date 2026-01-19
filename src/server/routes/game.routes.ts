import { Router } from "express";
import { joinOrCreateMatch } from "../../services/matchMaking.service";
import { getMatch, moveInMatch } from "../../services/match.service";
import { getGameResult } from "../../services/game.service";

export const gameRouter = Router();

// Начать поиск матча
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

// Получить информацию о матче
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
      balances: match.balances
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

// Сделать ход
gameRouter.post("/move", async (req, res) => {
  try {
    const { matchId, playerId, boxId } = req.body;

    if (!matchId || !playerId || boxId === undefined) {
      return res.status(400).json({ 
        error: "matchId, playerId and boxId are required" 
      });
    }

    const result = await moveInMatch(matchId, playerId, Number(boxId));

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    const response: any = {
      message: "move successful",
      match: {
        matchId: result.match!.id,
        status: result.match!.status,
        currentTurn: result.match!.currentTurn,
        balances: result.match!.balances
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

// Получить результаты игры
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

