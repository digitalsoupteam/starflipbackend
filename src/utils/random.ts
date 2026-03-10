import crypto from "crypto";

/* функция рандомного распределения общего баланса матча по боксам */
export function randomizePool(total: bigint, count: number): bigint[] {
  const result: bigint[] = Array(count).fill(0n);
  let remaining = total;

  // распределяем все, кроме последнего бокса
  for (let i = 0; i < count - 1; i++) {
    // минимум, который нужно оставить остальным боксам (по 1)
    const max = remaining - BigInt(count - i - 1);

    // крипторандом от 1 до max
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);

    const value = 1n + (BigInt(randomBuffer[0]) % max);

    result[i] = value;
    remaining -= value;
  }

  // всё оставшееся — в последний бокс
  result[count - 1] = remaining;

  // перемешивание
  for (let i = result.length - 1; i > 0; i--) {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);

    const j = Number(BigInt(randomBuffer[0]) % BigInt(i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}