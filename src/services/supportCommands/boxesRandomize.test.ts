import { randomizePool } from "../../utils/random";

describe("randomizePool for ETH amounts with logs", () => {
  const total = 10_000_000_000_000_000n 
  const count = 12;
  const maxPercent = 20; // максимум 20% от total

  test("сумма всех клеток равна total", () => {
    const pool = randomizePool(total, count, maxPercent);
    console.log("Сумма и распределение клеток:", pool.map(v => v.toString()));
    const sum = pool.reduce((a, b) => a + b, 0n);
    expect(sum).toBe(total);
  });

  test("ни одна клетка не превышает maxPercent", () => {
    const pool = randomizePool(total, count, maxPercent);
    console.log("Максимальная проверка, клетки:", pool.map(v => v.toString()));
    const maxAllowed = (total * BigInt(maxPercent)) / 100n;
    pool.forEach((v) => {
      expect(v).toBeLessThanOrEqual(maxAllowed);
    });
  });

  test("рандомизация работает — разные вызовы дают разные результаты", () => {
    const pool1 = randomizePool(total, count, maxPercent);
    const pool2 = randomizePool(total, count, maxPercent);

    console.log("Pool 1:", pool1.map(v => v.toString()));
    console.log("Pool 2:", pool2.map(v => v.toString()));

    const identical = pool1.every((v, i) => v === pool2[i]);
    expect(identical).toBe(false);
  });

  test("все клетки ≥ 1 wei", () => {
    const pool = randomizePool(total, count, maxPercent);
    console.log("Проверка ≥ 1 wei:", pool.map(v => v.toString()));
    pool.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(1n);
    });
  });
});