import { rC } from "../storage/activeStorage";
import { cancelMatch_onContract } from "./contracts/contract.service";
export async function initRedisExpiredListener() {
  const sub = rC.duplicate();
  await sub.connect();
  console.log("Redis expired listener started");
  await sub.pSubscribe("__keyevent@0__:expired", async (key) => {
    if (key.startsWith("match:")) {
      const matchId = key.split(":")[1];
      console.log("Активный матч истёк:", matchId);

      try {
        await cancelMatch_onContract(matchId);
      } catch (err) {
        console.error("Ошибка при отмене на ончейне:", err);
      }
    }
  });
}
