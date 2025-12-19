/* База данных игр */

import { Match } from "../structures/match.struct";

export const matches = new Map<string, Match>();
export const waitingMatches = new Map<string, Match>();