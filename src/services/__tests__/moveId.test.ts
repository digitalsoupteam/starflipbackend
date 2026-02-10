import { moveInMatch } from "../match.service";

// Мока модуля activeStorage
jest.mock("../../storage/activeStorage", () => {
  const mockRC = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  return {
    rC: mockRC,
    activeSave: jest.fn(),
  };
});

describe("moveInMatch — проверки ходов и идемпотентности", () => {
  const match = {
    id: "m1",
    createdAt: Date.now(),
    creator: "p1",
    players: ["p1", "p2"],
    bid: 10,
    total: 20,
    count: 12,
    board: Array(12).fill(null).map((_, i) => ({ id: i, value: 5, openedBy: undefined })), // Box
    balances: { p1: 10, p2: 10 },
    status: "active",
    currentTurn: "p1",
    lastMoveId: "move-1",
    turnStartedAt: Date.now(),
  };

  const mockedActiveStorage = require("../../storage/activeStorage");

  beforeEach(() => {
    jest.clearAllMocks();

    // Мок rC.get для getMatch и кулдаунов
    mockedActiveStorage.rC.get.mockImplementation(async (key: string) => {
      if (key === `match:${match.id}`) return JSON.stringify(match);
      return null;
    });

    // Мока rC.set для блокировок и кулдаунов
    mockedActiveStorage.rC.set.mockResolvedValue("OK");

    // Мок rC.del
    mockedActiveStorage.rC.del.mockResolvedValue(1);

    // Мок activeSave
    mockedActiveStorage.activeSave.mockResolvedValue({ ok: true });
  });

  test("повторный clientMoveId не делает повторный ход", async () => {
    const res = await moveInMatch(match.id, "p1", 0, "move-1");

    expect(res.error).toBeUndefined();
    expect(res.match).toBeDefined();
    expect(res.match!.lastMoveId).toBe("move-1");
    expect(res.match!.balances.p1).toBe(10);
    expect(res.match!.board[0].openedBy).toBeUndefined();
  });

  test("новый ход обновляет баланс, currentTurn и openedBy", async () => {
    const res = await moveInMatch(match.id, "p1", 0, "move-2");

    expect(res.error).toBeUndefined();
    expect(res.match).toBeDefined();
    expect(res.match!.lastMoveId).toBe("move-2");
    expect(res.match!.currentTurn).toBe("p2");
    expect(res.match!.balances.p1).toBeGreaterThan(10);
    expect(res.match!.board[0].openedBy).toBe("p1");
  });

  test("один и тот же clientMoveId не применяет ход повторно (идемпотентность)", async () => {
    // Первый ход
    const first = await moveInMatch(match.id, "p1", 0, "move-3");
    expect(first.error).toBeUndefined();
    const balancesAfterFirst = first.match!.balances.p1;
    const openedAfterFirst = first.match!.board[0].openedBy;

    // Повторный ход с тем же clientMoveId
    const second = await moveInMatch(match.id, "p1", 0, "move-3");
    expect(second.error).toBeUndefined();

    // Проверяем, что состояние не изменилось
    expect(second.match!.balances.p1).toBe(balancesAfterFirst);
    expect(second.match!.board[0].openedBy).toBe(openedAfterFirst);
    expect(second.match!.lastMoveId).toBe("move-3");
  });

  test("не позволяет сделать ход слишком быстро (кулдаун)", async () => {
    // Ставим кулдауна вручную
    mockedActiveStorage.rC.get.mockImplementation(async (key: string) => {
      if (key.includes("cooldown")) return "1";
      return JSON.stringify(match);
    });

    const res = await moveInMatch(match.id, "p1", 0, "move-4");
    expect(res.error).toBe("too fast, wait for your turn");
  });
});
