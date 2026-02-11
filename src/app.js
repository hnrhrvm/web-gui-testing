const express = require("express");
const { hexToRgb } = require("./hexToRgb");
const { rgbToHex } = require("./rgbToHex");


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

app.get("/api/rgb-to-hex", (req, res) => {
  try {
    const { r, g, b } = req.query;
    const hex = rgbToHex(r, g, b);
    res.json({ input: { r, g, b }, hex });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = { app };
