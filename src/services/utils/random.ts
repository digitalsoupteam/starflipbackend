import crypto from 'crypto';

/* функция рандомного распределения общего баланса матча по боксам */
export function randomizePool(total: number, count: number): number[] { 
  const result: number[] = Array(count).fill(0); 
  let remaining = total;

  // распределяем все, кроме последнего бокса
  for (let i = 0; i < count - 1; i++) {
    // минимум, который нужно оставить остальным боксам (по 1)
    const max = remaining - (count - i - 1);

    // крипторандом от 1 до max
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const value = 1 + (randomBuffer[0] % max);

    result[i] = value;
    remaining -= value;
  }

  // всё оставшееся — в последний бокс
  result[count - 1] = remaining;

  // перемешивание 
  for (let i = result.length - 1; i > 0; i--) {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const j = randomBuffer[0] % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}