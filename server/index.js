import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import axios from "axios";

const app = express();

/* =========================
   ENV
========================= */
dotenv.config({
  path: path.resolve(process.cwd(), "server", ".env"),
});

/* =========================
   CORS
========================= */
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://nastyadudk.github.io",
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error("CORS blocked"), false);
    },
  }),
);

app.use(express.json());

/* =========================
   ENV VARS
========================= */
const TG_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;
const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;

/* =========================
   HEALTH
========================= */
app.get("/", (_, res) => res.send("✅ API is running"));
app.get("/api/test", (_, res) => res.json({ ok: true }));

/* =========================
   TELEGRAM
========================= */
async function sendToTelegram({ name, email, phone, message }) {
  if (!TG_TOKEN || !TG_CHAT_ID) return;

  const text =
    `🧾 New lead\n` +
    `👤 Name: ${name}\n` +
    `📧 Email: ${email}\n` +
    `📞 Phone: ${phone}\n` +
    `💬 Message: ${message || "—"}\n` +
    `🌐 Source: лендінг blck`;

  await axios.post(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    chat_id: TG_CHAT_ID,
    text,
    disable_web_page_preview: true,
  });
}

/* =========================
   HUBSPOT (CREATE OR UPDATE)
========================= */
async function sendToHubSpot(data) {
  if (!HUBSPOT_TOKEN) {
    console.warn("⚠️ HubSpot token missing");
    return;
  }

  if (!data.email) {
    console.warn("⚠️ Email missing → HubSpot skipped");
    return;
  }

  const [firstname, ...rest] = data.name.trim().split(" ");
  const lastname = rest.join(" ") || "";

  try {
    const response = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/contacts?idProperty=email",
      {
        properties: {
          email: data.email,
          firstname,
          lastname,
          phone: data.phone,
          lifecyclestage: "lead",
          lead_source: "лендінг BLCK",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("✅ HubSpot contact saved:", response.data.id);
  } catch (err) {
    console.error(
      "❌ HubSpot error:",
      err.response?.status,
      err.response?.data || err.message,
    );
  }
}

/* =========================
   LEAD ENDPOINT
========================= */
app.post("/api/lead", async (req, res) => {
  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !phone) {
    return res.status(400).json({
      ok: false,
      error: "name_email_phone_required",
    });
  }

  // ✅ СРАЗУ отвечаем пользователю
  res.json({ ok: true });

  // 🔥 всё ниже — в фоне, не блокирует UI
  sendToTelegram({ name, email, phone, message }).catch((err) =>
    console.error("❌ Telegram error:", err.response?.data || err.message),
  );

  sendToHubSpot({ name, email, phone, message }).catch((err) =>
    console.error("❌ HubSpot error:", err.response?.data || err.message),
  );
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
