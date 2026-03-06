// provider.onChain.ts
import { ethers } from "ethers";
import { PvPGridArtifact } from "./PvPGridABI";
import "dotenv/config";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const BACKEND_PRIVATE_KEY = process.env.PRIVATE_KEY!;
const RPC_WSS = process.env.RPC_WSS!;
const PvPGridABI = (PvPGridArtifact as any)[0].abi;

export let provider = new ethers.WebSocketProvider(RPC_WSS);
export let backendWallet = new ethers.Wallet(BACKEND_PRIVATE_KEY, provider);
export let contract = new ethers.Contract(CONTRACT_ADDRESS, PvPGridABI, backendWallet);


// ПРОБЛЕМА РЕККОНЕКТА ПОТОМ ПОПРАВИТЬ!
// export function initWssListeners() {
//   const ws = provider.websocket as any;

//   ws.onopen = () => console.log(" WSS connection established");

//   ws.onclose = async (event: any) => {
//     console.log(`WSS connection closed. Code: ${event.code}`);
//     await wssReconnect();
//   };

//   ws.onerror = (err: any) => console.error("⚠️ WSS error:", err);
// }

// async function wssReconnect() {
//   console.log("Reconnecting WSS...");
//   try { await provider.destroy(); } catch (_) {}

//   provider = new ethers.WebSocketProvider(RPC_WSS);
//   backendWallet = new ethers.Wallet(BACKEND_PRIVATE_KEY, provider);
//   contract = new ethers.Contract(CONTRACT_ADDRESS, PvPGridABI, backendWallet);

//   initWssListeners();
// }