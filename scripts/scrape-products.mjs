/**
 * Scrape products from nandiagrotech.com (SPA).
 * Run: node scripts/scrape-products.mjs
 * Output: scripts/scraped-products.json
 */
import { chromium } from "playwright";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_PATH = join(__dirname, "scraped-products.json");
const BASE = "https://nandiagrotech.com";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const products = [];

  try {
    await page.goto(BASE, { waitUntil: "networkidle", timeout: 20000 });
    await page.waitForTimeout(3000);

    // Try common SPA patterns: product cards, links to /product/, items with names/prices
    const productLinks = await page.$$eval('a[href*="product"], a[href*="item"], [data-product], [class*="product"] a', (nodes) =>
      nodes.map((a) => ({ href: a.href, text: a.textContent?.trim() || "" }))
    );

    // Get all visible cards/sections that might be products
    const cards = await page.$$eval(
      '[class*="card"], [class*="product"], [class*="item"], article, section',
      (nodes) =>
        nodes.map((el) => {
          const name = el.querySelector("h1, h2, h3, h4, [class*='title'], [class*='name']")?.textContent?.trim();
          const desc = el.querySelector("p, [class*='desc'], [class*='description']")?.textContent?.trim();
          const price = el.querySelector("[class*='price'], [class*='amount']")?.textContent?.trim();
          return { name, desc, price, html: el.innerText?.slice(0, 500) };
        })
    );

    // Also get full body text to grep for product-like lines
    const bodyText = await page.evaluate(() => document.body?.innerText || "");
    const lines = bodyText.split("\n").map((s) => s.trim()).filter(Boolean);

    // Try to find product page links and visit them for descriptions
    const links = await page.$$eval("a[href^='/'], a[href^='" + BASE + "']", (as) =>
      as.map((a) => a.getAttribute("href")).filter(Boolean)
    );
    const uniqueLinks = [...new Set(links)];
    const productPageUrls = uniqueLinks.filter(
      (h) => /\/product\/|\/item\/|\/p\//.test(h) || (h.includes("product") && !h.includes("#"))
    );

    for (const path of productPageUrls.slice(0, 30)) {
      const url = path.startsWith("http") ? path : new URL(path, BASE).href;
      try {
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 10000 });
        await page.waitForTimeout(1500);
        const name = await page.$eval("h1, [class*='product-name'], [class*='title']", (el) => el?.textContent?.trim()).catch(() => null);
        const description = await page.$eval("[class*='description'], [class*='desc'], .prose, main p", (el) => el?.textContent?.trim()).catch(() => null);
        const price = await page.$eval("[class*='price'], [class*='amount']", (el) => el?.textContent?.trim()).catch(() => null);
        if (name || description) {
          products.push({ url, name: name || "", description: description || "", price: price || "" });
        }
      } catch (_) {
        // skip
      }
    }

    // If no product pages found, use cards/text
    if (products.length === 0 && cards.length > 0) {
      cards.forEach((c, i) => {
        if (c.name || c.desc) products.push({ name: c.name || `Product ${i + 1}`, description: c.desc || "", price: c.price || "" });
      });
    }
    if (products.length === 0) {
      // Last resort: chunk body text into plausible product blocks
      const chunk = lines.filter((l) => l.length > 15 && l.length < 400);
      chunk.slice(0, 50).forEach((line, i) => {
        products.push({ name: line.slice(0, 80), description: line, price: "" });
      });
    }

    writeFileSync(OUT_PATH, JSON.stringify({ productLinks, cards: cards.slice(0, 20), products, sampleBodyLines: lines.slice(0, 80) }, null, 2));
    console.log("Wrote", OUT_PATH, "| products:", products.length, "| cards:", cards.length);
  } finally {
    await browser.close();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
