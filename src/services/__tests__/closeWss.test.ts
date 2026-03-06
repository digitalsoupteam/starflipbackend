import { provider } from "../contracts/contract.onChainService";

// @ts-ignore: используем приватное свойство _websocket
provider._websocket?.close(4000, "Manual test");
console.log("Sent manual close to WSS");