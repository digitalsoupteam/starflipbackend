import { rC } from "../../storage/activeStorage";
import { getActiveMatch, clearActiveMatch } from "../playerMatch.service";
import { Match, Box } from "../../structures/match.struct";
import { resumeMatch, ResumeResult } from "../resumeMatch.service";
import { saveMatch } from "../match.service";

// Мокаем зависимости
jest.mock("../../storage/activeStorage");
jest.mock("../playerMatch.service");
jest.mock("../match.service");
jest.mock("../../utils/boardHash");
jest.mock("../../utils/random");

const mockedRC = rC as jest.Mocked<typeof rC>;
const mockedGetActiveMatch = getActiveMatch as jest.Mock;
const mockedClearActiveMatch = clearActiveMatch as jest.Mock;
const mockedSaveMatch = saveMatch as jest.MockedFunction<typeof saveMatch>;

describe("resumeMatch — реконнект игрока через Redis", () => {
  const playerId = "p1";
  const matchId = "m1";

  const createMockMatch = (status: Match["status"] = "active"): Match => ({
    id: matchId,
    createdAt: Date.now() - 60000,
    creator: "p1",
    players: ["p1", "p2"],
    bid: 10,
    total: 20,
    count: 12,
    board: Array(12).fill(null).map((_, i): Box => ({
      id: i,
      value: 5,
      openedBy: undefined
    })),
    balances: { p1: 10, p2: 10 },
    status,
    currentTurn: status === "active" ? "p2" : undefined,
    turnStartedAt: status === "active" ? Date.now() - 30000 : 0,
    lastMoveId: status === "active" ? "move-123" : undefined,
    onChainId: undefined
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockedSaveMatch.mockResolvedValue(true);
  });

  test("успешно возвращает активный матч", async () => {
    const match = createMockMatch("active");
    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(JSON.stringify(match));

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: true }>;

    expect(res.ok).toBe(true);
    expect(res.match.id).toBe(matchId);
    expect(res.match.status).toBe("active");
    expect(mockedSaveMatch).toHaveBeenCalledWith(match);
    expect(mockedClearActiveMatch).not.toHaveBeenCalled();
  });

  test("возвращает 'no_active_match', если игрок без матча", async () => {
    mockedGetActiveMatch.mockResolvedValue(null);

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: false }>;

    expect(res.ok).toBe(false);
    expect(res.reason).toBe("no_active_match");
    expect(mockedRC.get).not.toHaveBeenCalled();
    expect(mockedClearActiveMatch).not.toHaveBeenCalled();
  });

  test("очищает activeMatch если матч не найден в Redis", async () => {
    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(null);

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: false }>;

    expect(res.ok).toBe(false);
    expect(res.reason).toBe("match_not_found");
    expect(mockedClearActiveMatch).toHaveBeenCalledWith(playerId);
  });

  test("не сохраняет завершенный матч и очищает activeMatch", async () => {
    const match = createMockMatch("finished");
    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(JSON.stringify(match));

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: true }>;

    expect(res.ok).toBe(true);
    expect(res.match.status).toBe("finished");
    expect(mockedSaveMatch).not.toHaveBeenCalled();
    expect(mockedClearActiveMatch).toHaveBeenCalledWith(playerId);
  });
});