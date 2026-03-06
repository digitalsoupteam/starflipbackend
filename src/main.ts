// main.ts
import 'dotenv/config';
import { startServer } from './server/server';
import { initRedisExpiredListener } from './services/contracts/autoCansel.onChainService';
import { startPollingMatches } from './services/contracts/pollingFindMatch.onChain';

// запускаем сервер
startServer();

// инициализация авто-отмены матчей
initRedisExpiredListener().catch(console.error);

// запускаем polling на новые события MatchRequested
startPollingMatches(); 

