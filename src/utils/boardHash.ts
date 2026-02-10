/* Хеширование клеток */
import crypto from 'crypto';
import { Box } from '../structures/match.struct';

function serializeBoard(board: Box[]): string {
  return board
    .sort((a, b) => a.id - b.id) // Сортируем по id
    .map(b => `${b.id}:${b.value}`) // Делаем "id:value"
    .join('|'); 
}

export function hashBoard(board: Box[]): string {
  const serialized = serializeBoard(board); // Cтрока типа: "0:50|1:200|2:100"
  return crypto.createHash('sha256').update(serialized).digest('hex');
} 