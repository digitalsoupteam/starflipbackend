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
