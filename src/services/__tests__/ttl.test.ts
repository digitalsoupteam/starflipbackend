// src/services/__tests__/ttl-integration.test.ts
import { rC } from "../../storage/activeStorage";
import { createWaitingMatch, joinWaitingMatch } from "../matchMaking.service";

describe('тесты TTL (реальный Redis)', () => {
  beforeAll(async () => {
    await rC.flushDb();
  });

  afterAll(async () => {
    await rC.flushDb();
  });

  describe('Ожидающие матчи', () => {
    test('Имеют TTL 300 секунд (5 минут)', async () => {
      const playerId = 'integration-test-1';
      
      const match = await createWaitingMatch(playerId, 100);
      
      // Проверяем через Redis команду
      const ttl = await rC.ttl(`waiting:match:${match.id}`);
      const ttlNumber = Number(ttl);
      
      console.log(`Ожидающий матч ${match.id}: TTL = ${ttlNumber} секунд`);
      
      // Основная проверка
      expect(ttlNumber).toBeGreaterThan(290);
      expect(ttlNumber).toBeLessThanOrEqual(300);
      
      // Дополнительная проверка: ключ существует
      const exists = await rC.exists(`waiting:match:${match.id}`);
      expect(exists).toBe(1);
    });

    test('Удаляются при активации матча', async () => {
      const player1 = 'integration-test-2a';
      const player2 = 'integration-test-2b';
      
      const match = await createWaitingMatch(player1, 100);
      
      // Активируем
      const result = await joinWaitingMatch(player2, match.id);
      expect(result).not.toBeNull();
      
      // Проверяем что ожидающий матч удален
      const waitingExists = await rC.exists(`waiting:match:${match.id}`);
      expect(waitingExists).toBe(0);
      
      // Проверяем что активный матч создан
      const activeExists = await rC.exists(`match:${match.id}`);
      expect(activeExists).toBe(1);
    });
  });

  describe('Активные матчи', () => {
    test('Имеют TTL 86400 секунд (24 часа)', async () => {
      const player1 = 'integration-test-3a';
      const player2 = 'integration-test-3b';
      
      // Создаем и сразу активируем
      const match = await createWaitingMatch(player1, 100);
      const activated = await joinWaitingMatch(player2, match.id);
      expect(activated).not.toBeNull();
      
      // Проверяем TTL активного матча
      const ttl = await rC.ttl(`match:${match.id}`);
      const ttlNumber = Number(ttl);
      
      console.log(`Активный матч ${match.id}: TTL = ${ttlNumber} секунд`);
      
      expect(ttlNumber).toBeGreaterThan(86300);
      expect(ttlNumber).toBeLessThanOrEqual(86400);
    });
  });

  describe('Автоматическая очистка', () => {
    test('Ключи с истекшим TTL недоступны', async () => {
      // Создаем тестовый ключ с TTL 2 секунды
      const testKey = `ttl-test-${Date.now()}`;
      await rC.set(testKey, 'test-value', { EX: 2 });
      
      // Проверяем сразу
      const existsBefore = await rC.exists(testKey);
      expect(existsBefore).toBe(1);
      
      // Ждем 3 секунды
      await new Promise(r => setTimeout(r, 3000));
      
      // Проверяем что ключ удален
      const existsAfter = await rC.exists(testKey);
      expect(existsAfter).toBe(0);
      
      console.log('✅ Redis автоматически удаляет ключи с истекшим TTL');
    }, 5000); // Увеличиваем таймаут теста
  });
});