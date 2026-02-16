import {
  contract,
  finishMatch_onContract,
} from "../contracts/contract.service";
import { ethers } from "ethers";
import * as dotenv from "dotenv";
dotenv.config();

import { joinOrCreateMatch } from "../matchMaking.service";
import { resumeMatch } from "../resumeMatch.service";
import { rC } from "../../storage/activeStorage";
import { moveInMatch } from "../match.service";
import { Match } from "../../structures/match.struct";

jest.setTimeout(180_000);

describe("Create match → resume → full game onChain flow", () => {
  beforeAll(async () => {
    console.log("Flushing Redis...");
    await rC.flushAll();
  });

  it("игроки создают матч, восстанавливают его и открывают все 12 клеток", async () => {
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

    console.log("Players trying to create/join match...");

    // создаем матч
    const matchFormedPromise = new Promise<Match>((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("Match not formed in time")),
        20000,
      );

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
    const tx1 = await contract1.findMatch(
      ethers.ZeroAddress,
      0,
      ethers.ZeroAddress,
      { value: ethers.parseEther("0.001") },
    );
    await tx1.wait();
    const tx2 = await contract2.findMatch(
      ethers.ZeroAddress,
      0,
      ethers.ZeroAddress,
      { value: ethers.parseEther("0.001") },
    );
    await tx2.wait();

    const finalMatch = await matchFormedPromise;
    console.log(
      "Match created:",
      finalMatch.id,
      "onChainId:",
      finalMatch.onChainId,
    );

    // Ресюм матчей
    const resume1 = await resumeMatch(wallet1.address);
    const resume2 = await resumeMatch(wallet2.address);

    if (!resume1.ok || !resume2.ok)
      throw new Error("Resume failed for a player");

    let currentMatch = resume1.match;
    let currentPlayer = currentMatch.currentTurn!;

    // Делаем 12 ходов
    for (let boxId = 0; boxId < 12; boxId++) {
      const moveResult = await moveInMatch(
        currentMatch.id,
        currentPlayer,
        boxId,
        `move_${boxId}_${Date.now()}`,
      );
      if (moveResult.error) throw new Error(`Move error: ${moveResult.error}`);
      currentMatch = moveResult.match!;
      currentPlayer = currentMatch.currentTurn!;
    }

    console.log("Match finished. Total moves: 12, opened boxes: 12");
    console.log("Final balances:", currentMatch.balances);
    console.log("onChainId:", currentMatch.onChainId);

    // Проверяем, что транзакция finishMatch_onContract прошла без реверта
    const balances = {
      [currentMatch.players[0]]: currentMatch.balances[currentMatch.players[0]],
      [currentMatch.players[1]]: currentMatch.balances[currentMatch.players[1]],
    };
    const balancesBigInt: { [player: string]: bigint } = {};
    for (const player of currentMatch.players) {
      balancesBigInt[player] = BigInt(currentMatch.balances[player]);
    }

    await expect(
      finishMatch_onContract(
        Number(currentMatch.onChainId),
        balancesBigInt,
        BigInt(currentMatch.total),
      ),
    ).resolves.not.toThrow();

    afterAll(async () => {
      // Закрываем WSS, чтобы жесть завершился
      await contract.runner?.provider?.destroy?.();
    });
  });
});
