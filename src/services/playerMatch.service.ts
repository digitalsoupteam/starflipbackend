/* Which player is in which match */

import { rC } from "../storage/activeStorage";

const key = (playerId: string) => `player:${playerId}:activeMatch`;

/* Saves the player with playedId in the match with matchId to Redis */
export async function setActiveMatch(playerId: string, matchId: string) {
  await rC.set(key(playerId), matchId, { EX: 86400 }); 
}

/* Queries Redis: “Which match is player123 currently in?” */
export async function getActiveMatch(playerId: string): Promise<string | null> {
  // null if the player is not in the game
  return await rC.get(key(playerId));
}

/* Removes the record indicating that the player is in a match. (The player has left/the match has ended) */
export async function clearActiveMatch(playerId: string) {
  const redisKey = `player:${playerId}:activeMatch`;

  console.log("Deleting active match key:", redisKey);

  await rC.del(redisKey);
}
