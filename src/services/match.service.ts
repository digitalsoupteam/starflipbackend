/* Start match, Save, Apply moves */

import { Match, MoveResult } from "../structures/match.struct";
import { makeMove } from "./game.service";
import { rC, activeSave, GetResult } from "../storage/activeMatchesStorage";
import { setActiveMatch } from "./playerMatch.service";


/* creates an “instance” of a single match */
export function startMatch(match: Match): Match {
  if (match.players.length !== 2) {
    throw new Error("You need to wait for the second player to join before you can start.");
  }

  const [p1, p2] = match.players;
  const currentTurn = Math.random() < 0.5 ? p1 : p2;

  return {
    ...match,
    balances: { [p1]: "0", [p2]: "0" },
    currentTurn,
    turnStartedAt: Date.now(),
  };
}

/* Async wrapper: creates a match and saves it */
export async function startAndSaveMatch(match: Match): Promise<Match> {
  const newMatch = startMatch(match);

  const saveRes = await activeSave(newMatch);

  if (!saveRes.ok) {
    console.error("The match could not be saved", saveRes.error);
  }

  // Save a copy of the match for loading after TTL
  const matchMetaKey = `matchMeta:${newMatch.matchId}`;
  try {
    await rC.set(
      matchMetaKey,
      JSON.stringify({
        matchId: newMatch.matchId,
        status: newMatch.status,
      }),
    );
  } catch (err) {
    console.error("Failed to save matchMeta:", err);
  }

  for (const p of newMatch.players) {
    await setActiveMatch(p, newMatch.matchId);
  }
  return newMatch;
}

/* Save the current state of the match */
export async function saveMatch(match: Match): Promise<boolean> {
  const res = await activeSave(match);

  if (!res.ok) {
    console.error(`Redis save error (match ${match.matchId})`, res.error);
    return false;
  }

  return true;
}

/* Get the current match status */
export async function getMatch(matchId: string): Promise<GetResult> {
  try {
    const data = await rC.get(`match:${matchId}`);
    if (!data) return { ok: false, error: "not_found" }; // if no data is available, ok: false
    return { ok: true, match: JSON.parse(data) as Match }; // There's definitely a match here
  } catch (error) {
    return { ok: false, error: "storage_error" };
  }
}

/* Apply move to match */
export async function moveInMatch(
  matchId: string,
  playerId: string,
  boxId: number,
  clientMoveId: string,
): Promise<MoveResult> {
  const lockKey = `match:${matchId}:lock`;
  const cooldownKey = `player:${playerId}:cooldown`;

  // Check if the player is in the waiting period
  const isCoolingDown = await rC.get(cooldownKey);
  if (isCoolingDown) {
    return { error: "too fast, wait for your turn" };
  }

  // Trying to get a lock on the match
  const locked = await rC.set(lockKey, "1", { NX: true, PX: 3000 });
  if (!locked) {
    return { error: "match is busy" };
  }

  try {
    const res = await getMatch(matchId);

    if (!res.ok) {
      if (res.error === "not_found") {
        return { error: "match not found" };
      }
      return { error: "storage error" };
    }

    const match = res.match;

    if (!clientMoveId) {
      return { error: "clientMoveId required" };
    }

    if (match.lastMoveId === clientMoveId) {
      return { match };
    } //checking the front for an incoming click

    if (!match.currentTurn || match.currentTurn !== playerId) {
      // Set a 15-second cooldown for the player   
     await rC.set(cooldownKey, "1", { PX: 15000 });
      return { error: "its not your turn" };
    }

    const result = await makeMove(match, playerId, boxId);

    if (!result.error && result.match) {
      result.match.lastMoveId = clientMoveId;
      result.match.turnStartedAt = Date.now();
    }

    if (!result.error && result.match && result.match.status !== "finished") {
      const saved = await saveMatch(result.match);
      if (saved) {
        for (const p of result.match.players) {
          await setActiveMatch(p, result.match.matchId);
        }
      }
      if (!saved) {
        return { error: "failed to save match" };
      }
    }

    return result;
  } finally {
    await rC.del(lockKey);
  }
}

