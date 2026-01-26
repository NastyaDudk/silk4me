// server/bot.cjs
const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");
const TelegramBot = require("node-telegram-bot-api");

/**
 * ✅ Подхватываем env:
 * - если запускаешь из корня: node server/bot.cjs  -> ищем ./server/.env
 * - если запускаешь из папки server: node bot.cjs  -> ищем ./.env
 */
function loadEnv() {
  const candidates = [
    path.resolve(process.cwd(), "server", ".env"),
    path.resolve(process.cwd(), ".env"),
  ];

  const envPath = candidates.find((p) => fs.existsSync(p));
  if (!envPath) {
    console.warn("⚠️ .env не знайдено (шукав):", candidates);
    dotenv.config(); // на всякий случай
    return;
  }

  dotenv.config({ path: envPath });
  console.log("✅ dotenv loaded:", envPath);
}

loadEnv();

const BOT_TOKEN = process.env.TG_BOT_TOKEN;
const GROUP_CHAT_ID = process.env.TG_CHAT_ID; // может быть "" — это ок

console.log("TG_BOT_TOKEN exists:", !!BOT_TOKEN);
console.log("TG_CHAT_ID exists:", !!GROUP_CHAT_ID);

if (!BOT_TOKEN) {
  console.error("❌ TG_BOT_TOKEN missing in .env");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
console.log("🤖 Silk4me bot started (polling)");

/** Сессии */
const sessions = new Map();

function isPrivateChat(msg) {
  return msg?.chat?.type === "private";
}

function normalizePhone(text) {
  return String(text || "")
    .replace(/[^\d+]/g, "")
    .trim();
}

function startFlow(chatId) {
  sessions.set(chatId, { step: "name" });

  bot.sendMessage(
    chatId,
    "Вітаємо в Silk4me 🤍\n\nЩоб оформити заявку, відповідайте на кілька питань.\n\nЯк вас звати?",
    {
      reply_markup: {
        keyboard: [[{ text: "Скасувати ❌" }]],
        resize_keyboard: true,
        one_time_keyboard: false,
      },
    }
  );
}

async function sendLeadToGroup(leadText) {
  if (!GROUP_CHAT_ID) return;

  try {
    await bot.sendMessage(GROUP_CHAT_ID, leadText, {
      disable_web_page_preview: true,
    });
  } catch (e) {
    console.error("❌ Cannot send to group/chat_id:", GROUP_CHAT_ID, e?.message || e);
  }
}

/** /start */
bot.onText(/\/start/, (msg) => {
  if (!isPrivateChat(msg)) return;
  startFlow(msg.chat.id);
});

/** /cancel */
bot.onText(/\/cancel/, (msg) => {
  if (!isPrivateChat(msg)) return;
  const chatId = msg.chat.id;
  sessions.delete(chatId);
  bot.sendMessage(chatId, "Ок, скасовано. Напишіть /start щоб почати знову.");
});

/** Любое сообщение */
bot.on("message", async (msg) => {
  // работаем только в ЛС, иначе группа будет ломать логику
  if (!isPrivateChat(msg)) return;

  const chatId = msg.chat.id;

  // кнопка "Скасувати"
  const rawText = (msg.text || "").trim();
  if (rawText === "Скасувати ❌") {
    sessions.delete(chatId);
    await bot.sendMessage(chatId, "Скасовано ✅\nНапишіть /start щоб почати знову.");
    return;
  }

  // если пользователь просто нажал Start в Telegram (без /start)
  // иногда Telegram присылает "start" / пустое — страхуемся:
  if (rawText.toLowerCase() === "start" && !sessions.get(chatId)) {
    startFlow(chatId);
    return;
  }

  // пропускаем сам /start
  if (rawText === "/start") return;

  const s = sessions.get(chatId);
  if (!s) return; // нет активной анкеты — молчим

  // шаг 1: имя
  if (s.step === "name") {
    s.name = rawText;
    s.step = "phone";

    await bot.sendMessage(chatId, "Дякую 🌿\nВкажіть номер телефону:", {
      reply_markup: {
        keyboard: [
          [{ text: "Поділитися контактом 📲", request_contact: true }],
          [{ text: "Скасувати ❌" }],
        ],
        resize_keyboard: true,
      },
    });
    return;
  }

  // шаг 2: телефон (может прийти contact)
  if (s.step === "phone") {
    const phoneFromContact = msg.contact?.phone_number;
    const phoneText = phoneFromContact ? phoneFromContact : rawText;
    const phone = normalizePhone(phoneText);

    if (!phone || phone.length < 8) {
      await bot.sendMessage(chatId, "Не схоже на номер телефону 😅\nСпробуйте ще раз:");
      return;
    }

    s.phone = phone;
    s.step = "message";

    await bot.sendMessage(
      chatId,
      "Супер ✅\nКоротко напишіть, що саме вас цікавить (розмір / модель / терміни доставки):",
      {
        reply_markup: {
          keyboard: [[{ text: "Скасувати ❌" }]],
          resize_keyboard: true,
        },
      }
    );
    return;
  }

  // шаг 3: сообщение
  if (s.step === "message") {
    s.message = rawText || "—";

    await bot.sendMessage(
      chatId,
      "✅ Дякуємо! Заявку отримано.\nМи звʼяжемося з вами найближчим часом 🤍",
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );

    const lead =
      `🧾 Нова заявка (Telegram бот)\n` +
      `👤 Імʼя: ${s.name}\n` +
      `📞 Телефон: ${s.phone}\n` +
      `💬 Повідомлення: ${s.message}`;

    await sendLeadToGroup(lead);
    sessions.delete(chatId);
  }
});

/** Логи ошибок polling */
bot.on("polling_error", (err) => {
  console.error("polling_error:", err?.message || err);
});
