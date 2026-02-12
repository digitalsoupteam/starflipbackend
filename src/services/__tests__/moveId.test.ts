import { moveInMatch } from "../match.service";
import { makeMove } from "../game.service";
import { setActiveMatch } from "../playerMatch.service";
import { Match, Box } from "../../structures/match.struct";

jest.mock("../game.service", () => ({
  makeMove: jest.fn(),
}));

jest.mock("../playerMatch.service", () => ({
  setActiveMatch: jest.fn(),
}));

jest.mock("../../storage/activeStorage", () => {
  const mockRC = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  return {
    rC: mockRC,
    activeSave: jest.fn(),
    activeGet: jest.fn(),
  };
});

describe("moveInMatch — проверки ходов и идемпотентности", () => {
  const mockMatch: Match = {
    id: "m1",
    createdAt: Date.now(),
    creator: "p1",
    players: ["p1", "p2"],
    bid: 10,
    total: 20,
    count: 12,
    board: Array(12)
      .fill(null)
      .map(
        (_, i): Box => ({
          id: i,
          value: 5,
          openedBy: undefined,
        }),
      ),
    balances: { p1: 10, p2: 10 },
    status: "active",
    currentTurn: "p1",
    lastMoveId: undefined,
    turnStartedAt: Date.now(),
  };

  const mockedStorage = require("../../storage/activeStorage");
  const mockedGameService = require("../game.service");
  const mockedPlayerMatch = require("../playerMatch.service");

  beforeEach(() => {
    jest.clearAllMocks();

    // Полный сброс всех моков
    mockedStorage.rC.get.mockReset();
    mockedStorage.rC.set.mockReset();
    mockedStorage.rC.del.mockReset();
    mockedStorage.activeSave.mockReset();
    mockedGameService.makeMove.mockReset();
    mockedPlayerMatch.setActiveMatch.mockReset();

    // Базовая реализация get - возвращает mockMatch
    mockedStorage.rC.get.mockImplementation(async (key: string) => {
      if (key === `match:${mockMatch.id}`) {
        return JSON.stringify(mockMatch);
      }
      return null;
    });

    // Базовая реализация set - успешный лок
    mockedStorage.rC.set.mockImplementation((key: string) => {
      if (key.includes("lock")) {
        return Promise.resolve("OK");
      }
      return Promise.resolve("OK");
    });

    // Базовая реализация del - успешное удаление
    mockedStorage.rC.del.mockResolvedValue(1);

    // Базовая реализация activeSave - успешное сохранение
    mockedStorage.activeSave.mockResolvedValue({ ok: true });

    // Базовая реализация makeMove - успешный ход
    mockedGameService.makeMove.mockImplementation(
      (match: Match, playerId: string, boxId: number) => {
        const updatedMatch: Match = {
          ...match,
          board: match.board.map((box: Box) =>
            box.id === boxId ? { ...box, openedBy: playerId } : box,
          ),
          balances: {
            ...match.balances,
            [playerId]: (match.balances[playerId] ?? 0) + 5,
          },
          currentTurn: match.players.find((p) => p !== playerId),
          status: "active",
          turnStartedAt: Date.now(),
        };
        return { match: updatedMatch, error: undefined };
      },
    );

    // Базовая реализация setActiveMatch
    mockedPlayerMatch.setActiveMatch.mockResolvedValue(undefined);
  });

  test("успешный ход обновляет баланс, currentTurn и openedBy", async () => {
    const res = await moveInMatch(mockMatch.id, "p1", 0, "move-1");

    expect(res.error).toBeUndefined();
    expect(res.match).toBeDefined();
    expect(res.match!.lastMoveId).toBe("move-1");
    expect(res.match!.currentTurn).toBe("p2");
    expect(res.match!.balances.p1).toBe(15);
    expect(res.match!.board[0].openedBy).toBe("p1");
    expect(mockedGameService.makeMove).toHaveBeenCalled();
    expect(mockedStorage.activeSave).toHaveBeenCalled();
    expect(mockedPlayerMatch.setActiveMatch).toHaveBeenCalledTimes(2);
  });

  test("повторный clientMoveId не делает повторный ход и-демпотентность", async () => {
    const matchWithLastMove = {
      ...mockMatch,
      lastMoveId: "move-1",
    };

    mockedStorage.rC.get.mockImplementation(async (key: string) => {
      if (key === `match:${mockMatch.id}`) {
        return JSON.stringify(matchWithLastMove);
      }
      return null;
    });

    const res = await moveInMatch(mockMatch.id, "p1", 0, "move-1");

    expect(res.error).toBeUndefined();
    expect(res.match!.lastMoveId).toBe("move-1");
    expect(mockedGameService.makeMove).not.toHaveBeenCalled();
    expect(mockedStorage.activeSave).not.toHaveBeenCalled();
  });

  test("не позволяет сделать ход слишком быстро - кд)", async () => {
    mockedStorage.rC.get.mockImplementation(async (key: string) => {
      if (key.includes("cooldown")) {
        return "1";
      }
      if (key === `match:${mockMatch.id}`) {
        return JSON.stringify(mockMatch);
      }
      return null;
    });

    const res = await moveInMatch(mockMatch.id, "p1", 0, "move-2");

    expect(res.error).toBe("too fast, wait for your turn");
    expect(mockedGameService.makeMove).not.toHaveBeenCalled();
    expect(mockedStorage.activeSave).not.toHaveBeenCalled();
  });

  test("не позволяет ходить не в свой ход и ставит кулдаун", async () => {
    const res = await moveInMatch(mockMatch.id, "p2", 0, "move-3");

    expect(res.error).toBe("its not your turn");
    expect(mockedGameService.makeMove).not.toHaveBeenCalled();
    expect(mockedStorage.rC.set).toHaveBeenCalledWith(
      "player:p2:cooldown",
      "1",
      { PX: 15000 },
    );
    expect(mockedStorage.activeSave).not.toHaveBeenCalled();
  });

  test("не позволяет ходить в уже открытую клетку", async () => {
    // Создаем матч с уже открытой клеткой
    const matchWithOpenedBox = {
      ...mockMatch,
      board: mockMatch.board.map((box, i) =>
        i === 0 ? { ...box, openedBy: "p1" } : box,
      ),
    };

    mockedStorage.rC.get.mockImplementation(async (key: string) => {
      if (key === `match:${mockMatch.id}`) {
        return JSON.stringify(matchWithOpenedBox);
      }
      return null;
    });

    // Мокаем makeMove чтобы вернуть ошибку валидации
    mockedGameService.makeMove.mockReturnValueOnce({
      match: undefined,
      error: "box is already open",
    });

    const res = await moveInMatch(mockMatch.id, "p1", 0, "move-4");

    expect(res.error).toBe("box is already open");
    expect(mockedGameService.makeMove).toHaveBeenCalled();
    expect(mockedStorage.activeSave).not.toHaveBeenCalled();
  });

  test("возвращает 'match not found' когда матча нет", async () => {
    mockedStorage.rC.get.mockImplementation(async (key: string) => {
      if (key === `match:not-exist`) {
        return null;
      }
      return null;
    });

    const res = await moveInMatch("not-exist", "p1", 0, "move-5");

    expect(res.error).toBe("match not found");
    expect(mockedGameService.makeMove).not.toHaveBeenCalled();
    expect(mockedStorage.activeSave).not.toHaveBeenCalled();
  });

  test("возвращает 'match is busy' когда не удалось взять лок", async () => {
    // Сохраняем оригинальный мок
    const originalSet = mockedStorage.rC.set;

    // Мокаем неудачный лок ТОЛЬКО для этого теста
    mockedStorage.rC.set.mockImplementation((key: string) => {
      if (key.includes("lock")) {
        return Promise.resolve(null); // Lock не получен
      }
      return Promise.resolve("OK");
    });

    const res = await moveInMatch(mockMatch.id, "p1", 0, "move-7");

    expect(res.error).toBe("match is busy");
    expect(mockedGameService.makeMove).not.toHaveBeenCalled();
    expect(mockedStorage.activeSave).not.toHaveBeenCalled();

    // Восстанавливаем оригинальный мок
    mockedStorage.rC.set = originalSet;
  });

  test("реквариед clientMoveId", async () => {
    const res = await moveInMatch(mockMatch.id, "p1", 0, undefined as any);

    expect(res.error).toBe("clientMoveId required");
    expect(mockedGameService.makeMove).not.toHaveBeenCalled();
    expect(mockedStorage.activeSave).not.toHaveBeenCalled();
  });

  test("обрабатывает окончание игры", async () => {
    // Матч где открыты все клетки кроме последней
    const almostFinishedMatch: Match = {
      ...mockMatch,
      board: mockMatch.board.map((box, i) => {
        if (i === 11) return { ...box, openedBy: undefined };
        return { ...box, openedBy: i % 2 === 0 ? "p1" : "p2" };
      }),
      balances: { p1: 30, p2: 25 },
      currentTurn: "p1",
      lastMoveId: "move-7",
    };

    mockedStorage.rC.get.mockImplementation(async (key: string) => {
      if (key === `match:${mockMatch.id}`) {
        return JSON.stringify(almostFinishedMatch);
      }
      return null;
    });

    // Мокаем makeMove для финального хода
    mockedGameService.makeMove.mockImplementationOnce(
      (match: Match, playerId: string, boxId: number) => {
        const updatedMatch: Match = {
          ...match,
          board: match.board.map((box: Box) =>
            box.id === boxId ? { ...box, openedBy: playerId } : box,
          ),
          balances: {
            ...match.balances,
            [playerId]: (match.balances[playerId] ?? 0) + 5,
          },
          status: "finished",
          currentTurn: undefined,
          turnStartedAt: match.turnStartedAt,
        };
        return { match: updatedMatch, error: undefined };
      },
    );

    const res = await moveInMatch(mockMatch.id, "p1", 11, "move-8");

    expect(res.error).toBeUndefined();
    expect(res.match!.status).toBe("finished");
    expect(res.match!.currentTurn).toBeUndefined();
    expect(res.match!.board[11].openedBy).toBe("p1");
    expect(mockedStorage.activeSave).toHaveBeenCalled();
    expect(mockedPlayerMatch.setActiveMatch).toHaveBeenCalled();
  });
});
