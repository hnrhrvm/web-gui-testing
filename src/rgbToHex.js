function toHex2(n) {
  const v = Number(n);
  if (!Number.isInteger(v) || v < 0 || v > 255) {
    throw new Error("InvalidRGB");
  }
  return v.toString(16).padStart(2, "0");
}

function rgbToHex(r, g, b) {
  return "#" + toHex2(r) + toHex2(g) + toHex2(b);
}

module.exports = { rgbToHex };
