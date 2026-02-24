import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

/* =========================
   CORS
========================= */
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://nastyadudk.github.io",
  "https://nastyadudk.github.io/silk4me",
  "https://re-silk.silk4.me",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS blocked"));
    },
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

/* =========================
   BODY
========================= */
app.use(express.json());

/* =========================
   HEALTH
========================= */
app.get("/", (_, res) => res.send("API OK"));

/* =========================
   ENV
========================= */
const TG_TOKEN = process.env.TG_BOT_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;
const HUBSPOT_TOKEN = process.env.HUBSPOT_TOKEN;

/* =========================
   LEAD
========================= */
app.post("/api/lead", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body || {};

    if (!name || !email || !phone) {
      return res.status(400).json({ ok: false });
    }

    // 🔥 ответ СРАЗУ
    res.status(200).json({ ok: true });

    // Telegram
    if (TG_TOKEN && TG_CHAT_ID) {
      await axios.post(
        `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`,
        {
          chat_id: TG_CHAT_ID,
          text:
            `🧾 New lead\n` +
            `👤 ${name}\n📧 ${email}\n📞 ${phone}\n💬 ${message || "—"}`,
        },
        { timeout: 5000 },
      );
    }

    // HubSpot
    if (HUBSPOT_TOKEN) {
      const [firstname, ...rest] = name.split(" ");
      await axios.post(
        "https://api.hubapi.com/crm/v3/objects/contacts?idProperty=email",
        {
          properties: {
            email,
            firstname,
            lastname: rest.join(" "),
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
  } catch (e) {
    console.error("Lead error:", e.message);
  }
});

/* =========================
   START
========================= */
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log("🚀 Server running on", PORT));
