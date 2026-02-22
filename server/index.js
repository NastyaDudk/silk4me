import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

/* =========================
   CONFIG
========================= */
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://nastyadudk.github.io",
      "https://nastyadudk.github.io/silk4me",
    ],
  }),
);

/* =========================
   ENV (Render / Local)
========================= */
const TG_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;
const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;

/* =========================
   HEALTH
========================= */
app.get("/", (_, res) => res.send("✅ API running"));
app.get("/api/test", (_, res) => res.json({ ok: true }));

/* =========================
   TELEGRAM
========================= */
async function sendToTelegram({ name, email, phone, message }) {
  if (!TG_TOKEN || !TG_CHAT_ID) return;

  await axios.post(
    `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
    {
      chat_id: TG_CHAT_ID,
      text:
        `🧾 New lead\n` +
        `👤 ${name}\n` +
        `📧 ${email}\n` +
        `📞 ${phone}\n` +
        `💬 ${message || "—"}`,
    },
    { timeout: 5000 },
  );
}

/* =========================
   HUBSPOT (UPSERT)
========================= */
async function sendToHubSpot({ name, email, phone }) {
  if (!HUBSPOT_TOKEN || !email) return;

  const [firstname, ...rest] = name.trim().split(" ");
  const lastname = rest.join(" ");

  await axios.post(
    "https://api.hubapi.com/crm/v3/objects/contacts",
    {
      properties: {
        email,
        firstname,
        lastname,
        phone,
        lifecyclestage: "lead",
        lead_source: "Landing BLCK",
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

  // ✅ МГНОВЕННЫЙ ОТВЕТ
  res.json({ ok: true });

  // 🔥 ФОН
  sendToTelegram({ name, email, phone, message }).catch(console.error);
  sendToHubSpot({ name, email, phone }).catch(console.error);
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
