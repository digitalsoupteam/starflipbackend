import { randomizePool } from "../../utils/random";

describe("randomizePool for ETH amounts with logs", () => {
  const total = 10_000_000_000_000_000n;
  const count = 12;
  const maxPercent = 20;

  const weiToEth = (wei: bigint) => Number(wei) / 1e18;

  test("sum of boxes = total", () => {
    const pool = randomizePool(total, count, maxPercent);

    console.log(
      "Summ and pool:",
      pool.map((v) => v.toString()),
    );

    const sum = pool.reduce((a, b) => a + b, 0n);
    expect(sum).toBe(total);
  });

  test("NO one box > maxPercent", () => {
    const pool = randomizePool(total, count, maxPercent);

    console.log(
      "boxes:",
      pool.map((v) => v.toString()),
    );

    const maxAllowed = (total * BigInt(maxPercent)) / 100n;

    pool.forEach((v) => {
      expect(v).toBeLessThanOrEqual(maxAllowed);
    });
  });

  test("randomize is good — diffent calls = diff results", () => {
    const pool1 = randomizePool(total, count, maxPercent);
    const pool2 = randomizePool(total, count, maxPercent);

    console.log("Pool 1:", pool1.map((v) => v.toString()));
    console.log("Pool 2:", pool2.map((v) => v.toString()));

    const identical = pool1.every((v, i) => v === pool2[i]);

    expect(identical).toBe(false);
  });

  test("every box ≥ 1 wei", () => {
    const pool = randomizePool(total, count, maxPercent);

    console.log(
      "Check ≥ 1 wei:",
      pool.map((v) => v.toString()),
    );

    pool.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(1n);
    });
  });

  test("Simulating: 2 players took 6 boxes", () => {
    const pool = randomizePool(total, count, maxPercent);

    console.log(
      "Boxes:",
      pool.map((v) => v.toString()),
    );

    const player1 = pool.slice(0, 6);
    const player2 = pool.slice(6, 12);

    const sum1 = player1.reduce((a, b) => a + b, 0n);
    const sum2 = player2.reduce((a, b) => a + b, 0n);

    console.log(
      "Pl 1 boexs:",
      player1.map((v) => v.toString()),
    );
    console.log("Pl 1 sum wei:", sum1.toString());
    console.log("Pl 1 sum ETH:", weiToEth(sum1));

    console.log(
      "Pl 2 boxes:",
      player2.map((v) => v.toString()),
    );
    console.log("Pl 2 sum wei:", sum2.toString());
    console.log("Pl 2 sum ETH:", weiToEth(sum2));

    expect(sum1 + sum2).toBe(total);
  });
});