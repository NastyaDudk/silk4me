import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), "server", ".env"),
});

const app = express();

// ✅ CORS: разрешаем локальный фронт (Vite обычно 5173, у тебя был 8080)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:8080",
];

app.use(
  cors({
    origin: (origin, cb) => {
      // запросы без origin (curl, Postman) — разрешаем
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// ✅ healthcheck
app.get("/", (req, res) => {
  res.send("✅ Silk4me API is running");
});

app.get("/api/test", (req, res) => {
  res.json({ ok: true, message: "Server is alive" });
});

// ⚠️ Важно: порт берём из env, иначе 5050
const PORT = Number(process.env.PORT) || 5050;

// ✅ Утилита: корректно прочитать chat_id
function getChatId() {
  const raw = process.env.TG_CHAT_ID;
  if (!raw) return null;

  // Telegram принимает и число, и строку.
  // Но иногда лучше отправлять как число (особенно для групп -100...)
  const asNumber = Number(raw);
  if (!Number.isNaN(asNumber)) return asNumber;

  return raw; // fallback (например username канала)
}

function getToken() {
  return process.env.TG_BOT_TOKEN || null;
}

// ✅ ТЕСТ: http://localhost:5050/api/test-telegram
app.get("/api/test-telegram", async (req, res) => {
  try {
    const BOT_TOKEN = getToken();
    const CHAT_ID = getChatId();

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

    const data = await tgRes.json().catch(() => ({}));
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

    const BOT_TOKEN = getToken();
    const CHAT_ID = getChatId();

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
      `👤 Ім’я: ${String(name).trim()}\n` +
      `📞 Контакт: ${String(phone).trim()}\n` +
      `💬 Повідомлення: ${String(message || "").trim() || "—"}\n` +
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

    const data = await tgRes.json().catch(() => ({}));

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

app.listen(PORT, () => {
  console.log(`✅ Lead server: http://localhost:${PORT}`);
});