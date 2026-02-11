const express = require("express");
const { hexToRgb } = require("./hexToRgb");

const app = express();

app.get("/api/hex-to-rgb", (req, res) => {
  try {
    const input = req.query.hex;
    const rgb = hexToRgb(input);
    res.json({ input, rgb });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = { app };
