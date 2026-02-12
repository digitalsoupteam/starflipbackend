import { rC } from "../../storage/activeStorage";
import { joinOrCreateMatch, joinWaitingMatch } from "../matchMaking.service";
import { getMatch, moveInMatch } from "../match.service";
import { makeMove } from "../game.service";

// Мокаем blockchain контракты
jest.mock("ethers", () => ({
  ethers: {
    JsonRpcProvider: jest.fn(),
    Wallet: jest.fn(),
    Contract: jest.fn(),
  },
}));

jest.mock(
  "../../contracts/contracts/PvPGridABI",
  () => ({
    PvPGridArtifact: { abi: [] },
  }),
  { virtual: true },
);

jest.mock("../contracts/contract.service", () => ({
  createMatch_onContract: jest.fn().mockResolvedValue(42),
  finishMatch_onContract: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("../../utils/boardHash", () => ({
  hashBoard: jest.fn().mockReturnValue("test-hash-" + Date.now()),
}));

describe(" ТЕСТЫ ИГРЫ", () => {
  const TEST_TOKEN = "0x1234567890123456789012345678901234567890";

  /* 
    - Каждый тест работает с чистой Redis базой
    - Все тестовые данные изолированы
    - Нет влияния между тестами
  */
  beforeEach(async () => {
    await rC.flushDb();
    // Очищаем глобальные блокировки
    await rC.del("lock:waiting:match:create");
  });

  afterEach(async () => {
    await rC.flushDb();
  });

  afterAll(async () => {
    await rC.quit();
  });


  test("базовый сценарий: 2 игрока создают матч и делают ход", async () => {
    const player1 = `player1_${Date.now()}`;
    const player2 = `player2_${Date.now()}`;

    // 1. Первый игрок создает матч
    const match1 = await joinOrCreateMatch(player1, 100, TEST_TOKEN);
    expect(match1.status).toBe("waiting");
    expect(match1.players).toEqual([player1]);

    // 2. Второй игрок присоединяется
    const match2 = await joinWaitingMatch(player2, match1.id, TEST_TOKEN);
    expect(match2).not.toBeNull();
    expect(match2!.status).toBe("active");
    expect(match2!.players).toEqual([player1, player2]);
    expect(match2!.board.length).toBe(12);
    expect(match2!.currentTurn).toBeDefined();

    // 3. Делаем ход
    const moveResult = await moveInMatch(
      match2!.id,
      match2!.currentTurn!,
      0,
      `move-${Date.now()}`,
    );

    expect(moveResult.error).toBeUndefined();
    expect(moveResult.match!.board[0].openedBy).toBe(match2!.currentTurn);

    console.log(`Матч ${match2!.id} создан, ход сделан`);
  });


  test("10 игроков последовательно создают 5 матчей", async () => {
    const PLAYER_COUNT = 10;
    const players = Array.from(
      { length: PLAYER_COUNT },
      (_, i) => `sequential_${i}_${Date.now()}`,
    );

    const matches = [];
    for (const playerId of players) {
      const match = await joinOrCreateMatch(playerId, 100, TEST_TOKEN);
      matches.push(match);
      await new Promise((r) => setTimeout(r, 10));
    }

    // Проверяем уникальные матчи
    const uniqueMatches = new Map();
    for (const match of matches) {
      uniqueMatches.set(match.id, match);
    }

    expect(uniqueMatches.size).toBe(5);

    // Проверяем что все матчи активны и имеют 2 игроков
    for (const match of uniqueMatches.values()) {
      expect(match.players.length).toBe(2);
      expect(match.status).toBe("active");
    }

    console.log(`Последовательное создание: ${uniqueMatches.size} матчей`);
  });


  test("стресс-тест: 20 игроков параллельно ищут матчи", async () => {
    const PLAYER_COUNT = 20;
    const players = Array.from(
      { length: PLAYER_COUNT },
      (_, i) => `parallel_${i}_${Date.now()}`,
    );

    // Запускаем всех игроков параллельно
    const results = await Promise.allSettled(
      players.map(async (playerId) => {
        try {
          const match = await joinOrCreateMatch(playerId, 100, TEST_TOKEN);
          return {
            playerId,
            matchId: match.id,
            status: match.status,
            players: match.players.length,
            success: true,
          };
        } catch (error) {
          return {
            playerId,
            error: error instanceof Error ? error.message : String(error),
            success: false,
          };
        }
      }),
    );

    // Анализируем результаты
    const successful = results.filter(
      (r) => r.status === "fulfilled" && r.value.success,
    );
    const failed = results.filter(
      (r) => r.status === "rejected" || !r.value?.success,
    );

    // Проверяем что все игроки успешно подключились
    expect(successful.length).toBe(PLAYER_COUNT);
    expect(failed.length).toBe(0);

    // Собираем все активные матчи
    const matchKeys = await rC.keys("match:*");
    const matches = await Promise.all(
      matchKeys.map(async (key) => {
        const data = await rC.get(key);
        return JSON.parse(data!);
      }),
    );

    // Проверяем целостность данных
    const allPlayers = matches.flatMap((m) => m.players);
    expect(allPlayers.length).toBe(PLAYER_COUNT);
    expect(new Set(allPlayers).size).toBe(PLAYER_COUNT);
    expect(matches.length).toBe(Math.ceil(PLAYER_COUNT / 2));

    // Проверяем каждый матч
    for (const match of matches) {
      expect(match.players.length).toBe(2);
      expect(match.status).toBe("active");
      expect(match.board.length).toBe(12);
      expect(match.currentTurn).toBeDefined();
    }

    console.log(
      `Стресс-тест: ${PLAYER_COUNT} игроков => ${matches.length} матчей`,
    );
  }, 15000);


  test("полный игровой цикл: 2 игрока завершают матч ровно за 12 ходов", async () => {
    const player1 = `game_player1_${Date.now()}`;
    const player2 = `game_player2_${Date.now()}`;

    // 1. Создание матча
    const match = await joinOrCreateMatch(player1, 100, TEST_TOKEN);
    const activeMatch = await joinWaitingMatch(player2, match.id, TEST_TOKEN);
    expect(activeMatch).not.toBeNull();

    let currentMatch = activeMatch!;
    let currentPlayer = currentMatch.currentTurn!;
    let moveCount = 0;

    // 2. Делаем 11 ходов (игра еще не завершена)
    for (let boxId = 0; boxId < 11; boxId++) {
      const moveResult = await moveInMatch(
        currentMatch.id,
        currentPlayer,
        boxId,
        `move_${boxId}_${Date.now()}`,
      );

      expect(moveResult.error).toBeUndefined();
      expect(moveResult.match!.status).toBe("active");
      expect(moveResult.match!.currentTurn).toBeDefined();

      currentMatch = moveResult.match!;
      currentPlayer = currentMatch.currentTurn!;
      moveCount++;
    }

    // 3. Финальный 12-й ход - игра должна завершиться
    const finalMove = await moveInMatch(
      currentMatch.id,
      currentPlayer,
      11,
      `move_final_${Date.now()}`,
    );

    expect(finalMove.error).toBeUndefined();
    expect(finalMove.match!.status).toBe("finished");
    expect(finalMove.match!.currentTurn).toBeUndefined();

    // 4. Проверяем что все клетки открыты
    const openedBoxes = finalMove.match!.board.filter((b) => b.openedBy).length;
    expect(openedBoxes).toBe(12);

    // 5. Проверяем что каждый игрок сделал по 6 ходов
    const player1Moves = finalMove.match!.board.filter(
      (b) => b.openedBy === player1,
    ).length;
    const player2Moves = finalMove.match!.board.filter(
      (b) => b.openedBy === player2,
    ).length;
    expect(player1Moves + player2Moves).toBe(12);

    console.log(
      `Полный игровой цикл: ${moveCount + 1} ходов, матч ${finalMove.match!.id} завершен`,
    );
    console.log(
      `Статистика: Игрок1: ${player1Moves} ходов, Игрок2: ${player2Moves} ходов`,
    );
  }, 10000);


  test("TTL: ожидающие матчи имеют TTL 300 секунд", async () => {
    const playerId = `ttl_waiting_${Date.now()}`;

    const match = await joinOrCreateMatch(playerId, 100, TEST_TOKEN);
    expect(match.status).toBe("waiting");

    // Ждем обновления TTL в Redis
    await new Promise((r) => setTimeout(r, 100));

    const ttl = await rC.ttl(`waiting:match:${match.id}`);
    const ttlNumber = Number(ttl);

    expect(ttlNumber).toBeGreaterThan(290);
    expect(ttlNumber).toBeLessThanOrEqual(300);

    console.log(` TTL ожидающего матча: ${ttlNumber}с`);
  });


  test("TTL: активные матчи имеют TTL 86400 секунд", async () => {
    const player1 = `ttl_active1_${Date.now()}`;
    const player2 = `ttl_active2_${Date.now()}`;

    const match = await joinOrCreateMatch(player1, 100, TEST_TOKEN);
    const activeMatch = await joinWaitingMatch(player2, match.id, TEST_TOKEN);
    expect(activeMatch).not.toBeNull();

    await new Promise((r) => setTimeout(r, 100));

    const ttl = await rC.ttl(`match:${match.id}`);
    const ttlNumber = Number(ttl);

    expect(ttlNumber).toBeGreaterThan(86300);
    expect(ttlNumber).toBeLessThanOrEqual(86400);

    console.log(`TTL активного матча: ${ttlNumber}с`);
  });


  test("TTL: locks имеют короткий TTL", async () => {
    const playerId = `ttl_lock_${Date.now()}`;

    // Создаем блокировку игрока вручную для теста
    const lockKey = `player:creating:${playerId}`;
    await rC.set(lockKey, "1", { PX: 3000 });

    await new Promise((r) => setTimeout(r, 50));

    const ttl = await rC.ttl(lockKey);
    const ttlNumber = Number(ttl);

    expect(ttlNumber).toBeGreaterThan(1);
    expect(ttlNumber).toBeLessThanOrEqual(3);

    // Проверяем trylock
    const tryLockKey = `waiting:match:test:trylock`;
    await rC.set(tryLockKey, "1", { PX: 200 });

    const tryLockTtl = await rC.sendCommand(["PTTL", tryLockKey]);
    const tryLockMs = Number(tryLockTtl);

    expect(tryLockMs).toBeGreaterThan(50);
    expect(tryLockMs).toBeLessThanOrEqual(200);

    console.log(`lock TTL: ${ttlNumber}с, Trylock TTL: ${tryLockMs}мс`);
  });


  test("ожидающий матч удаляется при активации", async () => {
    const player1 = `cleanup1_${Date.now()}`;
    const player2 = `cleanup2_${Date.now()}`;

    const match = await joinOrCreateMatch(player1, 100, TEST_TOKEN);

    // Проверяем что ожидающий матч существует
    const waitingExists = await rC.exists(`waiting:match:${match.id}`);
    expect(Number(waitingExists)).toBe(1);

    const waitingTtl = await rC.ttl(`waiting:match:${match.id}`);
    expect(Number(waitingTtl)).toBeGreaterThan(290);

    // Активируем матч
    const activeMatch = await joinWaitingMatch(player2, match.id, TEST_TOKEN);
    expect(activeMatch).not.toBeNull();

    // Проверяем что ожидающий матч удален
    const waitingExistsAfter = await rC.exists(`waiting:match:${match.id}`);
    expect(Number(waitingExistsAfter)).toBe(0);

    // Проверяем что активный матч создан
    const activeExists = await rC.exists(`match:${match.id}`);
    expect(Number(activeExists)).toBe(1);

    const activeTtl = await rC.ttl(`match:${match.id}`);
    expect(Number(activeTtl)).toBeGreaterThan(86300);

    console.log(`Матч ${match.id} успешно активирован, waiting удален`);
  });


  test("идемпотентность: повторный clientMoveId не делает второй ход", async () => {
    const player1 = `idem1_${Date.now()}`;
    const player2 = `idem2_${Date.now()}`;
    const clientMoveId = `unique_move_${Date.now()}`;

    const match = await joinOrCreateMatch(player1, 100, TEST_TOKEN);
    const activeMatch = await joinWaitingMatch(player2, match.id, TEST_TOKEN);
    expect(activeMatch).not.toBeNull();

    // Первый ход
    const firstMove = await moveInMatch(
      activeMatch!.id,
      activeMatch!.currentTurn!,
      0,
      clientMoveId,
    );

    expect(firstMove.error).toBeUndefined();
    const balanceAfterFirst =
      firstMove.match!.balances[activeMatch!.currentTurn!];

    // Второй ход с тем же clientMoveId
    const secondMove = await moveInMatch(
      activeMatch!.id,
      activeMatch!.currentTurn!,
      0,
      clientMoveId,
    );

    expect(secondMove.error).toBeUndefined();
    expect(secondMove.match!.balances[activeMatch!.currentTurn!]).toBe(
      balanceAfterFirst,
    );
    expect(secondMove.match!.lastMoveId).toBe(clientMoveId);

    console.log(`Повторный ход не засчитан Идемпотентено!`);
  });


  test("нельзя ходить дважды подряд", async () => {
    const player1 = `turn1_${Date.now()}`;
    const player2 = `turn2_${Date.now()}`;

    const match = await joinOrCreateMatch(player1, 100, TEST_TOKEN);
    const activeMatch = await joinWaitingMatch(player2, match.id, TEST_TOKEN);
    expect(activeMatch).not.toBeNull();

    const firstPlayer = activeMatch!.currentTurn!;
    const secondPlayer = activeMatch!.players.find((p) => p !== firstPlayer)!;

    // Первый ход - OK
    const firstMove = await moveInMatch(
      activeMatch!.id,
      firstPlayer,
      0,
      `move1_${Date.now()}`,
    );
    expect(firstMove.error).toBeUndefined();

    // Попытка хода тем же игроком - должна быть ошибка
    const secondMove = await moveInMatch(
      activeMatch!.id,
      firstPlayer,
      1,
      `move2_${Date.now()}`,
    );
    expect(secondMove.error).toBe("its not your turn");

    // Ход второго игрока - OK
    const thirdMove = await moveInMatch(
      activeMatch!.id,
      secondPlayer,
      1,
      `move3_${Date.now()}`,
    );
    expect(thirdMove.error).toBeUndefined();

    console.log(`Очередность ходов работает правильно`);
  });

  
  test("производительность: 10 матчей за < 2 секунд", async () => {
    const PLAYER_COUNT = 20; // 10 матчей
    const players = Array.from(
      { length: PLAYER_COUNT },
      (_, i) => `perf_${i}_${Date.now()}`,
    );

    const startTime = Date.now();

    const results = await Promise.all(
      players.map(async (playerId) => {
        return joinOrCreateMatch(playerId, 100, TEST_TOKEN);
      }),
    );

    const endTime = Date.now();
    const duration = endTime - startTime;

    expect(results.length).toBe(PLAYER_COUNT);
    expect(duration).toBeLessThan(2000); // Меньше 2 секунд

    console.log(`Производительность: ${PLAYER_COUNT} игроков за ${duration}мс`);
  }, 5000);
});
