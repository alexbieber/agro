/**
 * Scrape nandiagrotech.com/collection to understand structure and order flow.
 * Run: node scripts/scrape-collection.mjs
 */
import { chromium } from "playwright";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "scraped-collection.json");
const BASE = "https://nandiagrotech.com";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const result = {
    url: `${BASE}/collection`,
    nav: [],
    pageTitle: "",
    headings: [],
    productCards: [],
    buttons: [],
    links: [],
    bodySections: [],
    orderFlow: null,
  };

  try {
    await page.goto(`${BASE}/collection`, { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(4000);

    result.pageTitle = await page.title();
    result.nav = await page.$$eval("nav a, [role='navigation'] a, header a", (as) =>
      as.map((a) => ({ text: a.textContent?.trim(), href: a.getAttribute("href") }))
    );

    result.headings = await page.$$eval("h1, h2, h3", (els) =>
      els.map((e) => ({ tag: e.tagName, text: e.textContent?.trim() }))
    );

    // Product cards: links, titles, any CTA (Buy / Order / Enquire / Add to cart / WhatsApp)
    const cards = await page.$$eval(
      'a[href*="/product/"], [class*="product"], [class*="card"], [class*="item"]',
      (nodes) =>
        nodes.map((el) => {
          const link = el.tagName === "A" ? el.getAttribute("href") : el.querySelector("a")?.getAttribute("href");
          const name = el.querySelector("h1, h2, h3, h4, [class*='title'], [class*='name']")?.textContent?.trim()
            || el.textContent?.trim().slice(0, 80);
          const buttons = [...el.querySelectorAll("button, a")].filter((b) =>
            /buy|order|enquir|whatsapp|add|cart|contact|place|book/i.test(b.textContent || "")
          ).map((b) => b.textContent?.trim());
          const price = el.querySelector("[class*='price'], [class*='amount']")?.textContent?.trim();
          return { link, name, buttons, price };
        })
    );
    result.productCards = cards.filter((c) => c.link || c.name?.length > 2).slice(0, 30);

    result.buttons = await page.$$eval("button, a[role='button'], [class*='btn']", (els) =>
      els.map((e) => e.textContent?.trim()).filter(Boolean)
    );

    result.links = await page.$$eval("a[href]", (as) =>
      as.map((a) => ({ text: a.textContent?.trim().slice(0, 60), href: a.getAttribute("href") })).filter((x) => x.href)
    );

    const bodyText = await page.evaluate(() => document.body?.innerText || "");
    result.bodySections = bodyText.split("\n").map((s) => s.trim()).filter(Boolean).slice(0, 120);

    // Check for cart, checkout, order form
    const hasCart = await page.$('a[href*="cart"], [class*="cart"]').then(Boolean);
    const hasCheckout = await page.$('a[href*="checkout"], [class*="checkout"]').then(Boolean);
    const hasWhatsApp = bodyText.toLowerCase().includes("whatsapp") || result.buttons.some((b) => /whatsapp/i.test(b));
    result.orderFlow = { hasCart, hasCheckout, hasWhatsApp, buttonSamples: result.buttons.slice(0, 20) };

    // If there's a product page, visit one and check CTA
    const firstProductLink = result.productCards.find((c) => c.link?.includes("/product/"))?.link;
    if (firstProductLink) {
      const url = firstProductLink.startsWith("http") ? firstProductLink : new URL(firstProductLink, BASE).href;
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 });
      await page.waitForTimeout(2000);
      const productPageButtons = await page.$$eval("button, a", (els) =>
        els.map((e) => e.textContent?.trim()).filter((s) => s && s.length < 50)
      );
      result.productDetailCTAs = productPageButtons;
      result.productDetailHTML = await page.evaluate(() => {
        const main = document.querySelector("main, [role='main'], .product, [class*='product-detail']") || document.body;
        return main?.innerText?.slice(0, 1500) || "";
      });
    }

    writeFileSync(OUT_PATH, JSON.stringify(result, null, 2));
    console.log("Wrote", OUT_PATH);
    console.log("Order flow:", result.orderFlow);
    console.log("Product cards:", result.productCards.length);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
