import {
  contract,
} from "../contracts/contract.service";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

import { joinOrCreateMatch } from "../matchMaking.service";
import { resumeMatch } from "../resumeMatch.service";
import { rC } from "../../storage/activeStorage";
import { moveInMatch } from "../match.service";
import { clearActiveMatch } from "../playerMatch.service";
import { Match } from "../../structures/match.struct";

jest.setTimeout(300_000);

describe("Create match → resume → full game onChain flow", () => {
  let provider: ethers.JsonRpcProvider;
  let wallet1: ethers.Wallet;
  let wallet2: ethers.Wallet;

  beforeAll(async () => {
    console.log("Flushing Redis...");
    await rC.flushAll();

    provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    wallet1 = new ethers.Wallet(
      process.env.ADDRESS1_PRIVATKEY!,
      provider
    );
    wallet2 = new ethers.Wallet(
      process.env.ADDRESS2_PRIVATKEY!,
      provider
    );

    for (const addr of [wallet1.address, wallet2.address]) {
      await clearActiveMatch(addr);
    }
  });

  it("игроки создают матч, восстанавливают его и открывают все 12 клеток", async () => {
    const contract1 = contract.connect(wallet1) as any;
    const contract2 = contract.connect(wallet2) as any;

    console.log("Players trying to create/join match...");

    const matchFormedPromise = new Promise<Match>((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Match not formed in time")),
        60_000,
      );

      const listener = async (player: string, token: string, amount: any) => {
        try {
          const match = await joinOrCreateMatch(
            player,
            Number(amount),
            token
          );

          if (match.status === "active") {
            clearTimeout(timeout);
            contract.off("MatchRequested", listener);
            resolve(match);
          }
        } catch (err) {
          console.error("Listener error:", err);
        }
      };

      contract.on("MatchRequested", listener);
    });

    // Игроки ищут матч
    await (await contract1.findMatch(
      ethers.ZeroAddress,
      0,
      ethers.ZeroAddress,
      { value: ethers.parseEther("0.001") },
    )).wait();

    await (await contract2.findMatch(
      ethers.ZeroAddress,
      0,
      ethers.ZeroAddress,
      { value: ethers.parseEther("0.001") },
    )).wait();

    const finalMatch = await matchFormedPromise;

    console.log(
      "Match created:",
      finalMatch.id,
      "onChainId:",
      finalMatch.onChainId,
    );

    // Ресюм
    const resume1 = await resumeMatch(wallet1.address);
    const resume2 = await resumeMatch(wallet2.address);

    if (!resume1.ok || !resume2.ok) {
      throw new Error("Resume failed");
    }

    let currentMatch = resume1.match;
    console.log('Resume1.match:', resume1.match)
    console.log('Resume2.match:', resume2.match)
    
    let currentPlayer = currentMatch.currentTurn!;

    // 12 ходов
    for (let boxId = 0; boxId < 12; boxId++) {
      const moveResult = await moveInMatch(
        currentMatch.id,
        currentPlayer,
        boxId,
        `move_${boxId}_${Date.now()}`,
      );

      if (moveResult.error) {
        throw new Error(`Move error: ${moveResult.error}`);
      }

      currentMatch = moveResult.match!;
      currentPlayer = currentMatch.currentTurn!;
    }

    console.log("Match finished. Total moves: 12");
    console.log('balances:', currentMatch.balances)

    // Проверяем финальное состояние
    expect(currentMatch.status).toBe("finished");
    expect(currentMatch.board.every(b => b.openedBy)).toBe(true);

    const sum = Object.values(currentMatch.balances)
      .reduce((a, b) => a + b, 0);

    expect(sum).toBe(currentMatch.total);
  });





  afterAll(async () => {
    // Сначала чистим активные матчи
    for (const addr of [wallet1.address, wallet2.address]) {
      await clearActiveMatch(addr);
    }

    // Потом закрываем провайдер
    if (provider?.destroy) {
      await provider.destroy();
    }

    // И только в самом конце Redis
    if (rC.isOpen) {
      await rC.quit();
    }
  });
});