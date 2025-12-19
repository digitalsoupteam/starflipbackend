import { waitingMatches } from '../../../storage/storage';
import { matches } from '../../../storage/storage';

export function generateId(): string {
  let id: string;

  do {
    id = '';
    for (let i = 0; i < 12; i++) {
      id += Math.floor(Math.random() * 10);
    }
  } while (waitingMatches.has(id) || matches.has(id)); // проверяем оба Map

  return id;
}
