import { Match } from "../structures/match.struct";
import { matchIdGenerate } from "../utils/matchIdGenerate";
import { rC } from "../storage/activeMatchesStorage";
import { startAndSaveMatch } from "./match.service";
import { matchBoardHashing } from "../utils/matchBoardHashing";
import { createBoard } from "./game.service";
import {
  findPlayerById,
  withdrawBalance,
  depositBalance,
} from "../storage/playersDataBaseActions";

const MIN_BALANCE = 1_000_000_000_000_000n; // 0.001 ETH floor

/** 5% service fee — deducted from bid when match starts, not when queuing */
const FEE_BPS = 5n;
export function calcFee(bid: bigint): bigint {
  return (bid * FEE_BPS) / 100n;
}

type MatchAction =
  | { type: "join"; matchId: string }
  | { type: "create" }
  | { type: "wait" };

/* Atomic Lua: find an open waiting match to join, or claim the create slot */
async function getMatchAction(): Promise<MatchAction> {
  const result = await rC.eval(
    `
    local matchIds = redis.call("ZRANGE", "waiting:matches", 0, 9)

    if matchIds and #matchIds > 0 then
      for i = 1, #matchIds do
        local matchId = matchIds[i]
        local exists = redis.call("EXISTS", "waiting:match:" .. matchId)

        if exists == 1 then
          local tryLockKey = "waiting:match:" .. matchId .. ":trylock"
          local lock = redis.call("SET", tryLockKey, ARGV[1], "NX", "PX", 2000)
          if lock then
            return { "join", matchId }
          end
        else
          redis.call("ZREM", "waiting:matches", matchId)
        end
      end
    end

    local waitingCount = redis.call("ZCARD", "waiting:matches")
    if waitingCount > 10 then
      return { "wait", "" }
    end

    local lock = redis.call("SET", "lock:waiting:match:create", ARGV[1], "NX", "PX", 2000)
    if lock then
      return { "create", "" }
    end

    return { "wait", "" }
    `,
    {
      keys: [],
      arguments: [`${Date.now()}:${Math.random()}`],
    },
  );

  if (!result) return { type: "wait" };

  const [type, matchId] = result as [string, string];
  console.log(`getMatchAction -> type: ${type}, matchId: ${matchId}`);

  if (type === "join") return { type: "join", matchId };
  if (type === "create") return { type: "create" };
  return { type: "wait" };
}

export async function joinOrCreateMatch(
  playerId: string,
  bid: string,
  token: string,
): Promise<Match> {
  const player = findPlayerById(playerId);
  if (!player) throw new Error(`Player ${playerId} not found`);

  const playerBalance = BigInt(player.playerBalance ?? "0");
  const bidAmount = BigInt(bid);

  if (playerBalance < MIN_BALANCE || playerBalance < bidAmount) {
    throw new Error(
      `Player ${playerId} has insufficient balance: ${playerBalance} wei`,
    );
  }

  const maxAttempts = 200;
  const initialWaitTime = 20;
  let totalWaitTime = 0;
  let lastActionType = "";

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    // Check if player requested cancel
    const cancelled = await rC.get(`player:${playerId}:cancelSearch`);
    if (cancelled) {
      await rC.del(`player:${playerId}:cancelSearch`);
      throw new Error("Search cancelled");
    }

    const action = await getMatchAction();
    lastActionType = action.type;

    if (action.type === "join") {
      console.log(`Player ${playerId} attempt ${attempt + 1}: join ${action.matchId}`);
      const match = await joinWaitingMatch(playerId, action.matchId, token);
      if (match) {
        console.log(`Player ${playerId} joined match ${match.matchId}`);
        return match;
      }
      continue;
    }

    if (action.type === "create") {
      console.log(`Player ${playerId} attempt ${attempt + 1}: create`);
      try {
        const match = await createWaitingMatch(playerId, bid);
        console.log(`Player ${playerId} created match ${match.matchId}`);
        return match;
      } catch (error) {
        console.log(`Player ${playerId} failed to create match: ${error}`);
        continue;
      } finally {
        await rC.del("lock:waiting:match:create").catch(() => {});
      }
    }

    // Exponential backoff with jitter after attempt 20
    let waitTime = initialWaitTime;
    if (attempt > 20) {
      waitTime = Math.min(waitTime * Math.pow(1.3, attempt - 20), 300);
    }
    waitTime = waitTime * (0.8 + Math.random() * 0.4);

    await new Promise((r) => setTimeout(r, waitTime));
    totalWaitTime += waitTime;

    if (totalWaitTime > 8000 && attempt > maxAttempts / 2) {
      console.log(`Player ${playerId} trying force create after ${totalWaitTime}ms`);
      try {
        const match = await createWaitingMatch(playerId, bid);
        return match;
      } catch {}
    }
  }

  try {
    console.log(`Player ${playerId} last resort create`);
    const match = await createWaitingMatch(playerId, bid);
    return match;
  } catch {
    throw new Error(
      `${playerId} was unable to connect to the match after ${maxAttempts} attempts`,
    );
  }
}

/* Withdraws full bid upfront; fee is baked into match.total when the joiner arrives */
export async function createWaitingMatch(
  playerId: string,
  bid: string,
): Promise<Match> {
  const playerLockKey = `player:creating:${playerId}`;
  const playerLocked = await rC.set(playerLockKey, "1", { NX: true, PX: 3000 });
  if (!playerLocked) throw new Error(`Player ${playerId} is already creating a match`);

  try {
    withdrawBalance(playerId, bid);

    const matchId = await matchIdGenerate();
    const bidBig = BigInt(bid);
    const fee = calcFee(bidBig);
    const gamePot = bidBig - fee;

    const match: Match = {
      matchId,
      createdAt: Date.now(),
      creator: playerId,
      players: [playerId],
      bid,
      fee: fee.toString(),
      total: (gamePot * 2n).toString(), // both players' net bids — what the board distributes
      count: 12,
      board: [],
      balances: { [playerId]: "0" },
      status: "waiting",
      turnStartedAt: 0,
    };

    const multi = rC.multi();
    multi.set(`waiting:match:${match.matchId}`, JSON.stringify(match), { EX: 3000 });
    multi.zAdd("waiting:matches", { score: Date.now(), value: match.matchId });
    multi.del("lock:waiting:match:create");
    multi.set(`player:${playerId}:waitingMatch`, match.matchId, { EX: 3000 }); // needed for cancel
    await multi.exec();

    console.log(`Player ${playerId} created match ${match.matchId}`);
    return match;
  } finally {
    await rC.del(playerLockKey).catch(() => {});
  }
}

/* Refunds full bid — only works if nobody has joined yet */
export async function cancelSearch(playerId: string): Promise<boolean> {
  // Signals the joinOrCreateMatch loop to break out on next iteration
  await rC.set(`player:${playerId}:cancelSearch`, "1", { EX: 30 });

  const matchId = await rC.get(`player:${playerId}:waitingMatch`);
  if (!matchId) return false;

  const raw = await rC.get(`waiting:match:${matchId}`);
  if (!raw) {
    await rC.del(`player:${playerId}:waitingMatch`);
    return false;
  }

  let match: Match;
  try { match = JSON.parse(raw); } catch { return false; }

  if (match.creator !== playerId || match.status !== "waiting" || match.players.length > 1) {
    await rC.del(`player:${playerId}:waitingMatch`);
    return false;
  }

  depositBalance(playerId, match.bid);
  console.log(`Player ${playerId} cancelled search, refunded ${match.bid} WEI`);

  const multi = rC.multi();
  multi.del(`waiting:match:${matchId}`);
  multi.zRem("waiting:matches", matchId);
  multi.del(`player:${playerId}:waitingMatch`);
  await multi.exec();

  return true;
}

export async function joinWaitingMatch(
  playerId: string,
  matchId: string,
  token: string,
): Promise<Match | null> {
  const lockKey = `waiting:match:${matchId}:join`;
  const lockValue = `${Date.now()}:${playerId}`;

  const locked = await rC.set(lockKey, lockValue, { NX: true, PX: 2000 });
  console.log(`Player ${playerId} trying to join match ${matchId}: lock = ${locked}`);

  if (!locked) return null;

  try {
    const raw = await rC.get(`waiting:match:${matchId}`);
    if (!raw) {
      await rC.zRem("waiting:matches", matchId).catch(() => {});
      return null;
    }

    const match: Match = JSON.parse(raw);
    const age = Math.max(0, Date.now() - match.createdAt);

    // Never let the creator join their own waiting match
    if (match.creator === playerId) return null;

    if (match.status !== "waiting" || match.players.length >= 2 || age > 120000) {
      if (match.status === "waiting" && match.players.length < 2 && age < 60000) {
        await rC.zAdd("waiting:matches", { score: Date.now(), value: match.matchId });
      } else if (age >= 60000) {
        const multi = rC.multi();
        multi.del(`waiting:match:${matchId}`);
        multi.zRem("waiting:matches", matchId);
        await multi.exec();
      }
      return null;
    }

    console.log(`Player ${playerId} join conditions met: status=${match.status}, players=${match.players.length}`);

    withdrawBalance(playerId, match.bid); // fee already baked into match.total by creator

    const board = createBoard(BigInt(match.total), 12);
    const boardHash = matchBoardHashing(board);

    match.players.push(playerId);
    match.balances[playerId] = "0";
    match.status = "active";
    match.board = board;
    match.boardHash = boardHash;

    console.log(
      `Match ${matchId} started | bid=${match.bid} fee=${match.fee} pot=${match.total}`,
    );

    const readyMatch = await startAndSaveMatch(match);

    const multi = rC.multi();
    multi.del(`waiting:match:${matchId}`);
    multi.zRem("waiting:matches", matchId);
    multi.del(`player:${match.creator}:waitingMatch`); // creator can no longer cancel
    await multi.exec();

    return readyMatch;
  } catch (error) {
    console.error(`Error joining match ${matchId}:`, error);
    return null;
  } finally {
    await rC.del(lockKey).catch(() => {});
  }
}
