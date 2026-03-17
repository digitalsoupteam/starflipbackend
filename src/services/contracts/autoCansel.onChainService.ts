import { rC, activeGet } from "../../storage/activeStorage";
import { cancelMatch_onContract } from "./contract.service";

export async function initRedisExpiredListener() {
  const sub = rC.duplicate();
  await sub.connect();
  console.log("Redis expired listener started");

  await sub.pSubscribe("__keyevent@0__:expired", async (key) => {

    if (!key.startsWith("match:")) return;

    const matchId = key.split(":")[1];
    const result = await activeGet(matchId);

    if (!result.ok) {
      return;
    }

    const match = result.match;
    if (match.status === "finished") {
      return;
    }

    console.log(`Expired: ${matchId}, call cancelMatch_onContract`);
    try {
      await cancelMatch_onContract(matchId);
    } catch (err) {
      console.error("Error onChain:", err);
    }
  });
}