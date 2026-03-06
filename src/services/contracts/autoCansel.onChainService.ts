import { rC, activeGet } from "../../storage/activeStorage";
import { cancelMatch_onContract } from "./contract.service";

export async function initRedisExpiredListener() {
  const sub = rC.duplicate();
  await sub.connect();
  console.log("Redis expired listener started");

  await sub.pSubscribe("__keyevent@0__:expired", async (key) => {
    // Отслеживаем только активные матчи
    if (!key.startsWith("match:")) return;

    // Попытка получить данные матча
    const matchId = key.split(":")[1];
    const result = await activeGet(matchId);

    // Если ключ уже удалён или матч завершён — выходим
    if (!result.ok) {
      // ключ уже нет в Redis
      return;
    }

    const match = result.match;
    if (match.status === "finished") {
      // матч уже завершён, отмена не нужна
      return;
    }

    // Если матч действительно активный, вызываем отмену
    console.log(`Активный матч истёк: ${matchId}, вызываем cancelMatch_onContract`);
    try {
      await cancelMatch_onContract(matchId);
    } catch (err) {
      console.error("Ошибка при отмене на ончейне:", err);
    }
  });
}