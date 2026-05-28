import crypto from 'crypto';
import { Box } from '../structures/match.struct';

// Deterministic: sort by id so order in memory doesn't affect the hash
function serializeBoard(board: Box[]): string {
  return board
    .sort((a, b) => a.id - b.id)
    .map(b => `${b.id}:${b.value}`)
    .join('|');
}

export function matchBoardHashing(board: Box[]): string {
  return crypto.createHash('sha256').update(serializeBoard(board)).digest('hex');
} 