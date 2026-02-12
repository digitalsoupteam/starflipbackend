
import { rC } from "../../storage/activeStorage";
import { createWaitingMatch, joinWaitingMatch } from "../matchMaking.service";
import { setActiveMatch, clearActiveMatch } from "../playerMatch.service";


// Редис реальный если что Не мок
// Мокаем ТОЛЬКО контракты
jest.mock("ethers", () => ({
  ethers: {
    JsonRpcProvider: jest.fn(),
    Wallet: jest.fn(),
    Contract: jest.fn(),
  },
}));

jest.mock("../../contracts/contracts/PvPGridABI", () => ({
  PvPGridArtifact: { abi: [] },
}), { virtual: true });

// Мокаем blockchain функции
jest.mock("../contracts/contract.service", () => ({
  createMatch_onContract: jest.fn().mockResolvedValue(42),
  finishMatch_onContract: jest.fn().mockResolvedValue(undefined),
}));

jest.mock("../../utils/boardHash", () => ({
  hashBoard: jest.fn().mockReturnValue("test-hash-123"),
}));

describe('тесты TTL (интеграционные с реальным Redis)', () => {
  beforeAll(async () => {
    // Очищаем Redis перед тестами
    await rC.flushDb();
  });

  afterAll(async () => {
    await rC.flushDb();
    await rC.quit();
  });

  beforeEach(async () => {
    // Очищаем lock'и между тестами
    await rC.del('lock:waiting:match:create');
  });

  describe('Ожидающие матчи', () => {
    test('Имеют TTL 300 секунд (5 минут)', async () => {
      const playerId = `test-create-${Date.now()}`;
      
      const match = await createWaitingMatch(playerId, 100);
      
      // Ждем немного чтобы редис обновил TTL
      await new Promise(r => setTimeout(r, 100));
      
      const ttl = await rC.ttl(`waiting:match:${match.id}`);
      const ttlNumber = Number(ttl);
      
      console.log(`Ожидающий матч ${match.id}: TTL = ${ttlNumber} секунд`);
      
      expect(ttlNumber).toBeGreaterThan(290);
      expect(ttlNumber).toBeLessThanOrEqual(300);
      
      // Чистим
      await rC.del(`waiting:match:${match.id}`);
      await rC.zRem('waiting:matches', match.id);
    }, 10000);

    test('Удаляются при активации матча', async () => {
      const player1 = `test-p1-${Date.now()}`;
      const player2 = `test-p2-${Date.now()}`;
      const token = '0x1234567890123456789012345678901234567890';
      
      const match = await createWaitingMatch(player1, 100);
      
      const result = await joinWaitingMatch(player2, match.id, token);
      expect(result).not.toBeNull();
      
      // Проверяем что ожидающий матч удален
      const waitingExists = await rC.exists(`waiting:match:${match.id}`);
      expect(waitingExists).toBe(0);
      
      // Проверяем что удален из списка ожидания
      const inWaitingList = await rC.zScore('waiting:matches', match.id);
      expect(inWaitingList).toBeNull();
      
      // Проверяем что активный матч создан
      const activeExists = await rC.exists(`match:${match.id}`);
      expect(activeExists).toBe(1);
    });
  });

  describe('Активные матчи', () => {
    test('Имеют TTL 86400 секунд (24 часа)', async () => {
      const player1 = `test-active-p1-${Date.now()}`;
      const player2 = `test-active-p2-${Date.now()}`;
      const token = '0x1234567890123456789012345678901234567890';
      
      const match = await createWaitingMatch(player1, 100);
      const activated = await joinWaitingMatch(player2, match.id, token);
      expect(activated).not.toBeNull();
      
      await new Promise(r => setTimeout(r, 100));
      
      const ttl = await rC.ttl(`match:${match.id}`);
      const ttlNumber = Number(ttl);
      
      console.log(`активный матч ${match.id}: TTL = ${ttlNumber} секунд`);
      
      expect(ttlNumber).toBeGreaterThan(86300);
      expect(ttlNumber).toBeLessThanOrEqual(86400);
    });
  });

  describe('Активные матчи игроков', () => {
    test('Имеют TTL 86400 секунд (24 часа)', async () => {
      const playerId = `test-player-${Date.now()}`;
      const matchId = `test-match-${Date.now()}`;
      
      await setActiveMatch(playerId, matchId);
      
      await new Promise(r => setTimeout(r, 100));
      
      const ttl = await rC.ttl(`player:${playerId}:activeMatch`);
      const ttlNumber = Number(ttl);
      
      console.log(`Активный матч игрока ${playerId}: TTL = ${ttlNumber} секунд`);
      
      expect(ttlNumber).toBeGreaterThan(86300);
      expect(ttlNumber).toBeLessThanOrEqual(86400);
      
      await clearActiveMatch(playerId);
    });
  });

  describe('Кулдауны', () => {
    test('Имеют TTL 15 секунд', async () => {
      const playerId = `test-cooldown-${Date.now()}`;
      const cooldownKey = `player:${playerId}:cooldown`;
      
      await rC.set(cooldownKey, '1', { PX: 15000 });
      
      await new Promise(r => setTimeout(r, 100));
      
      const ttl = await rC.ttl(cooldownKey);
      const ttlNumber = Number(ttl);
      
      console.log(`Кулдаун игрока ${playerId}: TTL = ${ttlNumber} секунд`);
      
      expect(ttlNumber).toBeGreaterThan(13);
      expect(ttlNumber).toBeLessThanOrEqual(15);
      
      await rC.del(cooldownKey);
    });
  });

  describe('Блокировки', () => {
    test('Лок матча имеет TTL 3 секунды', async () => {
      const matchId = `test-lock-${Date.now()}`;
      const lockKey = `match:${matchId}:lock`;
      
      await rC.set(lockKey, '1', { PX: 3000 });
      
      await new Promise(r => setTimeout(r, 100));
      
      const ttl = await rC.ttl(lockKey);
      const ttlNumber = Number(ttl);
      
      console.log(`Лок матча ${matchId}: TTL = ${ttlNumber} секунд`);
      
      expect(ttlNumber).toBeGreaterThan(1);
      expect(ttlNumber).toBeLessThanOrEqual(3);
      
      await rC.del(lockKey);
    });

    test('Trylock имеет TTL 200ms', async () => {
      const matchId = `test-trylock-${Date.now()}`;
      const tryLockKey = `waiting:match:${matchId}:trylock`;
      
      await rC.set(tryLockKey, '1', { PX: 200 });
      
      await new Promise(r => setTimeout(r, 50));
      
     // pttl - milisekundi 
      const ttl = await rC.sendCommand(['PTTL', tryLockKey]);
      const ttlMs = Number(ttl);
      
      console.log(` Trylock матча ${matchId}: TTL = ${ttlMs} мс`);
      
      expect(ttlMs).toBeGreaterThan(50);
      expect(ttlMs).toBeLessThanOrEqual(200);
      
      await rC.del(tryLockKey);
    });

    test('Lock на создание матча имеет TTL 500ms', async () => {
      const lockKey = 'lock:waiting:match:create';
      
      await rC.set(lockKey, '1', { PX: 500 });
      
      await new Promise(r => setTimeout(r, 50));
      
      const ttl = await rC.sendCommand(['PTTL', lockKey]);
      const ttlMs = Number(ttl);
      
      console.log(`Lock создания матча: TTL = ${ttlMs} мс`);
      
      expect(ttlMs).toBeGreaterThan(200);
      expect(ttlMs).toBeLessThanOrEqual(500);
      
      await rC.del(lockKey);
    });
  });

  describe('Таймер хода', () => {
    test('Turn key имеет TTL 300 секунд (5 минут)', async () => {
      const matchId = `test-turn-${Date.now()}`;
      const turnKey = `match:${matchId}:turn`;
      const playerId = 'test-player';
      
      await rC.set(turnKey, playerId, { EX: 300 });
      
      await new Promise(r => setTimeout(r, 100));
      
      const ttl = await rC.ttl(turnKey);
      const ttlNumber = Number(ttl);
      
      console.log(`⏱Таймер хода матча ${matchId}: TTL = ${ttlNumber} секунд`);
      
      expect(ttlNumber).toBeGreaterThan(290);
      expect(ttlNumber).toBeLessThanOrEqual(300);
      
      await rC.del(turnKey);
    });
  });

  describe('Автоматическая очистка', () => {
    test('Ключи с истекшим TTL недоступны', async () => {
      const testKey = `ttl-test-${Date.now()}`;
      await rC.set(testKey, 'test-value', { EX: 2 });
      
      const existsBefore = await rC.exists(testKey);
      expect(existsBefore).toBe(1);
      
      await new Promise(r => setTimeout(r, 3000));
      
      const existsAfter = await rC.exists(testKey);
      expect(existsAfter).toBe(0);
      
      console.log(' Redis автоматически удаляет ключи с истекшим TTL');
    }, 10000);
  });
});