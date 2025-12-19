/* функция рандомного распределения общего баланса матча по боксам */
export function randomizePool (total:number, count:number): number[] {

const result: number[] = Array(count).fill(0);
let remaining = total;

for (let i = 0; i < count - 1; i++) {
const max = remaining - (count - i - 1);
const value = Math.floor(Math.random() * max) + 1;
result[i] = value
remaining -= value
}

result[count - 1] = remaining;
return result.sort(() => Math.random() - 0.5);
}
