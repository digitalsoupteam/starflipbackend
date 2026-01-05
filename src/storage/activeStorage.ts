import { createClient } from "redis";
import { Match } from "../structures/match.struct";

export const rC = createClient();

rC.connect().catch((err) => {
  console.error("Redis connection error", err);
});

/* типы для респонсов */
export type SaveResult = { ok: true } | { ok: false; error: unknown };

export type GetResult =
  | { ok: true; match: Match }
  | { ok: false; error: any };

export type DeleteResult =
  | { ok: true; deleted: boolean }
  | { ok: false; error: unknown };

/* неважная мини утилка */
const matchKey = (id: Match["id"]) => `match:${id}`;

/* сохранить в активной памяти игру */
export async function activeSave(match: Match): Promise<SaveResult> {
  try {
    await rC.set(matchKey(match.id), JSON.stringify(match));
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}

/* взять из активной памяти игру */
export async function activeGet(matchId: string): Promise<GetResult> {
  try {
    const data = await rC.get(matchKey(matchId));
    if (!data) {
      return { ok: false, error: "not_found" };
    }

    return {
      ok: true,
      match: JSON.parse(data) as Match, 
    };
  } catch (error) {
    return { ok: false, error };
  }
}

/* удалить из активной памяти игру */
export async function activeDel(matchId: string): Promise<DeleteResult> {
  try {
    const deleted = (await rC.del(matchKey(matchId))) === 1;
    return { ok: true, deleted };
  } catch (error) {
    return { ok: false, error };
  }
}

