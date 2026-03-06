import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { PvPGridArtifact } from "../contracts/PvPGridABI";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

const wallet1 = new ethers.Wallet(process.env.ADDRESS1_PRIVATKEY!, provider);
const wallet2 = new ethers.Wallet(process.env.ADDRESS2_PRIVATKEY!, provider);

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;

const contract1 = new ethers.Contract(
  CONTRACT_ADDRESS,
  PvPGridArtifact[0].abi,
  wallet1,
);

const contract2 = new ethers.Contract(
  CONTRACT_ADDRESS,
  PvPGridArtifact[0].abi,
  wallet2,
);

async function findMatch1() {
  try {
    const tx = await contract1.findMatch(
      ethers.ZeroAddress,
      0,
      ethers.ZeroAddress,
      { value: ethers.parseEther("0.001") },
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
      { value: ethers.parseEther("0.001") },
    );

    const receipt = await tx.wait();

    console.log("Transaction mined:", receipt);
    console.log("Status:", receipt.status); // 1 = success, 0 = fail
  } catch (error) {
    console.error(error);
  }
}

findMatch1();
setTimeout(() => {
  findMatch2();
}, 1000);
