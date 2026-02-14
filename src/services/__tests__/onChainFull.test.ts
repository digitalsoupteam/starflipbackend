import { contract } from "../contracts/contract.service";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

import { joinOrCreateMatch } from "../matchMaking.service";
import { resumeMatch } from "../resumeMatch.service";
import { rC } from "../../storage/activeStorage";
import { moveInMatch } from "../match.service";

jest.setTimeout(180_000);

describe("Create match → resume -> full game onChain flow", () => {
  beforeAll(async () => {
    console.log("Flushing Redis...");
    await rC.flushAll();
  });

  it("игроки создают матч, восстанавливают его и открывают все 12 клеток", async () => {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    const wallet1 = new ethers.Wallet(process.env.ADDRESS1_PRIVATKEY!, provider);
    const wallet2 = new ethers.Wallet(process.env.ADDRESS2_PRIVATKEY!, provider);

    const contract1 = contract.connect(wallet1) as any;
    const contract2 = contract.connect(wallet2) as any;

    console.log("Players trying to create/join match...");

    // создаем мач
    const matchFormedPromise = new Promise<any>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error("Match not formed in time")), 20000);

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

    // Игроки ищут матч
    const tx1 = await contract1.findMatch(ethers.ZeroAddress, 0, ethers.ZeroAddress, { value: ethers.parseEther("0.005") });
    await tx1.wait();
    const tx2 = await contract2.findMatch(ethers.ZeroAddress, 0, ethers.ZeroAddress, { value: ethers.parseEther("0.005") });
    await tx2.wait();

    const finalMatch = await matchFormedPromise;
    console.log("Match created:", finalMatch.id, "onChainId:", finalMatch.onChainId);

    // ресьюм
    const resume1 = await resumeMatch(wallet1.address);
    const resume2 = await resumeMatch(wallet2.address);

    if (resume1.ok) console.log(`Player ${wallet1.address} resumed match ${resume1.match.id}`);
    if (resume2.ok) console.log(`Player ${wallet2.address} resumed match ${resume2.match.id}`);

    if (!resume1.ok || !resume2.ok) throw new Error("Resume failed for a player");

    let currentMatch = resume1.match;
    let currentPlayer = currentMatch.currentTurn!;
    const players = [wallet1.address, wallet2.address];

    // далеам 12 ходов
    for (let boxId = 0; boxId < 12; boxId++) {
      const moveResult = await moveInMatch(currentMatch.id, currentPlayer, boxId, `move_${boxId}_${Date.now()}`);
      if (moveResult.error) throw new Error(`Move error: ${moveResult.error}`);
      currentMatch = moveResult.match!;
      console.log(`Box ${boxId} opened by ${currentPlayer}`);
      currentPlayer = currentMatch.currentTurn!;
    }

    console.log("Match finished. Total moves: 12, opened boxes: 12");

    const player1Moves = currentMatch.board.filter((b) => b.openedBy === wallet1.address).length;
    const player2Moves = currentMatch.board.filter((b) => b.openedBy === wallet2.address).length;
    console.log(`Player1 moves: ${player1Moves}, Player2 moves: ${player2Moves}`);
    console.log("Final balances:", currentMatch.balances);
    console.log("onChainId:", currentMatch.onChainId);

    // onChain финиш матч
    try {
      console.log(" Завершаем матч");

      const p1Bal = BigInt(currentMatch.balances[wallet1.address]);
      const p2Bal = BigInt(currentMatch.balances[wallet2.address]);

      console.log("Preparing finishMatch_onContract:");
      console.log("onChainId:", currentMatch.onChainId);
      console.log("Player1:", wallet1.address, "balance:", p1Bal.toString());
      console.log("Player2:", wallet2.address, "balance:", p2Bal.toString());

      const iface = new ethers.Interface(contract.interface.format()); // интерфейс для декодирования ошибок

      // вызываем контракт
      try {
        const tx = await (contract as any).finishMatch(currentMatch.onChainId, p1Bal, p2Bal);
        const receipt = await tx.wait();
        console.log("finishMatch_onContract executed successfully, txHash:", receipt.transactionHash);
      } catch (e: any) {
        console.error("Contract finalize failed:", e);

        // декодинг кастом ерор
        if (e.data) {
          try {
            const decodedError = iface.parseError(e.data);
            if (decodedError)
            console.error("Decoded custom error:", decodedError.name, decodedError.args);
          } catch (decodeErr) {
            console.error("Failed to decode custom error:", decodeErr);
          }
        }
      }
    } catch (error) {
      console.error("Finalization error:", error);
      throw error;
    }

    // асертс 
    expect(currentMatch.status).toBe("finished");
    expect(player1Moves + player2Moves).toBe(12);
  });
});
