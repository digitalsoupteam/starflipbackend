import { Router } from "express";
import { loginWithTelegram, loginWithGoogle } from "../../utils/auth/auth";

export const authRouter = Router();

function buildTmaInviteLink(inviteCode: string): string {
  const bot = process.env.TG_BOT_USERNAME ?? "StarFlipBot";
  const app = process.env.TG_APP_NAME ?? "StarFlipApp";
  return `https://t.me/${bot}/${app}?startapp=ref_${inviteCode}`;
}

function buildWebInviteLink(inviteCode: string): string {
  const base = process.env.WEB_BASE_URL ?? "http://localhost:3001";
  return `${base}?ref=ref_${inviteCode}`;
}

authRouter.post("/telegram", async (req, res) => {
  try {
    const { telegramId, referralCode } = req.body;
    if (!telegramId) {
      return res.status(400).json({ error: "telegramId is required" });
    }

    const { token, player } = loginWithTelegram(telegramId, referralCode);

    res.json({
      token,
      player: {
        playerId: player.playerId,
        games: player.games,
        wins: player.wins,
        points: player.points,
        balance: player.playerBalance,
        inviteCode: player.inviteCode ?? null,
        inviteLink: player.inviteCode ? buildTmaInviteLink(player.inviteCode) : null,
        referrerId: player.referrerId ?? null,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.post("/google", async (req, res) => {
  try {
    const { googleId, referralCode } = req.body;
    if (!googleId) {
      return res.status(400).json({ error: "googleId is required" });
    }

    const { token, player } = loginWithGoogle(googleId, referralCode);

    res.json({
      token,
      player: {
        playerId: player.playerId,
        games: player.games,
        wins: player.wins,
        points: player.points,
        balance: player.playerBalance,
        inviteCode: player.inviteCode ?? null,
        inviteLink: player.inviteCode ? buildWebInviteLink(player.inviteCode) : null,
        referrerId: player.referrerId ?? null,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
