import { joinOrCreateMatch } from "../matchMaking.service";

export const handleMatchRequested = async (event: {
  player: string;
  token: string;
  amount: string | number;
  referrer: string;
  transactionHash: string;
}) => {
  console.log('event!', event.player);
  console.log(`bid: ${event.amount} ${event.token}`);
  console.log(`token: ${event.token}`);

  try {
    const match = await joinOrCreateMatch(
      event.player,
      Number(event.amount),
      event.token
    );

    console.log(`player takes matchID (on back) ${match.id}`);
  } catch (error) {
    console.error(`err ${error}`);
  }
};