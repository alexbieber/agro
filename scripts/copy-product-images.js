/**
 * Copies ALL images from agro/products/product-N/ into public/images/products/.
 * product-1/1.png -> {slug}.png, 2.png -> {slug}-2.png, 3.png -> {slug}-3.png, etc.
 * Mapping: product-1 = 1st catalog product, product-2 = 2nd, etc.
 * Run from project root: node scripts/copy-product-images.js
 */

const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const productsFolder = path.join(projectRoot, "products");
const publicProductsFolder = path.join(projectRoot, "public", "images", "products");

function slugFromName(name) {
  return name
    .toLowerCase()
    .replace(/[""]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// Product names in same order as lib/data/products.ts (extend as needed)
const firstProductNames = [
  "HOSE PIPE (RAPL-HP-10/100)",
  "HOSE PIPE (RAPL-HP-8.5/100 1/4)",
  "HOSE PIPE (RAPL-HP-8.5/50 1/2)",
  "HOSE PIPE (RAPL-HP-8.5/50 1/4)",
  "PORTABLE POWER SPRAYER (RAPL-PPS-50G)",
  "PORTABLE POWER SPRAYER (RAPL-POPS-139G)",
  "PORTABLE POWER SPRAYER (RAPL-POPS-35G)",
  "PORTABLE POWER SPRAYER (RAPL-PS-26A)",
];

if (!fs.existsSync(publicProductsFolder)) {
  fs.mkdirSync(publicProductsFolder, { recursive: true });
}

let copied = 0;
for (let i = 0; i < firstProductNames.length; i++) {
  const slug = slugFromName(firstProductNames[i]);
  const folderName = `product-${i + 1}`;
  const sourceDir = path.join(productsFolder, folderName);
  if (!fs.existsSync(sourceDir)) continue;

  const files = fs
    .readdirSync(sourceDir)
    .filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, ""), 10) || 0;
      const numB = parseInt(b.replace(/\D/g, ""), 10) || 0;
      return numA - numB;
    });
  if (files.length === 0) continue;

  for (let j = 0; j < files.length; j++) {
    const destName = j === 0 ? `${slug}.png` : `${slug}-${j + 1}.png`;
    const destPath = path.join(publicProductsFolder, destName);
    fs.copyFileSync(path.join(sourceDir, files[j]), destPath);
    console.log(`Copied ${folderName}/${files[j]} -> public/images/products/${destName}`);
    copied++;
  }
}

console.log(`Done. Copied ${copied} image(s).`);
