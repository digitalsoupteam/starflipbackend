import { contract } from "./provider.onChain";
import { rC } from "../../storage/activeStorage";

/* make match onChain */
export async function createMatch_onContract(
  player1: string,
  player2: string,
  token: string,
  boardHash: string,
): Promise<number> {
  const normalizedHash = boardHash.startsWith("0x")
    ? boardHash
    : `0x${boardHash}`;
  const tx = await contract.createMatch(
    [player1, player2],
    token,
    normalizedHash,
  );

  const receipt = await tx.wait();

  const event = receipt.logs
    .map((log: any) => contract.interface.parseLog(log))
    .find((parsedLog: any) => parsedLog?.name === "MatchCreated");

  return Number(event?.args[0]); // id on contract NOT same as id on BACK
}

/* endMatch */ 
export async function finishMatch_onContract(
  matchId: number,
  players: string[],
  balances: { [playerAddress: string]: bigint },
  total: bigint,
): Promise<void> {
  const houseEdge: bigint = await contract.houseEdge();
  const maxHouse = (total * houseEdge) / 100n;

  if (players.length !== 2) {
    throw new Error("Invalid players length");
  }

  const score1 = balances[players[0]] ?? 0n;
  const score2 = balances[players[1]] ?? 0n;
  const scoreSum = score1 + score2;

  let payout1: bigint = 0n;
  let payout2: bigint = 0n;

  const distributable = total - maxHouse;

  if (scoreSum === 0n) {
    payout1 = distributable / 2n;
    payout2 = distributable - payout1;
  } else {
    payout1 = (distributable * score1) / scoreSum;
    payout2 = distributable - payout1;
  }

  const tx = await contract.finishMatch(matchId, payout1, payout2);

  await tx.wait();
}

/* if TTL expiered cancelMatch to delete match on contract */
export async function cancelMatch_onContract(matchId: string) {
  try {
    const metaRaw = await rC.get(`matchMeta:${matchId}`);

    if (!metaRaw) {
      console.log(`matchMeta for ${matchId} not found`);
      return;
    }

    const meta = JSON.parse(metaRaw);
    const onChainId = meta.onChainId;

    if (!onChainId) {
      console.log(`match ${matchId} have no onChainId`);
      return;
    }

    const tx = await contract.cancelMatch(onChainId);
    console.log(`Transaction sent: ${tx.hash}`);

    await tx.wait();
    console.log(`Match ${matchId} canceled on contract succesfully`);

    await rC.del(`matchMeta:${matchId}`);
    console.log(`matchMeta:${matchId} deleted from Redis`);
  } catch (error) {
    console.error("Error cancelMatch_onContract:", error);
  }
}
