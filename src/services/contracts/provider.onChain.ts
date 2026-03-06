import { ethers } from "ethers";
import { PvPGridArtifact } from "./PvPGridABI";
import "dotenv/config";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const BACKEND_PRIVATE_KEY = process.env.PRIVATE_KEY;
const PvPGridABI = (PvPGridArtifact as any)[0].abi;

if (!BACKEND_PRIVATE_KEY) throw new Error("не найден приват ки бека в .env");
if (!CONTRACT_ADDRESS) throw new Error("не найден адрес контракта игры в .env");

let RPC_WSS = process.env.RPC_WSS;
if (!RPC_WSS) throw new Error("RPC_WSS не задан в .env");


export let provider = new ethers.WebSocketProvider(process.env.RPC_WSS!);
export let backendWallet = new ethers.Wallet(
  process.env.PRIVATE_KEY!,
  provider,
);
export let contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS!,
  PvPGridABI,
  backendWallet,
);

let ws = provider.websocket as any;

ws.onopen = () => {
  console.log("✅ WSS connection established");
};

ws.onclose = async (event: any) => {
  console.log(`❌ WSS connection closed. Code: ${event.code}`);

  try {
    await wssReconnect();
    console.log("reconnected");
  } catch (err) {
    console.error("Failed to reconnect", err);
  }
};

ws.onerror = (err: any) => {
  console.error("⚠️ WSS error:", err);
};

async function wssReconnect() {
  console.log("Reconnecting WSS...");

  // Закрываем старый провайдер если он ещё жив
  try {
    await provider.destroy();
  } catch (_) {}

  if (!RPC_WSS) {console.error('no RPC_WSS smthing happend')}
  else {provider = new ethers.WebSocketProvider(RPC_WSS);}
  ws = provider.websocket as any;

  if (!BACKEND_PRIVATE_KEY) {console.error('no BACKEND_PRIVATE_KEY smthing happend')}
  else {backendWallet = new ethers.Wallet(BACKEND_PRIVATE_KEY, provider);}
  
  if (!CONTRACT_ADDRESS){console.error('no CONTRACT_ADDRESS smthing happend')}
  else {contract = new ethers.Contract(CONTRACT_ADDRESS, PvPGridABI, backendWallet);}

  ws.onopen = () => console.log("✅ WSS connection re-established");
  ws.onclose = async (event: any) => {
    console.log(`❌ WSS connection closed. Code: ${event.code}`);
    try {
      await wssReconnect();
      console.log("✅ reconnected");
    } catch (err) {
      console.error("Failed to reconnect", err);
    }
  };
  ws.onerror = (err: any) => console.error("⚠️ WSS error:", err);
}
