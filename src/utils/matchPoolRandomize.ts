export function matchPoolRandomize(
  total: bigint,
  count: number,
  maxPercent: number = 25
): bigint[] {
  if (count <= 0) throw new Error("Count must be > 0");
  if (maxPercent <= 0 || maxPercent > 100)
    throw new Error("maxPercent must be between 0 and 100");

  const result: bigint[] = [];
  let remaining = total;
  const maxPerCell = (total * BigInt(maxPercent)) / 100n;

  for (let i = 0; i < count - 1; i++) {
    const cellsLeft = count - i;
    const minRemainingForOthers = BigInt(cellsLeft - 1);

    let allowedMax = remaining - minRemainingForOthers;
    allowedMax = allowedMax > maxPerCell ? maxPerCell : allowedMax;

    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const randFraction = BigInt(randomBuffer[0]) * allowedMax / 4294967295n;

    const value = 1n + randFraction;
    result.push(value);
    remaining -= value;
  }

  if (remaining > maxPerCell) {
    result.push(maxPerCell);
    remaining -= maxPerCell;

    for (let i = 0; remaining > 0n && i < result.length; i++) {
      const add = remaining + result[i] > maxPerCell ? maxPerCell - result[i] : remaining;
      result[i] += add;
      remaining -= add;
    }
  } else {
    result.push(remaining);
  }

  for (let i = result.length - 1; i > 0; i--) {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const j = Number(BigInt(randomBuffer[0]) % BigInt(i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}