import { contract } from "../contracts/contract.onChainService";

async function cancelMatch(id: string) {
  try {
    const tx = await contract.cancelMatch(id);
    console.log(`Транзакция отправлена: ${tx.hash}`);
    await tx.wait();

    console.log(`Матч ${id} отменен на контракте`);
  } catch (error) {console.error(error)}
}

cancelMatch("71")