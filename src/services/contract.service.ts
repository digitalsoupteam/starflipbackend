import { ethers } from "ethers";
import "dotenv/config";

const RPC_URL = process.env.RPC_URL!;
const BACKEND_PRIVATE_KEY = process.env.BACKEND_PRIVATE_KEY!;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(BACKEND_PRIVATE_KEY, provider);

/* УЗНАТЬ У КИРИЛЛА ABI ФИНИШ МАТЧ или СХОЖЕГО КОНТРАКТА*/
/* УЗНАТЬ У КИРИЛЛА Евент постуление средств на контакт*/
const CONTRACT_ABI = [
  "function finishMatch(bytes32 matchId, address[] players, uint256[] rewards)",
];

const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, wallet);

function toOnChainMatchId(matchId: string): string {
  return ethers.keccak256(ethers.toUtf8Bytes(matchId));
}

export async function finishMatchOnChain(
  matchId: string,
  balances: Record<string, number>,
) {
  const onChainMatchId = toOnChainMatchId(matchId);

  const players = Object.keys(balances);
  const rewards = Object.values(balances).map((v) => BigInt(v));

  const tx = await contract.finishMatch(onChainMatchId, players, rewards);

  await tx.wait();
}
