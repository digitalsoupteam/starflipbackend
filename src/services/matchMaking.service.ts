/* Search for and create a partner for the game */

import { Match } from "../structures/match.struct";
import { generateId } from "../utils/idGenerate";
import { rC } from "../storage/activeStorage";
import { startAndSaveMatch } from "./match.service";
import { createMatch_onContract } from "./contracts/contract.service";
import { hashBoard } from "../utils/boardHash";
import { createBoard } from "./game.service";

/* Type for the Lua script below */
type MatchAction =
  | { type: "join"; matchId: string }
  | { type: "create" }
  | { type: "wait" };

/* A Lua script for working with Redis */
async function getMatchAction(): Promise<MatchAction> {
  const result = await rC.eval(
    `
    -- 1. First, we look for matches to join
    local matchIds = redis.call("ZRANGE", "waiting:matches", 0, 9)  -- Looking at 10 matches
    
    if matchIds and #matchIds > 0 then
      -- We'll try each match one by one
      for i = 1, #matchIds do
        local matchId = matchIds[i]
        local exists = redis.call("EXISTS", "waiting:match:" .. matchId)
        
        if exists == 1 then
          -- We're trying to secure this match as part of our attempt to join
          local tryLockKey = "waiting:match:" .. matchId .. ":trylock"
          local lock = redis.call(
            "SET",
            tryLockKey,
            ARGV[1],
            "NX",
            "PX",
            2000  -- TTL: 2000ms 
          )
          
          if lock then
            return { "join", matchId }
          end
        else
          -- Remove a nonexistent match from the queue
          redis.call("ZREM", "waiting:matches", matchId)
        end
      end
    end
    
    -- 2. Create a new match—only if there are very few people waiting
    local waitingCount = redis.call("ZCARD", "waiting:matches")
    
    -- If there are already 10 or more pending matches, do not create new ones (wait until they clear)
    if waitingCount > 10 then
      return { "wait", "" }
    end
    
    -- 3. Let's create a new match with a short lock
    local lock = redis.call(
      "SET",
      "lock:waiting:match:create",
      ARGV[1],
      "NX",
      "PX",
      2000  -- TTL: 2000 lock on match creation
    )
    
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

  if (!result) {
    return { type: "wait" };
  }

  const [type, matchId] = result as [string, string];
  console.log(`getMatchAction -> type: ${type}, matchId: ${matchId}`);

  if (type === "join") {
    return { type: "join", matchId };
  }

  if (type === "create") {
    return { type: "create" };
  }

  return { type: "wait" };
}

/* The main matchmaking function: connect to a match or create your own */
export async function joinOrCreateMatch(
  playerId: string,
  bid: string,
  token: string,
): Promise<Match> {
  const maxAttempts = 200;
  const initialWaitTime = 20;

  let totalWaitTime = 0;
  let lastActionType = "";

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const action = await getMatchAction();
    if (action.type === "join") {
      console.log(
        `Player ${playerId} attempt ${attempt + 1}: action = ${action.type}, matchId = ${action.matchId}`,
      );
    } else {
      console.log(
        `Player ${playerId} attempt ${attempt + 1}: action = ${action.type}`,
      );
    }

    lastActionType = action.type;

    // If a match was found for joining
    if (action.type === "join") {
      const match = await joinWaitingMatch(playerId, action.matchId, token);
      if (match) {
        console.log(
          `Player ${playerId} joined match ${match.id} on attempt ${attempt + 1}`,
        );
        return match;
      }
      // If the connection failed, try again immediately
      continue;
    }

    // If need to create a new match
    if (action.type === "create") {
      try {
        const match = await createWaitingMatch(playerId, bid);
        console.log(
          `Player ${playerId} created match ${match.id} on attempt ${attempt + 1}`,
        );
        return match;
      } catch (error) {
        // If creation failed, keep trying
        console.log(`Player ${playerId} failed to create match: ${error}`);
        continue;
      } finally {
        // Always release the lock on creation (even if an error occurs)
        await rC.del("lock:waiting:match:create").catch(() => {});
      }
    }

    // If need to wait 
    let waitTime = initialWaitTime;

    // Increase the delay exponentially if we've been waiting a long time
    if (attempt > 20) {
      waitTime = Math.min(waitTime * Math.pow(1.3, attempt - 20), 300);
    }

    // Random offset for load balancing (prevents synchronization)
    waitTime = waitTime * (0.8 + Math.random() * 0.4);

    await new Promise((r) => setTimeout(r, waitTime));
    totalWaitTime += waitTime;

    // If we've been waiting too long, we'll try to force a match
    if (totalWaitTime > 8000 && attempt > maxAttempts / 2) {
      console.log(
        `Player ${playerId} trying force create after ${totalWaitTime}ms`,
      );
      try {
        const match = await createWaitingMatch(playerId, bid);
        return match;
      } catch (error) {
        // If that didn't work, we continue with the normal loop
      }
    }
  }

  // Last attempt—let's try to create a “last chance” match before the error
  try {
    console.log(`Player ${playerId} last resort create`);
    const match = await createWaitingMatch(playerId, bid);
    return match;
  } catch (error) {
    console.log(
      `Player ${playerId} completely failed after ${maxAttempts} attempts, last action: ${lastActionType}`,
    );
    throw new Error(
      `${playerId} was unable to connect to the match after ${maxAttempts} attempts`,
    );
  }
}

/* Creating a pending match */
export async function createWaitingMatch(
  playerId: string,
  bid: string,
): Promise<Match> {
  // Check if this player has already created a match
  const playerLockKey = `player:creating:${playerId}`;
  const playerLocked = await rC.set(playerLockKey, "1", {
    NX: true, 
    PX: 3000, // TTL: 3000 ms (3 seconds) to prevent a player from creating multiple matches
  });
  console.log(
    `Player ${playerId} creating match: player lock = ${playerLocked}`,
  );
  if (!playerLocked) {
    throw new Error(`Player ${playerId} is already creating a match`);
  }

  try {
    const id = await generateId();
    const bidBig = BigInt(bid);

    const match: Match = {
      id,
      createdAt: Date.now(),
      creator: playerId,
      players: [playerId],
      bid,
      total: (bidBig * 2n).toString(),
      count: 12,
      board: [],
      balances: { [playerId]: "0" },
      status: "waiting",
      turnStartedAt: 0,
    };

    
    const multi = rC.multi();

    console.log(`Player ${playerId} created match ${match.id}`);

    // If a player leaves, the match will be automatically deleted after X  minutes
    multi.set(`waiting:match:${match.id}`, JSON.stringify(match), {
      EX: 3000,
    });

    // Add the match ID to the sorted list of pending matches
    multi.zAdd("waiting:matches", {
      score: Date.now(),
      value: match.id,
    });

    // Release the global lock on match creation
    multi.del("lock:waiting:match:create");

    await multi.exec();

    return match;
  } finally {
    // Always unblock the player (even if there was an error)
    await rC.del(playerLockKey).catch(() => {});
  }
}

/* Connecting to the match */
export async function joinWaitingMatch(
  playerId: string,
  matchId: string,
  token: string,
): Promise<Match | null> {
  const lockKey = `waiting:match:${matchId}:join`;
  const lockValue = `${Date.now()}:${playerId}`;

  // Lock the connection to a specific match
  const locked = await rC.set(lockKey, lockValue, {
    NX: true, 
    PX: 2000, // TTL: 1000 ms (1 second) to block the match during connection
  });

  console.log(
    `Player ${playerId} trying to join match ${matchId}: lock = ${locked}`,
  );

  if (!locked) {
    return null; // Someone is already trying to join this match
  }

  try {
    // Retrieve match data from Redis
    const raw = await rC.get(`waiting:match:${matchId}`);
    if (!raw) {
      // If no match is found, remove it from the queue
      await rC.zRem("waiting:matches", matchId).catch(() => {});
      return null;
    }

    const match = JSON.parse(raw);
    const age = Math.max(0, Date.now() - match.createdAt);

    // Checking the connection conditions
    if (
      match.status !== "waiting" ||
      match.players.length >= 2 ||
      age > 120000
    ) {
      // Quick rollback - handling an invalid match
      if (match.status === "waiting" && match.players.length < 2) {
        // Only add the match back to the queue if it's recent
        if (age < 60000) {
          await rC.zAdd("waiting:matches", {
            score: Date.now(),
            value: match.id,
          });
        } else {
          // Old match – delete permanently
          const multi = rC.multi();
          multi.del(`waiting:match:${matchId}`);
          multi.zRem("waiting:matches", matchId);
          await multi.exec();
        }
      }
      return null;
    }

    console.log(
      `Player ${playerId} join conditions: status=${match.status}, players=${match.players.length}, createdAt=${match.createdAt}`,
    );

    const board = createBoard(BigInt(match.bid) * 2n, 12);
    const boardHash = hashBoard(board);

    console.log("Creating on-chain match...");
    try {
      const onChainId = await Promise.race([
        createMatch_onContract(match.players[0], playerId, token, boardHash),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("on-chain timeout")), 15000),
        ),
      ]);
      console.log("On-chain match created:", onChainId);

      match.onChainId = onChainId;
    } catch (error) {
      console.error("Match creation error:", error);
      throw error;
    }

    match.players.push(playerId);
    match.balances[playerId] = "0";
    console.log(`Player ${playerId} successfully joined match ${match.id}`);
    match.status = "active";
    match.board = board;
    match.boardHash = boardHash;

    const readyMatch = await startAndSaveMatch(match);

    // Save changes atomically
    const multi = rC.multi();

    // Delete the pending match
    multi.del(`waiting:match:${matchId}`);

    // Remove the match from the queue
    multi.zRem("waiting:matches", matchId);

    await multi.exec();

    return readyMatch;
  } catch (error) {
    console.error(`Error joining match ${matchId}:`, error);
    return null;
  } finally {
    // Always release the lock on the connection (even if an error occurred)
    await rC.del(lockKey).catch(() => {});
  }
}
