import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import "dotenv/config";
import { startServer } from "./server/server";
import { startAfkWatcher } from "./services/afk.service";
import { startBot } from "./services/bot.service";
import { startEnemyService } from "./services/enemy.service";

startServer();
startAfkWatcher();
startBot();
startEnemyService();