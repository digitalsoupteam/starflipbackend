import { ethers } from "ethers";
import { PvPGridArtifact } from "./PvPGridABI";
import { joinOrCreateMatch } from "../matchMaking.service";
import "dotenv/config";

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const RPC_HTTPS = process.env.RPC_HTTPS!;
const PvPGridABI = (PvPGridArtifact as any)[0].abi;

const provider = new ethers.JsonRpcProvider(RPC_HTTPS);
const contract = new ethers.Contract(CONTRACT_ADDRESS, PvPGridABI, provider);

let lastBlock = 0;

export async function startPollingMatches() {
  while (true) {
    try {
      const currentBlock = await provider.getBlockNumber();
      if (lastBlock === 0) lastBlock = currentBlock - 1;

      console.log(
        `Checking blocks from ${lastBlock + 1} to ${currentBlock}...`,
      );

      const eventFragment = contract.interface.getEvent("MatchRequested");
      if (!eventFragment) {
        console.error('Event "MatchRequested" not found in contract ABI!');
        await sleep(20000);
        continue;
      }

      const filterTopics = contract.interface.encodeFilterTopics(
        eventFragment,
        [],
      );

      const logs = await provider.getLogs({
        address: CONTRACT_ADDRESS,
        fromBlock: lastBlock + 1,
        toBlock: currentBlock,
        topics: filterTopics,
      });

      if (logs.length === 0) {
        console.log(
          `No MatchRequested events found in blocks ${lastBlock + 1}-${currentBlock}`,
        );
      }

      for (const log of logs) {
        try {
          let parsed: ethers.LogDescription | null = null;

          try {
            parsed = contract.interface.parseLog(log);
          } catch (err) {
            console.error("Failed to parse log:", err);
            continue;
          }

          if (!parsed) continue;

          const { player, token, amount } = parsed.args as any;

          console.log("Found MatchRequested event:", {
            player,
            token,
            amount: amount.toString(),
          });
         
          const match = await joinOrCreateMatch(
            player,
            amount.toString(),
            token,
          );
          console.log(`Player ${player} in ${(match as any).id}`);
        } catch (err) {
          console.error("Error processing MatchRequested event:", err);
        }
      }

      lastBlock = currentBlock;
    } catch (err) {
      console.error("Error fetching new blocks:", err);
    }

    await sleep(20000);
  }
}

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}
