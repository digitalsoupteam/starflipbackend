import jwt from "jsonwebtoken";
import {
  loginOrSignWithGoogle,
  loginOrSignWithTelegram,
} from "./playerSignOrLogin";
import "dotenv/config";
const JWT_SECRET = process.env.JWT_SECRET!;

export function loginWithTelegram(telegramId: string) {
  const player = loginOrSignWithTelegram(telegramId);

  const token = jwt.sign({ playerId: player.playerId }, JWT_SECRET, {
    expiresIn: "20m",
  });

  return { token, player };
}

export function loginWithGoogle(googleId: string) {
  const player = loginOrSignWithGoogle(googleId);

  const token = jwt.sign({ playerId: player.playerId }, JWT_SECRET, {
    expiresIn: "20m",
  });

  return { token, player };
}

export function verifyToken(token: string): { playerId: string } {
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { playerId: string };
    return payload;
  } catch {
    throw new Error("Invalid or expired token");
  }
}

export function refreshToken(playerId: string): string {
  return jwt.sign({ playerId }, JWT_SECRET, { expiresIn: "20m" });
}
