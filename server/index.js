import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

/* =========================
   BASIC
========================= */
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://nastyadudk.github.io",
    ],
  }),
);

/* =========================
   ENV
========================= */
const TG_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID_RAW = process.env.TG_CHAT_ID;
const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;

// 🔥 ВАЖНО
const TG_CHAT_ID =
  TG_CHAT_ID_RAW && !Number.isNaN(Number(TG_CHAT_ID_RAW))
    ? Number(TG_CHAT_ID_RAW)
    : TG_CHAT_ID_RAW;

/* =========================
   HEALTH
========================= */
app.get("/", (_, res) => res.send("✅ API running"));
app.get("/api/test", (_, res) => res.json({ ok: true }));

/* =========================
   TELEGRAM
========================= */
async function sendToTelegram(data) {
  if (!TG_TOKEN || !TG_CHAT_ID) {
    console.error("❌ Telegram ENV missing", {
      TG_TOKEN: !!TG_TOKEN,
      TG_CHAT_ID,
    });
    return;
  }

  console.log("➡️ Sending to Telegram:", data.email);

  const res = await axios.post(
    `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
    {
      chat_id: TG_CHAT_ID,
      text:
        `🧾 New lead\n` +
        `👤 ${data.name}\n` +
        `📧 ${data.email}\n` +
        `📞 ${data.phone}\n` +
        `💬 ${data.message || "—"}\n` +
        `🌐 Джерело: Landing BLCK`,
    },
    { timeout: 5000 },
  );

  console.log("✅ Telegram sent:", res.data.ok);
}

/* =========================
   HUBSPOT
========================= */
async function sendToHubSpot({ name, email, phone }) {
  if (!HUBSPOT_TOKEN || !email) {
    console.warn("⚠️ HubSpot skipped: token or email missing");
    return;
  }

  const [firstname, ...rest] = name.trim().split(" ");
  const lastname = rest.join(" ") || "";

  try {
    const res = await axios.post(
      "https://api.hubapi.com/crm/v3/objects/contacts?idProperty=email",
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

    console.log("✅ HubSpot OK:", res.data.id);
  } catch (err) {
    console.error(
      "❌ HubSpot ERROR:",
      err.response?.status,
      err.response?.data || err.message,
    );
  }
}

/* =========================
   LEAD
========================= */
app.post("/api/lead", (req, res) => {
  const { name, email, phone, message } = req.body || {};

  console.log("📩 Lead received:", email);

  if (!name || !email || !phone) {
    console.error("❌ Validation failed", req.body);
    return res.status(400).json({ ok: false });
  }

  // ✅ UI — МГНОВЕННО
  res.json({ ok: true });

  // 🔥 ФОН
  sendToTelegram({ name, email, phone, message }).catch((e) =>
    console.error("❌ Telegram error:", e.response?.data || e.message),
  );

  sendToHubSpot({ name, email, phone }).catch((e) =>
    console.error("❌ HubSpot error:", e.response?.data || e.message),
  );
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
