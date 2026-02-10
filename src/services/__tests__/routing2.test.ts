import request from "supertest";
import express from "express";
import { gameRouter } from "../../server/routes/game.routes";
import { joinOrCreateMatch } from "../../services/matchMaking.service";
import {
  getMatch,
  moveInMatch,
  startAndSaveMatch,
} from "../../services/match.service";
import { getGameResult } from "../../services/game.service";
import { resumeMatch } from "../../services/resumeMatch.service";
import { clearActiveMatch } from "../../services/playerMatch.service";

jest.mock("../../services/matchMaking.service");
jest.mock("../../services/match.service");
jest.mock("../../services/game.service");
jest.mock("../../services/resumeMatch.service");
jest.mock("../../services/playerMatch.service");

const app = express();
app.use(express.json());
app.use("/api/game", gameRouter);

describe("Game Router", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/game/join", () => {
    test("should create or join match successfully", async () => {
      const mockMatch = {
        id: "match123",
        status: "waiting",
        players: ["player1"],
        bid: 100,
        total: 200,
        // ... другие поля
      };

      (joinOrCreateMatch as jest.Mock).mockResolvedValue(mockMatch);

      const response = await request(app)
        .post("/api/game/join")
        .send({ playerId: "player1", bid: 100 });

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        message: "waiting for opponent",
        match: mockMatch,
      });
    });

    test("should return 400 if missing parameters", async () => {
      const response = await request(app)
        .post("/api/game/join")
        .send({ playerId: "player1" });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain("required");
    });
  });

  describe("GET /api/game/match/:matchId", () => {
    test("should return match details", async () => {
      const mockMatch = {
        id: "match123",
        status: "active",
        players: ["player1", "player2"],
        currentTurn: "player1",
        balances: { player1: 100, player2: 100 },
        board: [
          { id: 1, value: 10, openedBy: "player1" },
          { id: 2, value: undefined, openedBy: undefined },
        ],
        // ... другие поля
      };

      (getMatch as jest.Mock).mockResolvedValue({
        ok: true,
        match: mockMatch,
      });

      const response = await request(app).get("/api/game/match/match123");

      expect(response.status).toBe(200);
      expect(response.body.matchId).toBe("match123");
      // Проверяем, что скрыты значения закрытых ячеек
      expect(response.body.board[1].value).toBeUndefined();
    });

    test("should return 404 if match not found", async () => {
      (getMatch as jest.Mock).mockResolvedValue({
        ok: false,
        error: "not_found",
      });

      const response = await request(app).get("/api/game/match/nonexistent");

      expect(response.status).toBe(404);
    });
  });

  describe("POST /api/game/move", () => {
    test("should make a move successfully", async () => {
      const mockMatchAfterMove = {
        id: "match123",
        status: "active",
        currentTurn: "player2",
        board: [
          { id: 1, value: 10, openedBy: "player1" },
          { id: 2, value: 20, openedBy: "player2" },
        ],
        // ... другие поля
      };

      (moveInMatch as jest.Mock).mockResolvedValue({
        match: mockMatchAfterMove,
      });

      const response = await request(app).post("/api/game/move").send({
        matchId: "match123",
        playerId: "player1",
        boxId: 1,
        clientMoveId: "click_12345",
      });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("move successful");
      expect(moveInMatch).toHaveBeenCalledWith(
        "match123",
        "player1",
        1,
        "click_12345",
      );
    });

    test("should require clientMoveId", async () => {
      const response = await request(app).post("/api/game/move").send({
        matchId: "match123",
        playerId: "player1",
        boxId: 1,
      });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain("clientMoveId");
    });
  });

  describe("POST /api/game/resume", () => {
    test("should resume player session", async () => {
      const mockMatch = {
        id: "match123",
        status: "active",
        currentTurn: "player1",
        players: ["player1", "player2"],
        balances: { player1: 100, player2: 100 },
        board: [],
        createdAt: Date.now(),
        creator: "player1",
        bid: 100,
        total: 200,
        count: 12,
        turnStartedAt: Date.now(),
        // Добавьте все обязательные поля из интерфейса Match
      };

      (resumeMatch as jest.Mock).mockResolvedValue({
        ok: true,
        match: mockMatch,
      });

      const response = await request(app)
        .post("/api/game/resume")
        .send({ playerId: "player1" });

      console.log("Response status:", response.status);
      console.log("Response body:", JSON.stringify(response.body, null, 2));

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("session restored");
      expect(response.body.match.matchId).toBe("match123");
    });

    test("should handle no active match", async () => {
      (resumeMatch as jest.Mock).mockResolvedValue({
        ok: false,
        reason: "no_active_match",
      });

      const response = await request(app)
        .post("/api/game/resume")
        .send({ playerId: "player1" });

      console.log("Error response:", response.body);

      expect(response.status).toBe(404);
      expect(response.body.reason).toBe("no_active_match");
    });
  });
});
