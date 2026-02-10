import { rC } from "../../storage/activeStorage";
import { getActiveMatch, clearActiveMatch } from "../playerMatch.service";
import { Match } from "../../structures/match.struct";
import { resumeMatch } from "../resumeMatch.service";
import { saveMatch } from "../match.service";

// Мокаем все зависимости
jest.mock("../../storage/activeStorage");
jest.mock("../playerMatch.service");
jest.mock("../match.service");

const mockedRC = rC as jest.Mocked<typeof rC>;
const mockedGetActiveMatch = getActiveMatch as jest.Mock;
const mockedClearActiveMatch = clearActiveMatch as jest.Mock;
const mockedSaveMatch = saveMatch as jest.MockedFunction<typeof saveMatch>;

describe("resumeMatch", () => {
  const playerId = "p1";
  const matchId = "m1";

  beforeEach(() => {
    jest.clearAllMocks();
    // Мокаем saveMatch, чтобы возвращал boolean
    mockedSaveMatch.mockResolvedValue(true);
  });

  test("возвращает активный матч при реконнекте", async () => {
    const match: Match = {
      id: matchId,
      createdAt: Date.now(),
      creator: "p1",
      players: ["p1", "p2"],
      bid: 10,
      total: 20,
      count: 12,
      board: [],
      balances: { p1: 0, p2: 0 },
      status: "active",
      currentTurn: "p1",
      turnStartedAt: Date.now(),
    };

    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(JSON.stringify(match));

    const res = await resumeMatch(playerId);

    expect(res.ok).toBe(true);
    if (res.ok) expect(res.match.id).toBe(matchId);

    // Проверяем, что saveMatch вызвался для активного матча
    expect(mockedSaveMatch).toHaveBeenCalledWith(match);
  });

  test("очищает activeMatch если матч не найден в Redis", async () => {
    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(null);

    const res = await resumeMatch(playerId);

    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.reason).toBe("match_not_found");
      expect(mockedClearActiveMatch).toHaveBeenCalledWith(playerId);
    }
  });
});

describe("resumeMatch — реконнект", () => {
  const playerId = "p1";
  const matchId = "m1";

  beforeEach(() => {
    jest.clearAllMocks();
    mockedSaveMatch.mockResolvedValue(true);
  });

  test("после дисконнекта матч возвращается с тем же ходом и таймером", async () => {
    const now = Date.now();

    const match: Match = {
      id: matchId,
      createdAt: now - 60_000,
      creator: "p1",
      players: ["p1", "p2"],
      bid: 10,
      total: 20,
      count: 12,
      board: [],
      balances: { p1: 0, p2: 0 },
      status: "active",
      currentTurn: "p2",
      turnStartedAt: now - 30_000,
    };

    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(JSON.stringify(match));

    const res = await resumeMatch(playerId);

    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.match.id).toBe(matchId);
    expect(res.match.currentTurn).toBe("p2");
    expect(res.match.turnStartedAt).toBe(match.turnStartedAt);

    // Таймер реально идёт
    expect(Date.now() - res.match.turnStartedAt).toBeGreaterThan(0);

    expect(mockedSaveMatch).toHaveBeenCalledWith(match);
  });
});
