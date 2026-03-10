import crypto from "crypto";

/**
 * Рандомное распределение общего баланса по клеткам
 * Ограничение: ни одна клетка не получает больше maxPercent от total
 */
export function randomizePool(
  total: bigint,
  count: number,
  maxPercent: number = 20
): bigint[] {
  if (count <= 0) throw new Error("Count must be > 0");
  if (maxPercent <= 0 || maxPercent > 100)
    throw new Error("maxPercent must be between 0 and 100");

  const result: bigint[] = Array(count).fill(0n);
  let remaining = total;

  // максимальная сумма на одну клетку
  const maxPerCell = (total * BigInt(maxPercent)) / 100n;

  for (let i = 0; i < count - 1; i++) {
    const cellsLeft = count - i;

    // чтобы оставить хотя бы 1n на каждую оставшуюся клетку
    const minRemainingForOthers = BigInt(cellsLeft - 1);

    // текущий максимум для клетки = минимум из maxPerCell и того, что можно забрать, не нарушив лимит для остальных
    const allowedMax = remaining - minRemainingForOthers > maxPerCell
      ? maxPerCell
      : remaining - minRemainingForOthers;

    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);

    // 1n + случайное число до allowedMax
    const value = 1n + (BigInt(randomBuffer[0]) % allowedMax);

    result[i] = value;
    remaining -= value;
  }

  // последняя клетка получает остаток
  result[count - 1] = remaining;

  // перемешиваем для случайного порядка
  for (let i = result.length - 1; i > 0; i--) {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const j = Number(BigInt(randomBuffer[0]) % BigInt(i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}