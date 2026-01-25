require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");

const BOT_TOKEN = process.env.TG_BOT_TOKEN;
const GROUP_CHAT_ID = process.env.TG_CHAT_ID;

if (!BOT_TOKEN) {
  console.error("❌ TG_BOT_TOKEN missing in .env");
  process.exit(1);
}

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
console.log("🤖 Silk4me bot started");

const sessions = new Map();

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  sessions.set(chatId, { step: "name" });

  bot.sendMessage(chatId, "Вітаємо в Silk4me 🤍\n\nЯк вас звати?");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = (msg.text || "").trim();
  if (!text || text === "/start") return;

  const s = sessions.get(chatId);
  if (!s) return;

  if (s.step === "name") {
    s.name = text;
    s.step = "phone";
    return bot.sendMessage(chatId, "Дякую 🌿\nВкажіть номер телефону:");
  }

  if (s.step === "phone") {
    s.phone = text;
    s.step = "message";
    return bot.sendMessage(chatId, "Напишіть, що саме вас цікавить:");
  }

  if (s.step === "message") {
    s.message = text;

    await bot.sendMessage(
      chatId,
      "✅ Дякуємо! Заявку отримано. Ми з вами звʼяжемося 🤍"
    );

    if (GROUP_CHAT_ID) {
      const lead =
        `🧾 Нова заявка (Telegram бот)\n` +
        `👤 Імʼя: ${s.name}\n` +
        `📞 Телефон: ${s.phone}\n` +
        `💬 Повідомлення: ${s.message}`;

      try {
        await bot.sendMessage(GROUP_CHAT_ID, lead);
      } catch (e) {
        console.error("❌ Cannot send to group", e);
      }
    }

    sessions.delete(chatId);
  }
});
