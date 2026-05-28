import { ethers } from "ethers";
import "dotenv/config";

const BACKEND_PRIVATE_KEY = process.env.PRIVATE_KEY!;
const RPC_HTTPS = process.env.RPC_HTTPS!;

export let provider =  new ethers.JsonRpcProvider(RPC_HTTPS);
export let backendWallet = new ethers.Wallet(BACKEND_PRIVATE_KEY, provider);
