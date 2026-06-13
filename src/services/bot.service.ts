import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import { db } from "../storage/playersDataBase";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const APP_URL = process.env.TG_APP_URL ?? "https://starflip.io";
const BANNER_URL = `${APP_URL}/assets/game/1.png`;
const DAILY_BANNER_URL = `${APP_URL}/assets/game/2.png`;
const COMMUNITY_BANNER_URL = `${APP_URL}/assets/game/astra-wow.jpg`;
const SUPPORT_URL = "https://t.me/StarflipSupport";

const DAILY_CAPTION =
  `⭐ *StarFlip* — DAILY BOUNS\\!\n\n` +
  `🎁 \\+30 PTS wait for you today\n` +
  `🏆 Your points affect your chances of receiving an airdrop
\n\n` +
  `Play, earn ETH, collect PTS, and farm for drop👇`;

const PLAY_BUTTON: TelegramBot.InlineKeyboardButton[][] = [
  [{ text: "🎮 OPEN StarFlip", web_app: { url: APP_URL } }],
];

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
          `👋 Welcome to *StarFlip*\\!\n\n` +
          `Compete against other players for ETH\\.\n` +
          `🏆 Earn PTS and take part in platform's token airdrop\n\n` +
          `Click the button below to get started 👇`,

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
      await bot!.sendMessage(
        chatId,
        `🛠 *Поддержка StarFlip*\n\nЗадай вопрос в нашем чате 👇`,
        {
          parse_mode: "MarkdownV2",
          reply_markup: {
            inline_keyboard: [
              [{ text: "💬 Открыть поддержку", url: SUPPORT_URL }],
            ],
          },
        },
      );
    } catch (e) {
      console.log(`Bot: /support failed for ${chatId}:`, e);
    }
  });

  // Every day at 17:00 UTC — community message
  cron.schedule("0 17 * * *", async () => {
    console.log("Bot: sending community reminders...");

    const players = db
      .prepare(`SELECT telegramId FROM players WHERE telegramId IS NOT NULL`)
      .all() as { telegramId: string }[];

    const caption =
      `👋 Hey there!\n\n` +
      `If you're enjoying StarFlip — join our community:\n` +
      `📢 Channel — get updates first: t.me/StarFlipNews\n` +
      `💬 Players chat — share your experience: https://t.me/+sSD3YAOnzsE4MmEy\n` +
      `🛟 Support — if something's not working: @StarflipSupport\n\n` +
      `We genuinely read everything you write and try to make the game better with every update.\n\n` +
      `If you've got a friend who'd enjoy a game like this — share your referral link. It helps you (PTS + a cut of their games) and helps us grow with a community we can trust 🙏\n\n` +
      `🎮 Play: @StarFlipGamebot`;

    for (const player of players) {
      try {
        await bot!.sendPhoto(player.telegramId, COMMUNITY_BANNER_URL, {
          caption,
          reply_markup: { inline_keyboard: PLAY_BUTTON },
        });
      } catch {
        console.log(`Bot: community message failed for ${player.telegramId}`);
      }
    }

    console.log("Bot: community reminders done");
  });

  // Every day at 21:00 UTC — daily PTS reminder
  cron.schedule("0 21 * * *", async () => {
    console.log("Bot: sending daily PTS reminders...");

    const players = db
      .prepare(`SELECT telegramId FROM players WHERE telegramId IS NOT NULL`)
      .all() as { telegramId: string }[];

    console.log(`Bot: ${players.length} players to remind`);

    for (const player of players) {
      try {
        await bot!.sendPhoto(player.telegramId, DAILY_BANNER_URL, {
          caption: DAILY_CAPTION,
          parse_mode: "MarkdownV2",
          reply_markup: { inline_keyboard: PLAY_BUTTON },
        });
      } catch {
        console.log(`Bot: failed to send to ${player.telegramId} (blocked or deactivated)`);
      }
    }

    console.log("Bot: daily PTS reminders done");
  });

  console.log("Telegram bot started (polling, community at 17:00 UTC, PTS reminder at 21:00 UTC)");
}

export { bot };
