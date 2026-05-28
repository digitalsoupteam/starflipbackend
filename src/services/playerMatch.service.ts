import { rC } from "../storage/activeMatchesStorage";

const key = (playerId: string) => `player:${playerId}:activeMatch`;

export async function setActiveMatch(playerId: string, matchId: string) {
  await rC.set(key(playerId), matchId, { EX: 43200 });
}

export async function getActiveMatch(playerId: string): Promise<string | null> {
  return await rC.get(key(playerId));
}

export async function clearActiveMatch(playerId: string) {
  await rC.del(key(playerId));
}
