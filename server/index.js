import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

/* =========================
   BASIC MIDDLEWARE
========================= */
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://nastyadudk.github.io",
      "https://nastyadudk.github.io/silk4me",
      "https://re-silk.silk4.me",
    ],
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);

// ⬅️ ВАЖЛИВО: один-єдиний options
app.options("/api/lead", cors());

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

/* =========================
   LEAD
========================= */
app.post("/api/lead", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    // ✅ ВАЖЛИВО: відповідаємо фронту ОДРАЗУ
    res.status(200).json({ ok: true });

    /* ---------- Telegram ---------- */
    if (TG_TOKEN && TG_CHAT_ID) {
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

    /* ---------- HubSpot ---------- */
    if (HUBSPOT_TOKEN) {
      const [firstname, ...rest] = name.split(" ");
      const lastname = rest.join(" ");

      await axios.post(
        "https://api.hubapi.com/crm/v3/objects/contacts?idProperty=email",
        {
          properties: {
            email,
            firstname,
            lastname,
            phone,
            lifecyclestage: "lead",
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
  } catch (err) {
    console.error("❌ Lead error:", err.message);
  }
});

/* =========================
   START
========================= */
const PORT = 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
