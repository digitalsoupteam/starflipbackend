import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import { db } from "../storage/playersDataBase";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const APP_URL = process.env.TG_APP_URL ?? "https://starflip.io";

let bot: TelegramBot | null = null;

export function startBot(): void {
  if (!BOT_TOKEN) {
    console.warn("TELEGRAM_BOT_TOKEN not set — bot disabled");
    return;
  }

  bot = new TelegramBot(BOT_TOKEN, { polling: false });

  // Every day at 12:00 UTC — remind players who haven't claimed daily bonus
  cron.schedule("0 12 * * *", async () => {
    console.log("Bot: sending daily reminders...");

    const oneDayAgo = Date.now() - 20 * 60 * 60 * 1000; // 20 hours

    const players = db.prepare(`
      SELECT telegramId FROM players
      WHERE telegramId IS NOT NULL
        AND (lastPointsAt IS NULL OR lastPointsAt < ?)
    `).all(oneDayAgo) as { telegramId: string }[];

    console.log(`Bot: ${players.length} players to remind`);

    for (const player of players) {
      try {
        await bot!.sendMessage(
          player.telegramId,
          `⭐ *StarFlip* — не забудь забрать ежедневный бонус!\n\n` +
          `🎁 +30 PTS ждут тебя сегодня\n` +
          `🏆 Твои поинты влияют на токен-дроп 2026\n\n` +
          `Заходи и забирай 👇`,
          {
            parse_mode: "Markdown",
            reply_markup: {
              inline_keyboard: [[
                {
                  text: "🎮 Открыть StarFlip",
                  web_app: { url: APP_URL },
                },
              ]],
            },
          },
        );
      } catch {
        console.log(`Bot: failed to send to ${player.telegramId} (blocked or deactivated)`);
      }
    }

    console.log("Bot: daily reminders done");
  });

  console.log("Telegram bot started (daily reminder at 12:00 UTC)");
}

export { bot };
