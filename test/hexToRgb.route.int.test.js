const request = require("supertest");
const { expect } = require("chai");
const { app } = require("../src/app");

describe("GET /api/hex-to-rgb integration tests", () => {

  it("returns 200 and rgb for valid hex", async () => {
    const res = await request(app)
      .get("/api/hex-to-rgb")
      .query({ hex: "#ff00aa" })
      .expect(200);

    expect(res.body).to.have.property("rgb");
    expect(res.body.rgb).to.deep.equal({ r: 255, g: 0, b: 170 });
  });

  it("returns 400 and error for invalid hex", async () => {
    const res = await request(app)
      .get("/api/hex-to-rgb")
      .query({ hex: "oops" })
      .expect(400);

    expect(res.body).to.deep.equal({ error: "InvalidHex" });
  });

});
