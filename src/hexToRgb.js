function hexToRgb(hex) {
  if (typeof hex !== "string") {
    throw new Error("InvalidHex");
  }

  let h = hex.trim();
  if (h.startsWith("#")) h = h.slice(1);

  // Short form: RGB -> RRGGBB
  if (/^[0-9a-fA-F]{3}$/.test(h)) {
    h = h.split("").map(ch => ch + ch).join("");
  }

  if (!/^[0-9a-fA-F]{6}$/.test(h)) {
    throw new Error("InvalidHex");
  }

  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);

  return { r, g, b };
}

module.exports = { hexToRgb };
