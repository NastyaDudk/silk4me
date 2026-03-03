const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("API OK");
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log("🚀 Server running on", PORT);
});
