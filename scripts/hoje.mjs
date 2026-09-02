// Salve como: scripts/hoje.mjs
// Abre a página no modo ?hoje e tira um print só do card do dia -> hoje.png
import { chromium } from "playwright";

const url = process.env.PAGE_URL || "http://localhost:8080/index.html?hoje";

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 600, height: 1000 },
  deviceScaleFactor: 2,               // imagem nítida no celular
  timezoneId: "America/Sao_Paulo",    // "hoje" calculado no fuso do Brasil
  locale: "pt-BR",
});
const page = await ctx.newPage();
await page.goto(url, { waitUntil: "networkidle" });
await page.waitForSelector("#hoje");
await page.evaluate(() => document.fonts.ready); // espera a fonte carregar
await page.locator("#hoje").screenshot({ path: "hoje.png" });
await browser.close();
console.log("hoje.png gerado a partir de", url);
