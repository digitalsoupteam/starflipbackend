import { Router } from "express";
import { joinOrCreateMatch } from "../../services/matchMaking.service";
import { getMatch, moveInMatch } from "../../services/match.service";
import { getGameResult } from "../../services/game.service";
import { resumeMatch } from "../../services/resumeMatch.service";
import { getActiveMatch } from "../../services/playerMatch.service";

export const gameRouter = Router();

/* Начать игру */
gameRouter.post("/join", async (req, res) => {
  try {
    const { playerId, bid, token } = req.body;
    if (!playerId || !bid || !token) {
      return res
        .status(400)
        .json({ error: "playerId, bid and token are required" });
    }

    const match = await joinOrCreateMatch(playerId, Number(bid), token);

    res.json({
      message:
        match.status === "waiting" ? "waiting for opponent" : "match started",
      match: {
        matchId: match.id,
        onChainId: match.onChainId ?? null,
        status: match.status,
        players: match.players,
        currentTurn: match.currentTurn ?? null,
        balances: match.balances,
        turnStartedAt: match.turnStartedAt,
        boardHash: match.boardHash ?? null,
        lastMoveId: match.lastMoveId ?? null,
        board:
          match.status === "active"
            ? match.board.map((box) => ({
                id: box.id,
                openedBy: box.openedBy,
                value: box.openedBy ? box.value : undefined,
              }))
            : match.status === "waiting"
              ? []
              : match.board,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* Получить активный матч по playerId (кошелек пользователя) */
gameRouter.get("/match", async (req, res) => {
  try {
    const { playerId } = req.query;
    if (!playerId || typeof playerId !== "string") {
      return res.status(400).json({ error: "playerId is required" });
    }

    const matchId = await getActiveMatch(playerId);
    if (!matchId)
      return res.status(404).json({ error: "player has no active match" });

    const result = await getMatch(matchId);
    if (!result.ok || !result.match)
      return res.status(404).json({ error: "match not found" });

    const match = result.match;

    res.json({
      matchId: match.id,
      onChainId: match.onChainId ?? null,
      status: match.status,
      players: match.players,
      currentTurn: match.currentTurn ?? null,
      balances: match.balances,
      turnStartedAt: match.turnStartedAt,
      boardHash: match.boardHash ?? null,
      lastMoveId: match.lastMoveId ?? null,
      board:
        match.status === "active"
          ? match.board.map((box) => ({
              id: box.id,
              openedBy: box.openedBy,
              value: box.openedBy ? box.value : undefined,
            }))
          : match.status === "waiting"
            ? []
            : match.board,
      ...(match.status === "finished" ? { result: getGameResult(match) } : {}),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* Сделать ход */
gameRouter.post("/move", async (req, res) => {
  try {
    const { matchId, playerId, boxId, clientMoveId } = req.body;
    if (!matchId || !playerId || boxId === undefined || !clientMoveId) {
      return res.status(400).json({
        error: "matchId, playerId, boxId and clientMoveId are required",
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

    const match = result.match;

    res.json({
      message: "move successful",
      match: {
        matchId: match.id,
        onChainId: match.onChainId ?? null,
        status: match.status,
        players: match.players,
        currentTurn: match.currentTurn ?? null,
        balances: match.balances,
        turnStartedAt: match.turnStartedAt,
        boardHash: match.boardHash ?? null,
        lastMoveId: match.lastMoveId ?? null,
        board: match.board.map((box) => ({
          id: box.id,
          openedBy: box.openedBy,
          value: box.openedBy ? box.value : undefined,
        })),
        ...(match.status === "finished"
          ? { result: getGameResult(match) }
          : {}),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* Получить результаты матча (в конце матча) */
gameRouter.get("/result/:matchId", async (req, res) => {
  try {
    const { matchId } = req.params;
    const result = await getMatch(matchId);
    if (!result.ok || !result.match)
      return res.status(404).json({ error: "match not found" });

    const match = result.match;
    if (match.status !== "finished")
      return res.status(400).json({ error: "match is not finished yet" });

    res.json({
      matchId: match.id,
      onChainId: match.onChainId ?? null,
      status: match.status,
      players: match.players,
      currentTurn: match.currentTurn ?? null,
      balances: match.balances,
      turnStartedAt: match.turnStartedAt,
      boardHash: match.boardHash ?? null,
      lastMoveId: match.lastMoveId ?? null,
      board: match.board,
      result: getGameResult(match),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* Восстановить матч из реддис по id (address) = recconnect */
gameRouter.post("/resume", async (req, res) => {
  try {
    const { playerId } = req.body;
    if (!playerId)
      return res.status(400).json({ error: "playerId is required" });

    const result = await resumeMatch(playerId);
    if (!result.ok)
      return res
        .status(404)
        .json({ error: "No active match found", reason: result.reason });

    const match = result.match;

    res.json({
      message:
        match.status === "finished" ? "match finished" : "session restored",
      match: {
        matchId: match.id,
        onChainId: match.onChainId ?? null,
        status: match.status,
        players: match.players,
        currentTurn: match.currentTurn ?? null,
        balances: match.balances,
        turnStartedAt: match.turnStartedAt,
        boardHash: match.boardHash ?? null,
        lastMoveId: match.lastMoveId ?? null,
        board:
          match.status === "active"
            ? match.board.map((box) => ({
                id: box.id,
                openedBy: box.openedBy,
                value: box.openedBy ? box.value : undefined,
              }))
            : match.status === "waiting"
              ? []
              : match.board,
        ...(match.status === "finished"
          ? { result: getGameResult(match) }
          : {}),
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
