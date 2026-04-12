import {
  findPlayerByTelegramId,
  findPlayerByGoogleId,
  findPlayerById,
  createPlayer,
  linkTelegram,
  linkGoogle,
} from "../../storage/playersDataBaseActions";

export function loginOrSignWithTelegram(
  telegramId: string,
  currentPlayerId?: string, // checker "is it" in routing
) {
  // if tg is => log
  const existing = findPlayerByTelegramId(telegramId);
  if (existing) return existing;

  // if user is loged by google => link tg
  if (currentPlayerId) {
    linkTelegram(currentPlayerId, telegramId);
    return findPlayerById(currentPlayerId);
  }

  // else create new acc
  const player = createPlayer();
  linkTelegram(player.playerId, telegramId);

  return player;
}

// same as tg
export function loginOrSignWithGoogle(
  googleId: string,
  currentPlayerId?: string, // checker "is it" in routing
) {
  const existing = findPlayerByGoogleId(googleId);
  if (existing) return existing;

  if (currentPlayerId) {
    linkGoogle(currentPlayerId, googleId);
    return findPlayerById(currentPlayerId);
  }

  const player = createPlayer();
  linkGoogle(player.playerId, googleId);

  return player;
}

// add to logins
export function connectTelegram(playerId: string, telegramId: string) {
  const existing = findPlayerByTelegramId(telegramId);

  if (existing && existing.playerId !== playerId) {
    throw new Error("Telegram already linked to another account");
  }

  linkTelegram(playerId, telegramId);

  return findPlayerById(playerId);
}

// add to logins
export function connectGoogle(playerId: string, googleId: string) {
  const existing = findPlayerByGoogleId(googleId);

  if (existing && existing.playerId !== playerId) {
    throw new Error("Google already linked to another account");
  }

  linkGoogle(playerId, googleId);

  return findPlayerById(playerId);
}
