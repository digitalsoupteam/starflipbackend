import { joinOrCreateMatch } from "../matchMaking.service";
import { rC } from "../../storage/activeStorage";

// Мок on-chain вызова
jest.mock("../contracts/contract.service", () => ({
  createMatch_onContract: jest.fn(async () => "mocked-onchain-id"),
}));

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

describe("Matchmaking stress test (REAL Redis, 100 players)", () => {
  beforeAll(async () => {
    await rC.flushAll(); 
  });

  afterAll(async () => {
    await rC.quit(); 
  });

  it("should correctly distribute 100 players into 50 matches", async () => {
    const playersCount = 100;
    const players = Array.from({ length: playersCount }, (_, i) => ({
      id: `player-${i}`,
    }));

    const results: any[] = [];
    const batchSize = 10;


    for (let i = 0; i < players.length; i += batchSize) {
      const batch = players.slice(i, i + batchSize);

      const batchResults = await Promise.all(
        batch.map(async (p) => {
          await sleep(Math.random() * 50); 
          const match = await joinOrCreateMatch(p.id, "100", "mock-token");
          return { playerId: p.id, match };
        }),
      );

      results.push(...batchResults);
      await sleep(20);
    }

    // redis
    const activeKeys = await rC.keys("match:*");
    console.log("Active matches in Redis:", activeKeys.length);
    expect(activeKeys.length).toBe(playersCount / 2); 

    const matchesFromRedis = await Promise.all(
      activeKeys.map(async (key) => {
        const raw = await rC.get(key);
        return JSON.parse(raw!);
      }),
    );

    // Все игроки должны присутствовать
    const redisPlayers = new Set(matchesFromRedis.flatMap((m) => m.players));
    expect(redisPlayers.size).toBe(playersCount);

    // В каждом матче ровно 2 игрока
    matchesFromRedis.forEach((m) => {
      expect(m.players.length).toBe(2);
    });
  }, 120000);
});
