import { Router } from "express";
import { joinOrCreateMatch } from "../../services/matchMaking.service";
import { getMatch, moveInMatch } from "../../services/match.service";
import { getGameResult } from "../../services/game.service";
import { resumeMatch } from "../../services/resumeMatch.service";
import { getActiveMatch } from "../../services/playerMatch.service";
import { db } from "../../storage/sqlLite";
import { PlayerRecord, getRank } from "../../storage/saveToSql";

export const gameRouter = Router();

/* entiry point */
gameRouter.post("/join", async (req, res) => {
  try {
    const { playerId, bid, token } = req.body;
    if (!playerId || !bid || !token) {
      return res
        .status(400)
        .json({ error: "playerId, bid and token are required" });
    }

    const match = await joinOrCreateMatch(playerId, String(bid), token);
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

/* active match by playedId = address */
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

/* turn */
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

/* get res */
gameRouter.get("/result/:matchId", async (req, res) => {
  try {
    const { matchId } = req.params;
    const result = await getMatch(matchId);

    if (!result.ok || !result.match) {
      return res.status(404).json({ error: "match not found" });
    }

    const match = result.match;

    if (match.status !== "finished") {
      return res.status(400).json({ error: "match is not finished yet" });
    }

    res.json({
      matchId: match.id,
      onChainId: match.onChainId ?? null,
      status: match.status,
      players: match.players,
      currentTurn: match.currentTurn ?? null,
      balances: match.balances, // остаётся string, как в ончейн
      turnStartedAt: match.turnStartedAt,
      boardHash: match.boardHash ?? null,
      lastMoveId: match.lastMoveId ?? null,
      // board тоже с value: string
      board: match.board.map((box) => ({
        id: box.id,
        openedBy: box.openedBy,
        value: box.value, // уже string
      })),
      result: getGameResult(match), // внутри getGameResult конвертируем в BigInt при вычислениях
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

gameRouter.get("/player/:address/stats", async (req, res) => {
  try {
    const address = req.params.address?.toLowerCase();
    if (!address) return res.status(400).json({ error: "address is required" });

    const record = db
      .prepare("SELECT * FROM players WHERE address = ?")
      .get(address) as PlayerRecord | undefined;

    if (!record) return res.status(404).json({ error: "player not found" });

    const rank = getRank(record.games, record.wins);

    res.json({
      address: record.address,
      games: record.games,
      wins: record.wins,
      points: record.points ?? 0,
      rank,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});