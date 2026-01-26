import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

const app = express();

/**
 * ✅ dotenv:
 * - Локально: читаем server/.env (если файл есть)
 * - На Render: переменные берутся из Environment Variables, dotenv не мешает
 */
dotenv.config({
  path: path.resolve(process.cwd(), "server", ".env"),
});

/**
 * ✅ CORS:
 * Разрешаем:
 * - локалка (Vite 5173)
 * - GitHub Pages домен
 */
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://nastyadudk.github.io",
];

app.use(
  cors({
    origin: (origin, cb) => {
      // запросы без Origin (curl/postman) — разрешаем
      if (!origin) return cb(null, true);

      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);

      // полезно видеть в логах Render, что именно блокируется
      console.log("❌ CORS blocked origin:", origin);
      return cb(new Error(`CORS blocked: ${origin}`), false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ обязательно для preflight (OPTIONS)
app.options("*", cors());

app.use(express.json());

/** ✅ helpers */
function getToken() {
  return process.env.TG_BOT_TOKEN || "";
}

function getChatId() {
  const raw = process.env.TG_CHAT_ID;
  if (!raw) return "";

  // chat_id может быть "-100..." (канал/группа) — это нормально
  // Telegram API принимает как number, так и string
  const n = Number(raw);
  return Number.isNaN(n) ? raw : n;
}

/** ✅ health */
app.get("/", (req, res) => {
  res.send("✅ Silk4me API is running");
});

app.get("/api/test", (req, res) => {
  res.json({ ok: true, message: "Server is alive" });
});

/** ✅ test telegram: GET /api/test-telegram */
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

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
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

/** ✅ lead: POST /api/lead */
app.post("/api/lead", async (req, res) => {
  try {
    const { name, phone, message } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ ok: false, error: "name_and_phone_required" });
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

    const tgRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
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

const PORT = Number(process.env.PORT) || 5050;
app.listen(PORT, () => {
  console.log(`✅ Lead server: http://localhost:${PORT}`);
});