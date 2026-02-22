import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

/* =========================
   MIDDLEWARE
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
   ENV
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
  if (!TG_TOKEN || !TG_CHAT_ID) {
    console.error("❌ Telegram ENV missing");
    return;
  }

  await axios.post(
    `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
    {
      chat_id: TG_CHAT_ID, // ❗️СТРОКОЙ, НЕ NUMBER
      text:
        `🧾 New lead\n` +
        `👤 Name: ${name}\n` +
        `📧 Email: ${email}\n` +
        `📞 Phone: ${phone}\n` +
        `💬 Message: ${message || "—"}\n` +
        `🌐 Source: Landing BLCK`,
    },
    { timeout: 5000 },
  );

  console.log("✅ Telegram sent:", email);
}

/* =========================
   HUBSPOT (UPSERT by email)
========================= */
async function sendToHubSpot({ name, email, phone, message }) {
  if (!HUBSPOT_TOKEN) {
    console.error("❌ HUBSPOT_TOKEN missing");
    return;
  }

  if (!email) {
    console.error("❌ Email missing → HubSpot skipped");
    return;
  }

  const [firstname, ...rest] = name.trim().split(" ");
  const lastname = rest.join(" ") || "";

  try {
    const res = await axios.put(
      "https://api.hubapi.com/crm/v3/objects/contacts/id/email",
      {
        properties: {
          email,
          firstname,
          lastname,
          phone,
          lifecyclestage: "lead",
          lead_source: "Landing BLCK",
          message: message || "",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      },
    );

    console.log("✅ HubSpot contact UPSERTED:", res.data.id);
  } catch (err) {
    console.error(
      "❌ HubSpot ERROR:",
      err.response?.status,
      JSON.stringify(err.response?.data, null, 2),
    );
  }
}
/* =========================
   LEAD ENDPOINT
========================= */
app.post("/api/lead", (req, res) => {
  const { name, email, phone, message } = req.body || {};

  console.log("📩 Lead received:", email);

  if (!name || !email || !phone) {
    return res.status(400).json({ ok: false });
  }

  // ⚡ МГНОВЕННЫЙ ОТВЕТ ФРОНТУ
  res.json({ ok: true });

  // 🔥 ФОНОВЫЕ ЗАДАЧИ
  sendToTelegram({ name, email, phone, message }).catch((e) =>
    console.error("TG error:", e.message),
  );

  sendToHubSpot({ name, email, phone, message }).catch((e) =>
    console.error("HS error:", e.message),
  );
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
