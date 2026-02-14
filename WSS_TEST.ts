import { ethers } from "ethers";


const wssUrl = "wss://go.getblock.io/4a6012e0aa104a9fb71e24d927100491";

const provider = new ethers.WebSocketProvider(wssUrl);


provider.on("block", (blockNumber) => {
  console.log("Новый блок:", blockNumber);
});


const ws = (provider as any).websocket;

ws.addEventListener("open", () => {
  console.log("WSS соединение установлено!");
});

ws.addEventListener("close", (event: CloseEvent) => {
  console.log(`Cоединения нет, код: ${event.code}`);
});

ws.addEventListener("error", (err: any) => {
  console.error("Ошибка WSS:", err);
});
