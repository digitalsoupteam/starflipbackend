import { Router } from "express";
import { loginWithTelegram, loginWithGoogle } from "../../utils/auth/auth";

export const authRouter = Router();

/* ===== TELEGRAM LOGIN ===== */
authRouter.post("/telegram", async (req, res) => {
  try {
    const { telegramId } = req.body;
    if (!telegramId) {
      return res.status(400).json({ error: "telegramId is required" });
    }

    const { token, player } = loginWithTelegram(telegramId);

    res.json({
      token,
      player: {
        playerId: player.playerId,
        games: player.games,
        wins: player.wins,
        points: player.points,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

/* ===== GOOGLE LOGIN ===== */
authRouter.post("/google", async (req, res) => {
  try {
    const { googleId } = req.body;
    if (!googleId) {
      return res.status(400).json({ error: "googleId is required" });
    }

    const { token, player } = loginWithGoogle(googleId);

    res.json({
      token,
      player: {
        playerId: player.playerId,
        games: player.games,
        wins: player.wins,
        points: player.points,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});