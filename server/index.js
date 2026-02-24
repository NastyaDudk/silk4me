import express from "express";
import axios from "axios";

const app = express();
app.set("trust proxy", 1);

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

// 🔥 ЯВНЫЙ CORS + OPTIONS (БЕЗ cors-пакета)
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://nastyadudk.github.io",
    "https://nastyadudk.github.io/silk4me",
    "https://re-silk.silk4.me",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");

  // 🔥 PRE-FLIGHT
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

/* =========================
   ENV
========================= */
const TG_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;
const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;

/* =========================
   HEALTH
========================= */
app.get("/", (_, res) => {
  res.send("✅ API running");
});

app.get("/api/test", (_, res) => {
  res.json({ ok: true });
});

/* =========================
   TELEGRAM
========================= */
async function sendToTelegram({ name, email, phone, message }) {
  if (!TG_TOKEN || !TG_CHAT_ID) {
    console.warn("Telegram ENV missing");
    return;
  }

  await axios.post(
    `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
    {
      chat_id: TG_CHAT_ID,
      text:
        `🧾 New lead\n` +
        `👤 Name: ${name}\n` +
        `📧 Email: ${email}\n` +
        `📞 Phone: ${phone}\n` +
        `💬 Message: ${message || "—"}`,
    },
    { timeout: 5000 },
  );
}

/* =========================
   HUBSPOT
========================= */
async function sendToHubSpot({ name, email, phone, message }) {
  if (!HUBSPOT_TOKEN) {
    console.warn("HubSpot token missing");
    return;
  }

  const [firstname, ...rest] = name.trim().split(" ");
  const lastname = rest.join(" ") || "";

  await axios.post(
    "https://api.hubapi.com/crm/v3/objects/contacts?idProperty=email",
    {
      properties: {
        email,
        firstname,
        lastname,
        phone,
        lifecyclestage: "lead",
        message: message || "",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${HUBSPOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      timeout: 5000,
    },
  );
}

/* =========================
   LEAD ENDPOINT
========================= */
app.post("/api/lead", (req, res) => {
  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({ ok: false });
  }

  // ⚡ СРАЗУ отвечаем фронту
  res.json({ ok: true });

  // 🔥 фон
  sendToTelegram({ name, email, phone, message }).catch(() => {});
  sendToHubSpot({ name, email, phone, message }).catch(() => {});
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
