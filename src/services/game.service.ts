// Движок игры

import { Match, Box, MoveResult } from "../structures/match.struct";
import { randomizePool } from "../utils/random";
import { hashBoard } from "../utils/boardHash";
import { finishMatch_onContract } from "./contracts/contract.service";
import { clearActiveMatch } from "./playerMatch.service";
import { rC } from "../storage/activeStorage";
import { activeSave } from "../storage/activeStorage";

/* делает ход, проверяет validateMove(), прежде, чем ходить, если все ок то делает applyMove(), 
обновляя данные матча, также проверяет, если все клетки заполнены isGameOver() возвращая статус finished для матча */

export async function makeMove(
  match: Match,
  playerId: string,
  boxId: number,
): Promise<MoveResult> {
  // проверка на ошибку валидации
  const error = validateMove(match, playerId, boxId);
  if (error) {
    return { match, error };
  }
  // если валидация пройдена обновление переменных и статуса матча
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
      console.error("Не удалось обновить matchMeta:", err);
    }

    const res = await activeSave(updatedMatch);
    if (!res.ok) {
      console.error("Failed to save finished match", res.error);
    }

    await finalizeMatch(updatedMatch);
  }

  return { match: updatedMatch };
}

/* вспомогательная функция, создает игровое поле в рандомном порядке */
export function createBoard(total: bigint, count: number): Box[] {
  // создаёт рандомное распределение total монет по count боксам
  const values: bigint[] = randomizePool(total, count);

  return values.map((value, index) => ({
    id: index,
    value: value.toString(),
  }));
}
/* вспомогательная функция, проверяет возможность хода (активные клетки, ход игрока) */
export function validateMove(
  match: Match,
  playerId: string,
  boxId: number,
): string | null {
  //проверяет, если статус матча не active, значит ходить нельзя
  if (match.status !== "active") {
    return "match not active";
  }

  //проверяет, если текущий ход не данного игрока, значит ходить нельзя
  if (match.currentTurn !== playerId) {
    return "its not your turn";
  }

  //проверяет, данный бокс не существует, значит ходить по нему нельзя
  const box = match.board.find((b) => b.id === boxId);
  if (!box) {
    return "box was not found";
  }

  //проверяет, данный бокс открыт, значит ходить по нему нельзя

  if (box.openedBy) {
    return "box is already open";
  }

  // если все проверки пройдены
  return null;
}

/* вспомогательная функция, применяет ход и обновляет статус матча, если все проверки пройдены */
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
/* вспомогательная функция, проверяет, открыто ли все поле, что является концом игры в случае true */
export function isGameOver(match: Match): boolean {
  return match.board.every((box) => box.openedBy !== undefined);
}

/* вспомогательная функция, возвращает результаты матча */
export function getGameResult(match: Match) {
  const entries = Object.entries(match.balances);

  if (entries.length !== 2) return null;

  const [p1, p2] = entries;

  const b1 = BigInt(p1[1]);
  const b2 = BigInt(p2[1]);

  // победил игрок 1
  if (b1 > b2) {
    return {
      winner: p1[0],
      loser: p2[0],
      balances: match.balances,
    };
  }

  // победил игрок 2
  if (b2 > b1) {
    return {
      winner: p2[0],
      loser: p1[0],
      balances: match.balances,
    };
  }

  // ничья
  return {
    draw: true,
    balances: match.balances,
  };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function finalizeMatch(match: Match): Promise<void> {
  try {
    if (!match.onChainId) {
      throw new Error(`Match ${match.id} no onChainId`);
    }

    const balances: { [player: string]: bigint } = {};

    for (const addr of match.players) {
      balances[addr] = BigInt(match.balances[addr] ?? "0");
    }

    // 🔒 Проверка целостности банка
    const total = BigInt(match.total);

    const sum = Object.values(match.balances).reduce(
      (acc, v) => acc + BigInt(v),
      0n,
    );

    if (sum !== total) {
      throw new Error(
        `Balance mismatch: sum=${sum.toString()} total=${total.toString()}`,
      );
    }

    // отправка результата в контракт
    await finishMatch_onContract(
      Number(match.onChainId),
      match.players,
      balances,
      total,
    );

    await rC.expire(`match:${match.id}`, 120);
    await rC.expire(`matchMeta:${match.id}`, 120);

    for (const player of match.players) {
      await rC.expire(`player:${player}:activeMatch`, 120);
    }

    console.log(`Match ${match.id} finalized + deleted in Redis`);
  } catch (error) {
    console.error(`finalise error ${match.id}:`, error);
    throw error;
  }
}
