/* game engine */

import { Match, Box, MoveResult } from "../structures/match.struct";
import { randomizePool } from "../utils/random";
import { hashBoard } from "../utils/boardHash";
import { finishMatch_onContract } from "./contracts/contract.service";
import { clearActiveMatch } from "./playerMatch.service";
import { rC } from "../storage/activeStorage";
import { activeSave } from "../storage/activeStorage";
import { updatePlayersStatsWithRank } from "../storage/saveToSql";

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

    const matchMetaKey = `matchMeta:${updatedMatch.id}`;
    try {
      await rC.set(
        matchMetaKey,
        JSON.stringify({
          matchId: updatedMatch.id,
          onChainId: updatedMatch.onChainId ?? null,
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
  const values: bigint[] = randomizePool(total, count);

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
    boardHash: hashBoard(board),
  };
}
/* helper function that checks whether all fields are open; if true, the game ends */
export function isGameOver(match: Match): boolean {
  return match.board.every((box) => box.openedBy !== undefined);
}

/* helper function that returns the match results */
export function getGameResult(match: Match) {
  const entries = Object.entries(match.balances);

  if (entries.length !== 2) return null;

  const [p1, p2] = entries;

  const b1 = BigInt(p1[1]);
  const b2 = BigInt(p2[1]);

  // Player 1 won
  if (b1 > b2) {
    return {
      winner: p1[0],
      loser: p2[0],
      balances: match.balances,
    };
  }

  // Player 2 won
  if (b2 > b1) {
    return {
      winner: p2[0],
      loser: p1[0],
      balances: match.balances,
    };
  }

  // draw
  return {
    draw: true,
    balances: match.balances,
  };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function finalizeMatch(match: Match): Promise<void> {
  try {
    if (!match.onChainId) throw new Error(`Match ${match.id} no onChainId`);

    const balances: { [player: string]: bigint } = {};
    let winner = match.players[0];
    let maxBalance = BigInt(match.balances[winner] ?? "0");

    for (const addr of match.players) {
      const bal = BigInt(match.balances[addr] ?? "0");
      balances[addr] = bal;

      if (bal > maxBalance) {
        maxBalance = bal;
        winner = addr;
      }
    }

    const total = BigInt(match.total);
    const sum = Object.values(match.balances).reduce(
      (acc, v) => acc + BigInt(v),
      0n,
    );
    if (sum !== total)
      throw new Error(
        `Balance mismatch: sum=${sum.toString()} total=${total.toString()}`,
      );

    await finishMatch_onContract(
      Number(match.onChainId),
      match.players,
      balances,
      total,
    );

    // update actual sql

    const stats = updatePlayersStatsWithRank(match.players, winner);

    console.log(`Match ${match.id} finalized, winner: ${winner}`);
    console.table(stats); // для наглядности

    // Очистка Redis
    await rC.expire(`match:${match.id}`, 120);
    await rC.expire(`matchMeta:${match.id}`, 120);
    for (const player of match.players) {
      await rC.expire(`player:${player}:activeMatch`, 120);
    }
  } catch (error) {
    console.error(`finalise error ${match.id}:`, error);
    throw error;
  }
}
