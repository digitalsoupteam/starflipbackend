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
/* завершение матч с учетом хауседж + логи */
export async function finishMatch_onContract(
  onChainId: number,
  balances: { [playerAddress: string]: number | bigint },
): Promise<void> {
  console.log("=== finishMatch_onContract start ===");
  console.log("onChainId:", onChainId);

  // Получаем порядок игроков
  const matchInfo = await contract.getMatchInfo(onChainId);
  const [player1, player2] = matchInfo.players;
  console.log("Players:", player1, player2);

  if (!balances[player1] || !balances[player2]) {
    throw new Error(`Balances missing for players`);
  }

  // Берем выплаты в BigInt
  let payout1 = BigInt(balances[player1]);
  let payout2 = BigInt(balances[player2]);
  console.log("Original payouts:", payout1.toString(), payout2.toString());

  // Получаем houseEdge с контракта
  const currentHouseEdge = BigInt(await contract.houseEdge());
  console.log("Current houseEdge (%):", currentHouseEdge.toString());

  // Считаем pot после houseEdge
  const total = payout1 + payout2;
  const potAfterHouse = (total * (100n - currentHouseEdge)) / 100n;
  console.log("Pot after houseEdge:", potAfterHouse.toString());

  // Если сумма выплат больше чем potAfterHouse, масштабируем пропорционально
  const sumPayouts = payout1 + payout2;
  if (sumPayouts > potAfterHouse && sumPayouts > 0n) {
    const ratio = (potAfterHouse * 1_000_000n) / sumPayouts; // умножаем на миллион для точности
    payout1 = (payout1 * ratio) / 1_000_000n;
    payout2 = (payout2 * ratio) / 1_000_000n;
    console.log("Adjusted payouts:", payout1.toString(), payout2.toString());
  } else {
    console.log("No adjustment needed for payouts");
  }

  // Отправляем на контракт
  console.log("Sending finishMatch transaction...");
  const tx = await contract.finishMatch(onChainId, payout1, payout2);
  const receipt = await tx.wait();
  console.log("Transaction hash:", receipt.transactionHash);

}
