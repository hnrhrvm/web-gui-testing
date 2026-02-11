const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");

async function takeScreenshot(driver, filename) {
  const image = await driver.takeScreenshot();
  fs.writeFileSync(filename, image, "base64");
}

async function run() {
  const driver = await new Builder().forBrowser("chrome").build();
  try {
    await driver.get("http://localhost:3000/");

    // Hex -> RGB
    const hexInput = await driver.findElement(By.id("hexInput"));
    await hexInput.clear();
    await hexInput.sendKeys("#ff00aa");
    await driver.findElement(By.css("button[onclick='convertHex()']")).click();

    const hexResult = await driver.wait(
      until.elementLocated(By.id("hexResult")),
      3000
    );

    const text1 = await hexResult.getText();
    if (!text1.includes("255")) {
      throw new Error("Hex->RGB result did not look correct: " + text1);
    }

    // RGB -> Hex
    const r = await driver.findElement(By.id("r"));
    const g = await driver.findElement(By.id("g"));
    const b = await driver.findElement(By.id("b"));
    await r.clear(); await r.sendKeys("255");
    await g.clear(); await g.sendKeys("0");
    await b.clear(); await b.sendKeys("170");

    await driver.findElement(By.css("button[onclick='convertRgb()']")).click();

    const rgbResult = await driver.wait(
      until.elementLocated(By.id("rgbResult")),
      3000
    );

    const text2 = await rgbResult.getText();
    if (!text2.toLowerCase().includes("#ff00aa")) {
      throw new Error("RGB->Hex result did not match: " + text2);
    }

    await takeScreenshot(driver, "docs/selenium-ui.png");
    console.log("✅ Selenium UI test passed. Screenshot saved to docs/selenium-ui.png");
  } finally {
    await driver.quit();
  }
}

run().catch(err => {
  console.error("❌ Selenium UI test failed:", err);
  process.exit(1);
});
