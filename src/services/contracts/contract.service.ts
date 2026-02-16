import { ethers } from "ethers";
import { PvPGridArtifact } from "./PvPGridABI";
import "dotenv/config";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const BACKEND_PRIVATE_KEY = process.env.PRIVATE_KEY;
const PvPGridABI = (PvPGridArtifact as any)[0].abi;

if (!BACKEND_PRIVATE_KEY) throw new Error("не найден приват ки бека в .env");
if (!CONTRACT_ADDRESS) throw new Error("не найден адрес контракта игры в .env");

const RPC_WSS = process.env.RPC_WSS;
if (!RPC_WSS) throw new Error("RPC_WSS не задан в .env");

const provider = new ethers.WebSocketProvider(RPC_WSS);
const backendWallet = new ethers.Wallet(BACKEND_PRIVATE_KEY, provider);

export const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  PvPGridABI,
  backendWallet,
);

/* Функция создания матча, когда найдена пара игроков */
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

  return Number(event?.args[0]); // айдишник матча в контакте (помещаем в обьект)
}

/* завершаем матч */
export async function finishMatch_onContract(
  matchId: number,
  balances: { [playerAddress: string]: bigint },
  total: bigint,
): Promise<void> {

  const houseEdge: bigint = await contract.houseEdge();
  const maxHouse = (total * houseEdge) / 100n;

  const players = Object.keys(balances);

  if (players.length !== 2) {
    throw new Error("Invalid balances length");
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

  const tx = await contract.finishMatch(
    matchId,
    payout1,
    payout2,
  );

  await tx.wait();
}
