import { onMatchRequested } from './services/contracts/listener';
import { joinOrCreateMatch } from './services/matchMaking.service';
import { startServer } from './server/server';
import { initRedisExpiredListener } from './services/autoCansel.service';
import 'dotenv/config';

startServer();
initRedisExpiredListener().catch(console.error);

onMatchRequested(async (event) => {
  console.log('event!', event.player);
  console.log(`bid: ${event.amount} ${event.token}`);
  console.log(`token: ${event.token}`)
  
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
});

console.log('Waiting for players ;)');