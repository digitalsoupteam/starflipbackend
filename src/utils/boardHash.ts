import crypto from 'crypto';
import { Box } from '../structures/match.struct';

function serializeBoard(board: Box[]): string {
  return board
    .sort((a, b) => a.id - b.id)
    .map(b => `${b.id}:${b.value}`)
    .join('|');
}

export function hashBoard(board: Box[]): string {
  const serialized = serializeBoard(board);
  return crypto.createHash('sha256').update(serialized).digest('hex');
} 