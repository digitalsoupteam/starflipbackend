/* game engine */

import { Match, Box, MoveResult } from "../structures/match.struct";
import { rC } from "../storage/activeMatchesStorage";
import { activeSave } from "../storage/activeMatchesStorage";
import { updatePlayersStatsWithRank } from "../storage/playersDataBaseActions";
import { matchPoolRandomize } from "../utils/matchPoolRandomize";
import { matchBoardHashing } from "../utils/matchBoardHashing";

/* when turn (1) validateMove(), after (2) applyMove(), 
checking isGameOver() if True returns finished for match */

export async function makeMove(
  match: Match,
  playerId: string,
  boxId: number,
): Promise<MoveResult> {
  // check validating error
  const error = validateMove(match, playerId, boxId);
  if (error) {
    return { match, error };
  }
  // if validating done
  const updatedMatch = applyMove(match, playerId, boxId);

  if (isGameOver(updatedMatch)) {
    updatedMatch.status = "finished";
    updatedMatch.currentTurn = undefined;

    const matchMetaKey = `matchMeta:${updatedMatch.matchId}`;
    try {
      await rC.set(
        matchMetaKey,
        JSON.stringify({
          matchId: updatedMatch.matchId,
          status: updatedMatch.status,
        }),
      );
    } catch (err) {
      console.error("Cannot update matchMeta:", err);
    }

    const res = await activeSave(updatedMatch);
    if (!res.ok) {
      console.error("Failed to save finished match", res.error);
    }

    await finalizeMatch(updatedMatch);
  }

  return { match: updatedMatch };
}

/* random board*/
export function createBoard(total: bigint, count: number): Box[] {
  const values: bigint[] = matchPoolRandomize(total, count);

  return values.map((value, index) => ({
    id: index,
    value: value.toString(),
  }));
}
/* validating to move */
export function validateMove(
  match: Match,
  playerId: string,
  boxId: number,
): string | null {
  if (match.status !== "active") {
    return "match not active";
  }

  if (match.currentTurn !== playerId) {
    return "its not your turn";
  }

  const box = match.board.find((b) => b.id === boxId);
  if (!box) {
    return "box was not found";
  }

  if (box.openedBy) {
    return "box is already open";
  }

  return null;
}

/* helper function that takes a move and updates the match status if all checks pass */
export function applyMove(
  match: Match,
  playerId: string,
  boxId: number,
): Match {
  const board = match.board.map((box) =>
    box.id === boxId ? { ...box, openedBy: playerId } : box,
  );

  const box = board.find((b) => b.id === boxId)!;
  const boxValue = BigInt(box.value);

  const currentBalance = BigInt(match.balances[playerId] ?? "0");

  const newBalance = currentBalance + boxValue;

  const balances = {
    ...match.balances,
    [playerId]: newBalance.toString(),
  };

  const nextPlayer = match.players.find((p) => p !== playerId);

  return {
    ...match,
    board,
    balances,
    currentTurn: nextPlayer,
    boardHash: matchBoardHashing(board),
  };
}
/* helper function that checks whether all fields are open; if true, the game ends */
export function isGameOver(match: Match): boolean {
  return match.board.every((box) => box.openedBy !== undefined);
}

export async function finalizeMatch(match: Match): Promise<void> {
  try {
    const balances: Record<string, bigint> = {};
    let winner = match.players[0];
    let maxBalance = BigInt(match.balances[winner] ?? "0");

    for (const playerId of match.players) {
      const bal = BigInt(match.balances[playerId] ?? "0");
      balances[playerId] = bal;

      if (bal > maxBalance) {
        maxBalance = bal;
        winner = playerId;
      }
    }

    const total = BigInt(match.total ?? "0");
    const sum = Object.values(match.balances).reduce(
      (acc, v) => acc + BigInt(v),
      0n,
    );
    if (sum !== total) {
      throw new Error(
        `Balance mismatch: sum=${sum.toString()} total=${total.toString()}`,
      );
    }

    updatePlayersStatsWithRank(match.players, winner, match.balances);

    console.log(`Match ${match.matchId} finalized, winner: ${winner}`);
    console.table(
      match.players.map((p) => ({
        playerId: p,
        result: balances[p].toString(),
      })),
    );

    const expireSec = 120;
    await rC.expire(`match:${match.matchId}`, expireSec);
    await rC.expire(`matchMeta:${match.matchId}`, expireSec);
    for (const playerId of match.players) {
      await rC.expire(`player:${playerId}:activeMatch`, expireSec);
    }
  } catch (error) {
    console.error(`finalizeMatch error ${match.matchId}:`, error);
    throw error;
  }
}
