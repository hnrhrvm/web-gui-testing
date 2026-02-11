const { expect } = require("chai");
const { hexToRgb } = require("../src/hexToRgb");

describe("hexToRgb unit tests", () => {

  it("converts #ff00aa correctly", () => {
    const result = hexToRgb("#ff00aa");
    expect(result).to.deep.equal({ r: 255, g: 0, b: 170 });
  });

  it("accepts hex without #", () => {
    const result = hexToRgb("00ff00");
    expect(result).to.deep.equal({ r: 0, g: 255, b: 0 });
  });

  it("accepts short hex form", () => {
    const result = hexToRgb("#0f8");
    expect(result).to.deep.equal({ r: 0, g: 255, b: 136 });
  });

  it("throws error for invalid hex", () => {
    expect(() => hexToRgb("xyz")).to.throw("InvalidHex");
  });

});
