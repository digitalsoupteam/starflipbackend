import {
  findPlayerByTelegramId,
  findPlayerByGoogleId,
  findPlayerById,
  findPlayerByInviteCode,
  createPlayer,
  linkTelegram,
  linkGoogle,
  ensureInviteCode,
  setReferrer,
} from "../../storage/playersDataBaseActions";

function applyReferralCode(newPlayerId: string, code?: string): void {
  if (!code) return;
  const refCode = code.startsWith("ref_") ? code.slice(4) : code;
  const referrer = findPlayerByInviteCode(refCode);
  if (referrer) {
    setReferrer(newPlayerId, referrer.playerId);
  }
}

export function loginOrSignWithTelegram(
  telegramId: string,
  referralCode?: string,
  currentPlayerId?: string,
) {
  const existing = findPlayerByTelegramId(telegramId);
  if (existing) {
    ensureInviteCode(existing.playerId);
    return findPlayerById(existing.playerId); // re-fetch to include inviteCode
  }

  if (currentPlayerId) {
    linkTelegram(currentPlayerId, telegramId);
    applyReferralCode(currentPlayerId, referralCode);
    ensureInviteCode(currentPlayerId);
    return findPlayerById(currentPlayerId);
  }

  const player = createPlayer();
  linkTelegram(player.playerId, telegramId);
  applyReferralCode(player.playerId, referralCode);
  return findPlayerById(player.playerId);
}

export function loginOrSignWithGoogle(
  googleId: string,
  referralCode?: string,
  currentPlayerId?: string,
) {
  const existing = findPlayerByGoogleId(googleId);
  if (existing) {
    ensureInviteCode(existing.playerId);
    return findPlayerById(existing.playerId);
  }

  if (currentPlayerId) {
    linkGoogle(currentPlayerId, googleId);
    applyReferralCode(currentPlayerId, referralCode);
    ensureInviteCode(currentPlayerId);
    return findPlayerById(currentPlayerId);
  }

  const player = createPlayer();
  linkGoogle(player.playerId, googleId);
  applyReferralCode(player.playerId, referralCode);
  return findPlayerById(player.playerId);
}

export function connectTelegram(playerId: string, telegramId: string) {
  const existing = findPlayerByTelegramId(telegramId);
  if (existing && existing.playerId !== playerId) {
    throw new Error("Telegram already linked to another account");
  }
  linkTelegram(playerId, telegramId);
  return findPlayerById(playerId);
}

export function connectGoogle(playerId: string, googleId: string) {
  const existing = findPlayerByGoogleId(googleId);
  if (existing && existing.playerId !== playerId) {
    throw new Error("Google already linked to another account");
  }
  linkGoogle(playerId, googleId);
  return findPlayerById(playerId);
}
