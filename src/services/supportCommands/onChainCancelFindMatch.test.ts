import { ethers } from "ethers";
import * as dotenv from "dotenv";
import { PvPGridArtifact } from "../contracts/PvPGridABI";

dotenv.config();

jest.setTimeout(120_000);

describe("Cancel FINDMATCH() on chain for both wallets", () => {
  it("should cancel finding match for both players", async () => {
  
    const provider = new ethers.JsonRpcProvider(process.env.RPC_HTTPS);

    
    const wallets = [
      new ethers.Wallet(process.env.ADDRESS1_PRIVATKEY!, provider),
      new ethers.Wallet(process.env.ADDRESS2_PRIVATKEY!, provider),
    ];

    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
    const abi = PvPGridArtifact[0].abi;

    for (let i = 0; i < wallets.length; i++) {
      const wallet = wallets[i];
      const playerNumber = i + 1;

      const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

      try {
        const cancelTx = await contractInstance.cancelFindMatch();
        console.log(`Player ${playerNumber} cancel tx sent:`, cancelTx.hash);

        const receipt = await cancelTx.wait();
        console.log(`Player ${playerNumber} cancel confirmed in block:`, receipt.blockNumber);

        if (receipt.status === 1) {
          console.log(`Player ${playerNumber} match canceled successfully.`);
        } else {
          console.warn(`Player ${playerNumber} cancel transaction failed.`);
        }
      } catch (error: any) {
        if (error.message && error.message.includes("No match found")) {
          console.log(`Player ${playerNumber} had no match to cancel.`);
        } else {
          console.error(`Player ${playerNumber} error:`, error);
        }
      }
    }
  });
});