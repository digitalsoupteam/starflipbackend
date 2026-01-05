import { joinOrCreateMatch } from "../matchMaking.service";
import { rC } from "../../storage/activeStorage";
import { moveInMatch } from "../match.service";
import { getMatch } from "../match.service";

jest.setTimeout(60000);

describe("тесты матчмейкинга и игры", () => {
  beforeAll(async () => {
    if (!rC.isOpen) await rC.connect();
  });

  beforeEach(async () => {
    await rC.flushDb();
  });

  afterAll(async () => {
    await rC.flushDb();
    if (rC.quit) await rC.quit();
  });

  it("10 игроков создают 5 пар и делают первые ходы", async () => {
    const players = Array.from({ length: 10 }, (_, i) => `player${i + 1}`);
    const bid = 100;
    const matchesById = new Map<string, any>();

    for (const player of players) {
      const match = await joinOrCreateMatch(player, bid);
      matchesById.set(match.id, match);
      await new Promise((r) => setTimeout(r, 20)); // пауза для Redis
    }

    expect(matchesById.size).toBe(5);

    for (const match of matchesById.values()) {
      expect(match.players.length).toBe(2);
      expect(match.status).toBe("active");
      expect(match.currentTurn).toBeDefined();
      expect(match.balances[match.players[0]]).toBe(bid);
      expect(match.balances[match.players[1]]).toBe(bid);

      // Первый ход игрока в ячейку 0
      const currentPlayer = match.currentTurn;
      const result = await moveInMatch(match.id, currentPlayer, 0);
      expect(result.error).toBeUndefined();
      expect(result.match).toBeDefined();
    }
  });

  it("Стресстест: 100 игроков подключаются параллельно", async () => {
    const PLAYER_COUNT = 100;
    const bid = 100;
    const players = Array.from(
      { length: PLAYER_COUNT },
      (_, i) => `player_${i + 1}`
    );

    const results = await Promise.all(
      players.map((playerId) =>
        joinOrCreateMatch(playerId, bid).then((match) => ({ playerId, match }))
      )
    );

    const matchesById = new Map<string, any>();
    for (const { match } of results) matchesById.set(match.id, match);

    const allMatches = Array.from(matchesById.values());
    const activeMatches = allMatches.filter((m) => m.status === "active");
    const waitingMatches = allMatches.filter((m) => m.status === "waiting");

    for (const match of activeMatches) expect(match.players.length).toBe(2);
    for (const match of waitingMatches) expect(match.players.length).toBe(1);

    const allPlayers = allMatches.flatMap((m) => m.players);
    expect(allPlayers.length).toBe(PLAYER_COUNT);
    expect(new Set(allPlayers).size).toBe(PLAYER_COUNT);
    expect(matchesById.size).toBe(Math.ceil(PLAYER_COUNT / 2));
  }, 20000);

  it("Фул матч от подключения до конца игры для одной пары", async () => {
  const player1 = "Nik";
  const player2 = "Kirill";
  const bid = 100;

  async function waitForCurrentTurn(matchId: string, timeout = 2000): Promise<string> {
    const start = Date.now();

    while (Date.now() - start < timeout) {
      const res = await getMatch(matchId);

      if (res.ok) {
        const match = res.match;
        if (match?.currentTurn) {
          return match.currentTurn; // теперь точно string
        }
      }

      await new Promise((r) => setTimeout(r, 50));
    }

    throw new Error(`currentTurn не установлен для матча ${matchId} за ${timeout}ms`);
  }

  // Подключаем игроков
  await joinOrCreateMatch(player1, bid);
  const match2 = await joinOrCreateMatch(player2, bid);
  const matchId = match2.id;

  // Ждём, пока currentTurn точно установится
  let currentPlayer = await waitForCurrentTurn(matchId);

  // Делаем ходы пока не закончится игра (count = 12)
  let moves = 0;
  while (moves < 12) {
    const res = await moveInMatch(matchId, currentPlayer, moves);

    if ("error" in res && res.error) {
      throw new Error(`Ход не прошёл в матче ${matchId}: ${res.error}`);
    }

    if (!res.match) {
      throw new Error(`Нет обновлённого матча после хода ${moves} для ${matchId}`);
    }

    // Теперь currentTurn это стринг 
    currentPlayer = res.match.currentTurn!;
    moves++;
  }

  // Финальная проверка
  const finalRes = await getMatch(matchId);
  if (!finalRes.ok) {
    throw new Error(`Не удалось получить матч ${matchId}: ${finalRes.error}`);
  }

  const finalMatch = finalRes.match;
  expect(finalMatch).toBeDefined();
  expect(finalMatch.board).toHaveLength(12);
  expect(Object.keys(finalMatch.balances)).toHaveLength(2);
});

});
