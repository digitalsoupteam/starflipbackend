import { contract } from "../contracts/contract.onChainService";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

jest.setTimeout(120_000);

describe("Cancel FINDMATCH() on chain for both wallets", () => {
  it("should cancel finding match for both players", async () => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    // Список кошельков
    const wallets = [
      new ethers.Wallet(process.env.ADDRESS1_PRIVATKEY!, provider),
      new ethers.Wallet(process.env.ADDRESS2_PRIVATKEY!, provider),
    ];

    for (let i = 0; i < wallets.length; i++) {
      const wallet = wallets[i];
      const playerNumber = i + 1;
      const contractInstance = contract.connect(wallet) as any;

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
        // Специальная проверка на "ничего не найдено"
        if (error.message && error.message.includes("No match found")) {
          console.log(`Player ${playerNumber} had no match to cancel.`);
        } else {
          console.error(`Player ${playerNumber} error:`, error);
        }
      }
    }
  });
});