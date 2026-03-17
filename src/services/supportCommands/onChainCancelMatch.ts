import { contract } from "../contracts/provider.onChain";

async function cancelMatch(id: string) {
  try {
    const tx = await contract.cancelMatch(id);
    console.log(`Tx sent: ${tx.hash}`);
    await tx.wait();

    console.log(`Match ${id} cancelled on contract`);
  } catch (error) {console.error(error)}
}

cancelMatch("124")
