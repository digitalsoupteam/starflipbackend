import TelegramBot from "node-telegram-bot-api";
import cron from "node-cron";
import fs from "fs";
import path from "path";
import { db } from "../storage/playersDataBase";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const APP_URL = process.env.TG_APP_URL ?? "https://starflip.io";
const ASSETS_DIR =
  process.env.TG_ASSETS_DIR ?? "/root/starflip-front/public/assets/game";
const SUPPORT_URL = "https://t.me/StarflipSupport";
const DAY_MS = 24 * 60 * 60 * 1000;
const COMMUNITY_ANCHOR_DAY_UTC =
  process.env.COMMUNITY_ANCHOR_DAY_UTC ?? "2026-06-17";

function botPhoto(fileName: string): string {
  const localPath = path.join(ASSETS_DIR, fileName);
  if (fs.existsSync(localPath)) return localPath;
  return `${APP_URL}/assets/game/${fileName}`;
}

function shouldSendCommunityToday(now = new Date()): boolean {
  const anchor = Date.parse(`${COMMUNITY_ANCHOR_DAY_UTC}T00:00:00.000Z`);
  if (Number.isNaN(anchor)) {
    console.warn(
      `Invalid COMMUNITY_ANCHOR_DAY_UTC=${COMMUNITY_ANCHOR_DAY_UTC}; community reminder disabled`,
    );
    return false;
  }

  const today = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
  );
  const daysSinceAnchor = Math.floor((today - anchor) / DAY_MS);

  return daysSinceAnchor >= 0 && daysSinceAnchor % 2 === 0;
}

const BANNER_PHOTO = botPhoto("1.png");
const DAILY_BANNER_PHOTO = botPhoto("2.png");
const COMMUNITY_BANNER_PHOTO = botPhoto("astra-wow.jpg");
const MORNING_BANNER_PHOTO = botPhoto("morning-astra.jpg");
const INACTIVE_BANNER_PHOTO = botPhoto("astra-24.jpg");

const DAILY_CAPTION =
  `⭐ *StarFlip* — DAILY BONUS\\!\n\n` +
  `🎁 \\+30 PTS await you today\n` +
  `🏆 Your points affect your chances of receiving an airdrop
\n\n` +
  `Play, earn USDT, collect PTS, and farm for drop👇`;

const PLAY_BUTTON: TelegramBot.InlineKeyboardButton[][] = [
  [{ text: "🎮 OPEN StarFlip", web_app: { url: APP_URL } }],
];

let bot: TelegramBot | null = null;

export function startBot(): void {
  if (!BOT_TOKEN || BOT_TOKEN === "disabled") {
    console.warn("TELEGRAM_BOT_TOKEN not set — bot disabled");
    return;
  }

  bot = new TelegramBot(BOT_TOKEN, { polling: true });

  // /start — welcome + launch button
  bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      await bot!.sendPhoto(chatId, BANNER_PHOTO, {
        caption:
          `👋 Welcome to *StarFlip*\\!\n\n` +
          `Compete against other players for USDT\\.\n` +
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

  // Every day at 10:00 UTC / 13:00 MSK — morning reminder
  cron.schedule("0 10 * * *", async () => {
    console.log("Bot: sending morning reminders...");

    const players = db
      .prepare(`SELECT telegramId FROM players WHERE telegramId IS NOT NULL`)
      .all() as { telegramId: string }[];

    for (const player of players) {
      try {
        await bot!.sendPhoto(player.telegramId, MORNING_BANNER_PHOTO, {
          caption:
            `☀️ A new day has started!\n\n` +
            `Don't skip your games — jump in, play a couple of rounds and grab those precious PTS 🏆\n\n` +
            `Every game counts toward your airdrop 👇`,
          reply_markup: { inline_keyboard: PLAY_BUTTON },
        });
      } catch {
        console.log(`Bot: morning reminder failed for ${player.telegramId}`);
      }
    }

    console.log("Bot: morning reminders done");
  });

  // Every day at 18:00 UTC — inactive players (no game in last 24h)
  cron.schedule("0 18 * * *", async () => {
    console.log("Bot: sending inactive player reminders...");

    const threshold = Date.now() - 24 * 60 * 60 * 1000;
    const players = db
      .prepare(
        `SELECT telegramId FROM players
         WHERE telegramId IS NOT NULL
           AND lastGameAt > 0
           AND lastGameAt < ?`,
      )
      .all(threshold) as { telegramId: string }[];

    console.log(`Bot: ${players.length} inactive players to remind`);

    for (const player of players) {
      try {
        await bot!.sendPhoto(player.telegramId, INACTIVE_BANNER_PHOTO, {
          caption:
            `⏰ It's been a while!\n\n` +
            `PTS are best collected now — so you can celebrate later.\n` +
            `Don't lose your momentum, play a couple of games today 🎮\n\n` +
            `Your airdrop share depends on it 👇`,
          reply_markup: { inline_keyboard: PLAY_BUTTON },
        });
      } catch {
        console.log(`Bot: inactive reminder failed for ${player.telegramId}`);
      }
    }

    console.log("Bot: inactive reminders done");
  });

  // Every other day at 17:00 UTC — community message
  cron.schedule("0 17 * * *", async () => {
    if (!shouldSendCommunityToday()) {
      console.log("Bot: skipping community reminders today");
      return;
    }

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
      `If you've got a friend who'd enjoy a game like this — share your referral link. It helps you earn PTS + 50% of their service fee in USDT, and helps us grow with a community we can trust 🙏\n\n` +
      `🎮 Play: @StarFlipGamebot`;

    for (const player of players) {
      try {
        await bot!.sendPhoto(player.telegramId, COMMUNITY_BANNER_PHOTO, {
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
        await bot!.sendPhoto(player.telegramId, DAILY_BANNER_PHOTO, {
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

  console.log("Telegram bot started (morning 10:00 UTC / 13:00 MSK, inactive 18:00, community 17:00, PTS 21:00 UTC)");
}

export { bot };
