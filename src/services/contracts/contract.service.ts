import { ethers } from "ethers";
import { PvPGridArtifact } from "./PvPGridABI";
import "dotenv/config";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RPC_URL = process.env.RPC_URL;
const BACKEND_PRIVATE_KEY = process.env.PRIVATE_KEY;
const PvPGridABI = (PvPGridArtifact as any).abi;

if (!BACKEND_PRIVATE_KEY) throw new Error("не найден приват ки бека в .env");
if (!CONTRACT_ADDRESS) throw new Error("не найден адрес контракта игры в .env");

const provider = new ethers.JsonRpcProvider(RPC_URL);
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
  const tx = await contract.createMatch([player1, player2], token, boardHash);
  const receipt = await tx.wait();

  const event = receipt.logs
    .map((log: any) => contract.interface.parseLog(log))
    .find((parsedLog: any) => parsedLog?.name === "MatchCreated");

  return Number(event?.args[0]); // айдишник матча в контакте (помещаем в обьект)
}

/* Фукнция передачи данных об окончаении матча и инфы о победителях */
export async function finishMatch_onContract(
  onChainId: number,
  balances: {
    [playerAddress: string]: number;
  },
): Promise<void> {
  const tx = await contract.finishMatch(onChainId, balances);
  await tx.wait();
}
