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

const corsOptions = {
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);

    console.log("❌ CORS blocked:", origin);
    return cb(new Error("CORS blocked"), false);
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());

/* =========================
   HELPERS
========================= */
const TG_TOKEN = process.env.TG_BOT_TOKEN || "";
const TG_CHAT_ID = process.env.TG_CHAT_ID || "";
const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN || "";

/* =========================
   HEALTH
========================= */
app.get("/", (req, res) => {
  res.send("✅ API is running");
});

app.get("/api/test", (req, res) => {
  res.json({ ok: true });
});

/* =========================
   TELEGRAM
========================= */
async function sendToTelegram({ name, phone, message }) {
  if (!TG_TOKEN || !TG_CHAT_ID) return;

  const text =
    `🧾 New lead\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n` +
    `💬 Message: ${message || "—"}\n` +
    `🌐 Source: landing blck`;

  await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TG_CHAT_ID,
      text,
      disable_web_page_preview: true,
    }),
  });
}

/* =========================
   HUBSPOT
========================= */
async function sendToHubSpot({
  name,
  phone,
  message,
  utm_source,
  utm_medium,
  utm_campaign,
  utm_content,
  utm_term,
}) {
  if (!HUBSPOT_TOKEN) {
    console.warn("⚠️ HubSpot token missing");
    return;
  }

  const [firstname, ...rest] = name.trim().split(" ");
  const lastname = rest.join(" ") || "—";

  const payload = {
    properties: {
      firstname,
      lastname,
      phone,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      lead_source: "Landing page",
    },
  };

  await axios.post("https://api.hubapi.com/crm/v3/objects/contacts", payload, {
    headers: {
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
      "Content-Type": "application/json",
    },
  });
}

/* =========================
   LEAD ENDPOINT
========================= */
app.post("/api/lead", async (req, res) => {
  try {
    const {
      name,
      phone,
      message,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
    } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({
        ok: false,
        error: "name_and_phone_required",
      });
    }

    /* Telegram */
    try {
      await sendToTelegram({ name, phone, message });
    } catch (e) {
      console.error("❌ Telegram error:", e.message);
    }

    /* HubSpot */
    try {
      await sendToHubSpot({
        name,
        phone,
        message,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
      });
    } catch (e) {
      console.error("❌ HubSpot error:", e.response?.data || e.message);
    }

    return res.json({ ok: true });
  } catch (e) {
    console.error("❌ Server error:", e);
    return res.status(500).json({ ok: false });
  }
});

/* =========================
   START
========================= */
const PORT = Number(process.env.PORT) || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
