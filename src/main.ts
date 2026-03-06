import { onMatchRequested } from './services/contracts/listener.findMatch';
import { handleMatchRequested } from './services/contracts/handler.findMatch';
import { startServer } from './server/server';
import { initRedisExpiredListener } from './services/contracts/autoCansel.onChainService';
import { provider } from './services/contracts/provider.onChain';
import 'dotenv/config';

startServer();
initRedisExpiredListener().catch(console.error);
onMatchRequested(handleMatchRequested);
console.log('Waiting for players ;)');

