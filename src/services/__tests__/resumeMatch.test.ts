import { rC } from "../../storage/activeStorage";
import { getActiveMatch, clearActiveMatch } from "../playerMatch.service";
import { Match, Box } from "../../structures/match.struct";
import { resumeMatch, ResumeResult } from "../resumeMatch.service";
import { saveMatch } from "../match.service";

// Мокаем ethers и контракты 
jest.mock("ethers", () => ({
  ethers: {
    JsonRpcProvider: jest.fn(),
    Wallet: jest.fn(),
    Contract: jest.fn(),
  },
}));

// ABI
jest.mock("../../contracts/contracts/PvPGridABI", () => ({
  PvPGridArtifact: { abi: [] },
}), { virtual: true });

// Мокаем зависимостий
jest.mock("../../storage/activeStorage");
jest.mock("../playerMatch.service");
jest.mock("../match.service");
jest.mock("../../utils/boardHash");
jest.mock("../../utils/random");

const mockedRC = rC as jest.Mocked<typeof rC>;
const mockedGetActiveMatch = getActiveMatch as jest.Mock;
const mockedClearActiveMatch = clearActiveMatch as jest.Mock;
const mockedSaveMatch = saveMatch as jest.MockedFunction<typeof saveMatch>;

describe("resumeMatch — реконнект игрока", () => {
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
    onChainId: "42"
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockedSaveMatch.mockResolvedValue(true);
  });

  test("успешно возвращает активный матч при реконнекте", async () => {
    const match = createMockMatch("active");

    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(JSON.stringify(match));

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: true }>;

    expect(res.ok).toBe(true);
    expect(res.match.id).toBe(matchId);
    expect(res.match.status).toBe("active");
    expect(res.match.currentTurn).toBe("p2");
    expect(res.match.turnStartedAt).toBeDefined();
    
    expect(mockedSaveMatch).toHaveBeenCalledWith(match);
    expect(mockedSaveMatch).toHaveBeenCalledTimes(1);
    expect(mockedClearActiveMatch).not.toHaveBeenCalled();
  });

  test("возвращает матч с тем же ходом и таймером после дисконнекта", async () => {
    const turnStartTime = Date.now() - 30000;
    const match: Match = {
      ...createMockMatch("active"),
      currentTurn: "p2",
      turnStartedAt: turnStartTime
    };

    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(JSON.stringify(match));

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: true }>;

    expect(res.ok).toBe(true);
    expect(res.match.currentTurn).toBe("p2");
    expect(res.match.turnStartedAt).toBe(turnStartTime);
    
    const timeSinceTurnStart = Date.now() - res.match.turnStartedAt;
    expect(timeSinceTurnStart).toBeGreaterThanOrEqual(30000);
  });

  test("очищает activeMatch если матч не найден в Redis", async () => {
    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(null);

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: false }>;

    expect(res.ok).toBe(false);
    expect(res.reason).toBe("match_not_found");
    expect(mockedClearActiveMatch).toHaveBeenCalledWith(playerId);
    expect(mockedClearActiveMatch).toHaveBeenCalledTimes(1);
    expect(mockedSaveMatch).not.toHaveBeenCalled();
  });

  test("возвращает 'no_active_match' если у игрока нет активного матча", async () => {
    mockedGetActiveMatch.mockResolvedValue(null);

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: false }>;

    expect(res.ok).toBe(false);
    expect(res.reason).toBe("no_active_match");
    expect(mockedRC.get).not.toHaveBeenCalled();
    expect(mockedClearActiveMatch).not.toHaveBeenCalled();
    expect(mockedSaveMatch).not.toHaveBeenCalled();
  });

  test("не вызывает saveMatch для завершенного матча и очищает activeMatch", async () => {
    const match = createMockMatch("finished");

    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(JSON.stringify(match));

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: true }>;

    expect(res.ok).toBe(true);
    expect(res.match.status).toBe("finished");
    
    expect(mockedSaveMatch).not.toHaveBeenCalled();
    expect(mockedClearActiveMatch).toHaveBeenCalledWith(playerId);
  });

  test("возвращает матч в статусе waiting без currentTurn", async () => {
    const match = createMockMatch("waiting");

    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(JSON.stringify(match));

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: true }>;

    expect(res.ok).toBe(true);
    expect(res.match.status).toBe("waiting");
    expect(res.match.currentTurn).toBeUndefined();
    expect(res.match.turnStartedAt).toBe(0);
    
    expect(mockedSaveMatch).not.toHaveBeenCalled();
    expect(mockedClearActiveMatch).not.toHaveBeenCalled();
  });

  test("сохраняет матч даже если saveMatch вернул false", async () => {
    const match = createMockMatch("active");
    
    mockedSaveMatch.mockResolvedValue(false);
    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(JSON.stringify(match));

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: true }>;

    expect(res.ok).toBe(true);
    expect(res.match).toBeDefined();
    expect(mockedSaveMatch).toHaveBeenCalledWith(match);
    expect(mockedSaveMatch).toHaveBeenCalledTimes(1);
  });

  test("корректно обрабатывает матч с onChainId", async () => {
    const match = {
      ...createMockMatch("active"),
      onChainId: "12345"
    };

    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(JSON.stringify(match));

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: true }>;

    expect(res.ok).toBe(true);
    expect(res.match.onChainId).toBe("12345");
    expect(mockedSaveMatch).toHaveBeenCalledWith(match);
  });

  test("обрабатывает ошибку парсинга JSON из Redis", async () => {
    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue("{invalid-json");

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: false }>;

    expect(res.ok).toBe(false);
    expect(res.reason).toBe("match_not_found");
    expect(mockedClearActiveMatch).toHaveBeenCalledWith(playerId);
  });

  test("сохраняет матч при реконнекте даже если turnStartedAt устарел", async () => {
    const match = createMockMatch("active");
    
    mockedGetActiveMatch.mockResolvedValue(matchId);
    mockedRC.get.mockResolvedValue(JSON.stringify(match));

    const res = await resumeMatch(playerId) as Extract<ResumeResult, { ok: true }>;

    expect(res.ok).toBe(true);
    expect(mockedSaveMatch).toHaveBeenCalledWith(match);
    expect(res.match.turnStartedAt).toBe(match.turnStartedAt);
  });
});