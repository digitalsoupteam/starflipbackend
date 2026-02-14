import { contract } from "../contracts/contract.service";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

jest.setTimeout(120_000);

//ТОЛЬКО ЕСЛИ ВИСИТ ТРАЗА ФАЙЙДМАЧАç

describe("Cansel FINDMATCH() on chain", () => {
  it("should CANSEL finding match", async () => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
    const wallet1 = new ethers.Wallet(
      process.env.ADDRESS1_PRIVATKEY!,
      provider,
    );

    const contractInstance = contract.connect(wallet1) as any;

   
    try {
      const cancelTx = await contractInstance.cancelFindMatch();
      console.log("Cancel tx sent:", cancelTx.hash);

      const receipt = await cancelTx.wait();
      console.log("Cancel confirmed in block:", receipt.blockNumber);

      expect(receipt.status).toBe(1);
    } catch (error) {
      console.error("ERR:", error);
      throw error;
    }
  });
});
