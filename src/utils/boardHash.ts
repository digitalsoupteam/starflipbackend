/* Hashing */
import crypto from 'crypto';
import { Box } from '../structures/match.struct';
import { DefaultDeserializer } from 'v8';

function serializeBoard(board: Box[]): string {
  return board
    .sort((a, b) => a.id - b.id) // sort by id
    .map(b => `${b.id}:${b.value}`) // makin "id:value"
    .join('|'); 
}

export function hashBoard(board: Box[]): string {
  const serialized = serializeBoard(board); // String type "0:50|1:200|2:100"
  return crypto.createHash('sha256').update(serialized).digest('hex');
} 