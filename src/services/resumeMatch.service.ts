import { rC } from "../storage/activeMatchesStorage";
import { getActiveMatch, clearActiveMatch } from "./playerMatch.service";
import { Match } from "../structures/match.struct";
import { saveMatch } from "./match.service";

export type ResumeResult =
  | { ok: true; match: Match }
  | { ok: false; reason: "no_active_match" | "match_not_found" };

export async function resumeMatch(
  playerId: string
): Promise<ResumeResult> {
  const matchId = await getActiveMatch(playerId);

  if (!matchId) {
    return { ok: false, reason: "no_active_match" };
  }

  try {
    const raw = await rC.get(`match:${matchId}`);

    if (!raw) {
      await clearActiveMatch(playerId);
      return { ok: false, reason: "match_not_found" };
    }

    let match: Match;
    try {
      match = JSON.parse(raw) as Match;
    } catch {
      // Corrupt data — clear and bail
      await clearActiveMatch(playerId);
      return { ok: false, reason: "match_not_found" };
    }

    if (match.status === "active") {
      await saveMatch(match);
    }

    if (match.status === "finished") {
      await clearActiveMatch(playerId);
    }

    return { ok: true, match };
  } catch (error) {
    console.error(`Error resuming match for player ${playerId}:`, error);
    await clearActiveMatch(playerId);
    return { ok: false, reason: "match_not_found" };
  }
}






