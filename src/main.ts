import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

import "dotenv/config";
import { startServer } from "./server/server";
import { startAfkWatcher } from "./services/afk.service";

startServer();
startAfkWatcher();