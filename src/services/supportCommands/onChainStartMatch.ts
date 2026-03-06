import { contract } from "../contracts/provider.onChain";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

let provider: ethers.JsonRpcProvider;
let wallet1: ethers.Wallet;
let wallet2: ethers.Wallet;

provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
wallet1 = new ethers.Wallet(process.env.ADDRESS1_PRIVATKEY!, provider);
wallet2 = new ethers.Wallet(process.env.ADDRESS2_PRIVATKEY!, provider);

const contract1 = contract.connect(wallet1) as any;
const contract2 = contract.connect(wallet2) as any;

async function findMatch1() {
  try {
    const tx = await contract1.findMatch(
      ethers.ZeroAddress,
      0,
      ethers.ZeroAddress,
      { value: ethers.parseEther("0.001") }
    );

    const receipt = await tx.wait();

    console.log("Transaction mined:", receipt);
    console.log("Status:", receipt.status); // 1 = success, 0 = fail
  } catch (error) {
    console.error(error);
  }
}

async function findMatch2() {
  try {
    const tx = await contract2.findMatch(
      ethers.ZeroAddress,
      0,
      ethers.ZeroAddress,
      { value: ethers.parseEther("0.001") }
    );

    const receipt = await tx.wait();

    console.log("Transaction mined:", receipt);
    console.log("Status:", receipt.status); // 1 = success, 0 = fail
  } catch (error) {
    console.error(error);
  }
}

findMatch1()
setTimeout(() => {findMatch2()}, 1000)
