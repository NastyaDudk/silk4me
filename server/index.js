import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Если фронт на другом порту (например Vite 5173), можно ограничить origin:
// origin: ["http://localhost:5173", "http://localhost:8080"]
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

const PORT = Number(process.env.PORT) || 0;

// ✅ ТЕСТ: открой в браузере http://localhost:5050/api/test-telegram
app.get("/api/test-telegram", async (req, res) => {
  try {
    const BOT_TOKEN = process.env.TG_BOT_TOKEN;
    const CHAT_ID = process.env.TG_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({
        ok: false,
        error: "missing_env",
        hasToken: !!BOT_TOKEN,
        hasChatId: !!CHAT_ID,
      });
    }

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: "✅ TEST: Telegram connected",
        disable_web_page_preview: true,
      }),
    });

    const data = await tgRes.json();
    return res.status(tgRes.ok ? 200 : 500).json(data);
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
});

// ✅ ОСНОВНОЙ: форма отправляет сюда
app.post("/api/lead", async (req, res) => {
  try {
    const { name, phone, message } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({
        ok: false,
        error: "name_and_phone_required",
      });
    }

    const BOT_TOKEN = process.env.TG_BOT_TOKEN;
    const CHAT_ID = process.env.TG_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(500).json({
        ok: false,
        error: "missing_env",
        hasToken: !!BOT_TOKEN,
        hasChatId: !!CHAT_ID,
      });
    }

    const text =
      `🧾 Нова заявка Silk4me\n` +
      `👤 Ім’я: ${name}\n` +
      `📞 Контакт: ${phone}\n` +
      `💬 Повідомлення: ${message?.trim() ? message : "—"}\n` +
      `🌐 Джерело: лендинг`;

    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const tgRes = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        disable_web_page_preview: true,
      }),
    });

    const data = await tgRes.json();

    if (!tgRes.ok || !data.ok) {
      return res.status(500).json({
        ok: false,
        error: "telegram_error",
        details: data,
      });
    }

    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: String(e) });
  }
});

// // Корневой маршрут — чтобы не видеть “пусто”
// app.get("/", (req, res) => {
//   res.send(
//     "✅ Silk4me server is running. Use /api/test-telegram or POST /api/lead"
//   );
// });

app.listen(PORT, () => {
  console.log(`✅ Lead server: http://localhost:${PORT}`);
});
