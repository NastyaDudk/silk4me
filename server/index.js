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
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
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
   TELEGRAM (AXIOS!)
========================= */
async function sendToTelegram({ name, phone, message }) {
  if (!TG_TOKEN || !TG_CHAT_ID) return;

  const text =
    `🧾 New lead\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n` +
    `💬 Message: ${message || "—"}\n` +
    `🌐 Source: landing blck`;

  await axios.post(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
    chat_id: TG_CHAT_ID,
    text,
    disable_web_page_preview: true,
  });
}

/* =========================
   HUBSPOT
========================= */
async function sendToHubSpot(data) {
  if (!HUBSPOT_TOKEN) {
    console.warn("⚠️ HubSpot token missing");
    return;
  }

  const [firstname, ...rest] = data.name.trim().split(" ");
  const lastname = rest.join(" ") || "—";

  await axios.post(
    "https://api.hubapi.com/crm/v3/objects/contacts",
    {
      properties: {
        firstname,
        lastname,
        phone: data.phone,
        message: data.message,
        utm_source: data.utm_source,
        utm_medium: data.utm_medium,
        utm_campaign: data.utm_campaign,
        utm_content: data.utm_content,
        utm_term: data.utm_term,
        lead_source: "Landing page blck",
      },
    },
    {
      headers: {
        Authorization: `Bearer ${HUBSPOT_TOKEN}`,
        "Content-Type": "application/json",
      },
    },
  );
}

/* =========================
   LEAD ENDPOINT
========================= */
app.post("/api/lead", async (req, res) => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      ok: false,
      error: "name_and_phone_required",
    });
  }

  try {
    await Promise.all([sendToTelegram(req.body), sendToHubSpot(req.body)]);

    res.json({ ok: true });
  } catch (err) {
    console.error("❌ Lead error:", err.response?.data || err.message);
    res.status(500).json({ ok: false });
  }
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
