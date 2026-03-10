import { randomizePool } from "../../utils/random";

describe("randomizePool for ETH amounts with logs", () => {
  const total = 10_000_000_000_000_000n;
  const count = 12;
  const maxPercent = 20;

  const weiToEth = (wei: bigint) => Number(wei) / 1e18;

  test("сумма всех клеток равна total", () => {
    const pool = randomizePool(total, count, maxPercent);

    console.log(
      "Сумма и распределение клеток:",
      pool.map((v) => v.toString()),
    );

    const sum = pool.reduce((a, b) => a + b, 0n);
    expect(sum).toBe(total);
  });

  test("ни одна клетка не превышает maxPercent", () => {
    const pool = randomizePool(total, count, maxPercent);

    console.log(
      "Максимальная проверка, клетки:",
      pool.map((v) => v.toString()),
    );

    const maxAllowed = (total * BigInt(maxPercent)) / 100n;

    pool.forEach((v) => {
      expect(v).toBeLessThanOrEqual(maxAllowed);
    });
  });

  test("рандомизация работает — разные вызовы дают разные результаты", () => {
    const pool1 = randomizePool(total, count, maxPercent);
    const pool2 = randomizePool(total, count, maxPercent);

    console.log("Pool 1:", pool1.map((v) => v.toString()));
    console.log("Pool 2:", pool2.map((v) => v.toString()));

    const identical = pool1.every((v, i) => v === pool2[i]);

    expect(identical).toBe(false);
  });

  test("все клетки ≥ 1 wei", () => {
    const pool = randomizePool(total, count, maxPercent);

    console.log(
      "Проверка ≥ 1 wei:",
      pool.map((v) => v.toString()),
    );

    pool.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(1n);
    });
  });

  test("симуляция: 2 игрока выбирают по 6 клеток", () => {
    const pool = randomizePool(total, count, maxPercent);

    console.log(
      "Все клетки:",
      pool.map((v) => v.toString()),
    );

    const player1 = pool.slice(0, 6);
    const player2 = pool.slice(6, 12);

    const sum1 = player1.reduce((a, b) => a + b, 0n);
    const sum2 = player2.reduce((a, b) => a + b, 0n);

    console.log(
      "Игрок 1 клетки:",
      player1.map((v) => v.toString()),
    );
    console.log("Игрок 1 сумма wei:", sum1.toString());
    console.log("Игрок 1 сумма ETH:", weiToEth(sum1));

    console.log(
      "Игрок 2 клетки:",
      player2.map((v) => v.toString()),
    );
    console.log("Игрок 2 сумма wei:", sum2.toString());
    console.log("Игрок 2 сумма ETH:", weiToEth(sum2));

    expect(sum1 + sum2).toBe(total);
  });
});