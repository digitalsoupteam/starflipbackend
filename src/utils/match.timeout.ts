/* отдельный небольшой хелпер для подсчета таймаута хода */

import { Match } from "../structures/match.struct";
import { TURN_TIMEOUT_MS } from "../services/match.service";

export function isTurnTimedOut(match: Match): boolean {
  return Date.now() - match.turnStartedAt > TURN_TIMEOUT_MS;
}
