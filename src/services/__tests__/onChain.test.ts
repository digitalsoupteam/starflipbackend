import { contract } from "../contracts/contract.service";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

import { joinOrCreateMatch } from "../matchMaking.service";
import { resumeMatch } from "../resumeMatch.service";
import { rC } from "../../storage/activeStorage";

jest.setTimeout(120_000);

describe("Create match → resumeMatch flow", () => {
  beforeAll(async () => {
    await rC.flushAll(); // чистим Redis 
  });

  it("игроки должны восстановить свой active матч через resumeMatch()", async () => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    const wallet1 = new ethers.Wallet(
      process.env.ADDRESS1_PRIVATKEY!,
      provider,
    );

    const wallet2 = new ethers.Wallet(
      process.env.ADDRESS2_PRIVATKEY!,
      provider,
    );

    const contract1 = contract.connect(wallet1) as any;
    const contract2 = contract.connect(wallet2) as any;

    const matchFormedPromise = new Promise<any>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Match not formed in time"));
      }, 20000);

      const listener = async (player: string, token: string, amount: any) => {
        try {
          const match = await joinOrCreateMatch(player, Number(amount), token);

          if (match.status === "active") {
            clearTimeout(timeout);
            contract.off("MatchRequested", listener);
            resolve(match);
          }
        } catch (err) {
          reject(err);
        }
      };

      contract.on("MatchRequested", listener);
    });

    console.log("Waiting for players ;)");

    // Игрок 1
    const tx1 = await contract1.findMatch(
      ethers.ZeroAddress,
      0,
      ethers.ZeroAddress,
      { value: ethers.parseEther("0.001") },
    );
    await tx1.wait();

    // Игрок 2
    const tx2 = await contract2.findMatch(
      ethers.ZeroAddress,
      0,
      ethers.ZeroAddress,
      { value: ethers.parseEther("0.001") },
    );
    await tx2.wait();

    const finalMatch = await matchFormedPromise;

    console.log("Match created:", finalMatch.id);

    // тест resume 

    const resume1 = await resumeMatch(wallet1.address);
    const resume2 = await resumeMatch(wallet2.address);

    // log возврата игроков
    if (resume1.ok) {
      console.log(
        `Player ${wallet1.address} resumed match ${resume1.match.id}`,
      );
    } else {
      console.log(
        `Player ${wallet1.address} could not resume match: ${resume1.reason}`,
      );
    }

    if (resume2.ok) {
      console.log(
        `Player ${wallet2.address} resumed match ${resume2.match.id}`,
      );
    } else {
      console.log(
        `Player ${wallet2.address} could not resume match: ${resume2.reason}`,
      );
    }

    expect(resume1.ok).toBe(true);
    expect(resume2.ok).toBe(true);

    if (resume1.ok && resume2.ok) {
      expect(resume1.match.id).toBe(finalMatch.id);
      expect(resume2.match.id).toBe(finalMatch.id);

      expect(resume1.match.status).toBe("active");
      expect(resume2.match.status).toBe("active");

      expect(resume1.match.onChainId).toBe(finalMatch.onChainId);
    }
    console.log("Resume worked correctly. STOP.");
  });
});
