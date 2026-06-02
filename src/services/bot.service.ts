import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import { db } from "../storage/playersDataBase";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const APP_URL = process.env.TG_APP_URL ?? "https://starflip.io";
const BANNER_URL = `${APP_URL}/assets/game/1.png`;
const SUPPORT_URL = "https://t.me/StarflipSupport";

const DAILY_CAPTION =
  `⭐ *StarFlip* — не забудь забрать ежедневный бонус\\!\n\n` +
  `🎁 \\+30 PTS ждут тебя сегодня\n` +
  `🏆 Твои поинты влияют на токен\\-дроп 2026\n\n` +
  `Заходи и забирай 👇`;

const PLAY_BUTTON: TelegramBot.InlineKeyboardButton[][] = [[
  { text: "🎮 Открыть StarFlip", web_app: { url: APP_URL } },
]];

let bot: TelegramBot | null = null;

export function startBot(): void {
  if (!BOT_TOKEN) {
    console.warn("TELEGRAM_BOT_TOKEN not set — bot disabled");
    return;
  }

  bot = new TelegramBot(BOT_TOKEN, { polling: true });

  // /start — welcome + launch button
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      await bot!.sendPhoto(chatId, BANNER_URL, {
        caption:
          `👋 Добро пожаловать в *StarFlip*\\!\n\n` +
          `Соревнуйся с другими игроками, открывай ячейки и забирай ETH\\.\n` +
          `🏆 Набирай PTS и участвуй в токен\\-дропе 2026\n\n` +
          `Нажми кнопку ниже чтобы начать 👇`,
        parse_mode: "MarkdownV2",
        reply_markup: { inline_keyboard: PLAY_BUTTON },
      });
    } catch (e) {
      console.log(`Bot: /start failed for ${chatId}:`, e);
    }
  });

  // /support — link to support chat
  bot.onText(/\/support/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      await bot!.sendMessage(chatId,
        `🛠 *Поддержка StarFlip*\n\nЗадай вопрос в нашем чате 👇`,
        {
          parse_mode: "MarkdownV2",
          reply_markup: {
            inline_keyboard: [[
              { text: "💬 Открыть поддержку", url: SUPPORT_URL },
            ]],
          },
        },
      );
    } catch (e) {
      console.log(`Bot: /support failed for ${chatId}:`, e);
    }
  });

  // Every day at 12:00 UTC — remind ALL players with a telegram account
  cron.schedule("0 12 * * *", async () => {
    console.log("Bot: sending daily reminders...");

    const players = db.prepare(`
      SELECT telegramId FROM players
      WHERE telegramId IS NOT NULL
    `).all() as { telegramId: string }[];

    console.log(`Bot: ${players.length} players to remind`);

    for (const player of players) {
      try {
        await bot!.sendPhoto(player.telegramId, BANNER_URL, {
          caption: DAILY_CAPTION,
          parse_mode: "MarkdownV2",
          reply_markup: { inline_keyboard: PLAY_BUTTON },
        });
      } catch {
        console.log(`Bot: failed to send to ${player.telegramId} (blocked or deactivated)`);
      }
    }

    console.log("Bot: daily reminders done");
  });

  console.log("Telegram bot started (polling, daily reminder at 12:00 UTC)");
}

export { bot };
