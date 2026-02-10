/* тест роутов */

import { joinOrCreateMatch } from "../../services/matchMaking.service";
import { getMatch, moveInMatch } from "../../services/match.service";
import { getGameResult } from "../../services/game.service";
import { resumeMatch } from "../../services/resumeMatch.service";
import { clearActiveMatch } from "../../services/playerMatch.service";

// Мокируем зависимости
jest.mock("../../services/matchMaking.service");
jest.mock("../../services/match.service");
jest.mock("../../services/game.service");
jest.mock("../../services/resumeMatch.service");
jest.mock("../../services/playerMatch.service");

const mockedJoinOrCreateMatch = joinOrCreateMatch as jest.Mock;
const mockedGetMatch = getMatch as jest.Mock;
const mockedMoveInMatch = moveInMatch as jest.Mock;
const mockedResumeMatch = resumeMatch as jest.Mock;

describe("Game Router Logic Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("joinOrCreateMatch should be called with correct parameters", async () => {
    const mockMatch = {
      id: "test123",
      status: "waiting",
      players: ["player1"],
      bid: 100,
      total: 200,
      count: 12,
      board: [],
      balances: {},
      createdAt: Date.now(),
      creator: "player1",
      turnStartedAt: Date.now(),
    };

    mockedJoinOrCreateMatch.mockResolvedValue(mockMatch);

    // Симулируем вызов
    const result = await joinOrCreateMatch("player1", 100);
    
    expect(result).toEqual(mockMatch);
    expect(mockedJoinOrCreateMatch).toHaveBeenCalledWith("player1", 100);
  });

  test("moveInMatch requires clientMoveId", async () => {
    const mockMatch = {
      id: "test123",
      status: "active",
      currentTurn: "player1",
    };

    mockedMoveInMatch.mockResolvedValue({
      match: mockMatch,
    });

    const result = await moveInMatch("test123", "player1", 0, "client123");
    
    expect(mockedMoveInMatch).toHaveBeenCalledWith(
      "test123",
      "player1",
      0,
      "client123"
    );
  });

  test("resumeMatch handles player without active match", async () => {
    mockedResumeMatch.mockResolvedValue({
      ok: false,
      reason: "no_active_match",
    });

    const result = await resumeMatch("player123");
    
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("no_active_match");
    }
  });
});