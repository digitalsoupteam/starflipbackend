import { Router } from "express";
import { joinOrCreateMatch, cancelSearch } from "../../services/matchMaking.service";
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
  DAILY_POINTS,
} from "../../storage/playersDataBaseActions";

const IS_MAINNET = process.env.GAME_MODE === "mainnet";

export const gameRouter = Router();

/* value is omitted for closed cells — clients must not know them in advance */
function formatBoard(match: any) {
  if (match.status === "waiting") return [];
  return match.board.map((box: any) => ({
    id: box.id,
    openedBy: box.openedBy ?? null,
    value: box.openedBy ? box.value : undefined,
  }));
}

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

gameRouter.post("/join", authMiddleware, async (req, res) => {
  try {
    const { bid, token } = req.body;
    const playerId = req.playerId!; // from JWT — cannot be spoofed via body

    if (!bid || !token) {
      return res.status(400).json({ error: "bid and token are required" });
    }

    const match = await joinOrCreateMatch(playerId, String(bid), token);
    const newToken = refreshToken(playerId);

    res.json({
      message:
        match.status === "waiting" ? "waiting for opponent" : "match started",
      token: newToken,
      match: formatMatch(match),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

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
        // Reveal all cell values in the final result
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

gameRouter.post("/cancel", authMiddleware, async (req, res) => {
  try {
    const playerId = req.playerId!;
    const refunded = await cancelSearch(playerId);
    const newToken = refreshToken(playerId);
    res.json({
      message: refunded ? "Search cancelled, bid refunded" : "No active search found",
      refunded,
      token: newToken,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

gameRouter.get("/me", authMiddleware, async (req, res) => {
  try {
    const playerId = req.playerId!;
    const record = db
      .prepare("SELECT * FROM players WHERE playerId = ?")
      .get(playerId) as PlayerRecord | undefined;

    if (!record) return res.status(404).json({ error: "player not found" });

    const newToken = refreshToken(playerId);

    res.json({
      token: newToken,
      player: {
        playerId: record.playerId,
        points: record.points ?? 0,
        balance: record.playerBalance,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* Public — no auth required */
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

/* Testnet only — disabled on mainnet */
gameRouter.post("/faucet", authMiddleware, async (req, res) => {
  if (IS_MAINNET) {
    return res.status(403).json({ error: "Faucet is disabled on mainnet" });
  }
  try {
    const playerId = req.playerId!;
    const result = claimFaucet(playerId);

    if (!result.success) {
      return res.status(429).json({ error: result.reason });
    }

    res.json({
      message: "Tokens claimed successfully",
      balance: result.balance,
      isFirstLogin: false,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

gameRouter.post("/claim-points", authMiddleware, async (req, res) => {
  try {
    const playerId = req.playerId!;
    const result = claimDailyPoints(playerId);

    if (!result.success) {
      return res.status(429).json({ error: result.reason });
    }

    res.json({
      message: `Daily points recieved! You can clame new points tomorrow`,
      points: result.points,
      isFirstLogin: result.isFirstLogin ?? false,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* GET /game/leaderboard?page=1 — top players by points, 10 per page */
gameRouter.get("/leaderboard", authMiddleware, (req, res) => {
  try {
    const playerId = req.playerId!;
    const page = Math.max(1, parseInt(String(req.query.page ?? "1"), 10));
    const limit = 10;
    const offset = (page - 1) * limit;

    const total = (db.prepare(
      `SELECT COUNT(*) as cnt FROM players WHERE points > 0`
    ).get() as any).cnt as number;

    const rows = db.prepare(`
      SELECT playerId, points, games, wins
      FROM players
      WHERE points > 0
      ORDER BY points DESC, games DESC
      LIMIT ? OFFSET ?
    `).all(limit, offset) as { playerId: string; points: number; games: number; wins: number }[];

    const players = rows.map((r, i) => ({
      rank: offset + i + 1,
      playerId: r.playerId,
      points: r.points,
      games: r.games,
      wins: r.wins,
    }));

    const myData = db.prepare(
      `SELECT points, games, wins FROM players WHERE playerId = ?`
    ).get(playerId) as any;

    const myRankRow = myData ? (db.prepare(`
      SELECT COUNT(*) as cnt FROM players
      WHERE points > ? OR (points = ? AND games > ?)
    `).get(myData.points, myData.points, myData.games) as any) : null;

    const myRank = myRankRow ? (myRankRow.cnt as number) + 1 : null;

    res.json({
      players,
      total,
      page,
      limit,
      myRank: myData ? { rank: myRank, playerId, points: myData.points, games: myData.games, wins: myData.wins } : null,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
