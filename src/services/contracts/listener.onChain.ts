import { contract } from "./provider.onChain";

/* функция слушает событие match request */
export function onMatchRequested(callback: (event: any) => void) {
contract.on('MatchRequested', (player, token, amount, referrer, event) => {
callback({
player,
token,
amount,
referrer,
transactionHash: event.log.transactionHash
});
})}