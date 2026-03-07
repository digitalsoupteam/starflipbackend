import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import 'dotenv/config';
import { startServer } from './server/server';
import { startPollingMatches } from "./services/contracts/pollingFindMatch.onChain";
import { initRedisExpiredListener } from './services/contracts/autoCansel.onChainService';

startServer();
initRedisExpiredListener().catch(console.error);
startPollingMatches();