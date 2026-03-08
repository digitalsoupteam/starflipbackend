import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { PvPGridArtifact } from "../contracts/PvPGridABI";

dotenv.config();

const provider = new ethers.JsonRpcProvider(process.env.RPC_HTTPS);

const wallet3 = new ethers.Wallet(process.env.ADDRESS3_PRIVATKEY!, provider);

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;

const contract3 = new ethers.Contract(
  CONTRACT_ADDRESS,
  PvPGridArtifact[0].abi,
  wallet3,
);



async function findMatch3() {
  try {
    const tx = await contract3.findMatch(
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



findMatch3()