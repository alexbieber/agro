import { Product } from "@/lib/types/product";
import type { ProductCategory } from "@/lib/types/product";

/**
 * Products from Nandi Agrotech, Turuvekere - 572227.
 * Descriptions and highlights aligned with company copy: strong and reliable
 * farming equipment, trust and innovation, modern technology for a better future.
 */
const COMPANY_DESCRIPTION =
  "At Nandi Agrotech, we offer strong and reliable farming equipment to help increase productivity and save time. Our advanced machines and modern technology help farmers do their work more easily and effectively. We work as a partner with every farmer to support their growth. Choose Nandi Agrotech – where modern technology supports farming for a better future!";

function slugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[""]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createProduct(
  id: string,
  name: string,
  sku: string,
  category: ProductCategory,
  typeLabel?: string
): Product {
  const slug = slugFromName(name);
  return {
    id,
    name,
    slug,
    brand: "Nandi Agrotech",
    category,
    price: 0,
    mrp: 0,
    discount: 0,
    rating: 4.5,
    reviewCount: 0,
    sku,
    stock: 1,
    images: [`/images/products/${slug}.jpg`],
    description: `${typeLabel ? typeLabel + ". " : ""}${COMPANY_DESCRIPTION}`,
    cropCompatibility: [],
    isOrganic: false,
    isFeaturedForFarmers: true,
    isFeaturedForDistributors: true,
    minOrderQty: 1,
    bulkPricingTiers: [{ minQty: 1, price: 0 }],
    specifications: {
      Model: sku,
      Type: typeLabel || name.split("(")[0].trim(),
      Warranty: "1 year company warranty",
    },
    highlights: [
      "Strong and reliable for farming use",
      "1 year company warranty",
      "24/7 customer support",
    ],
  };
}

/** Extract SKU from product name (text in parentheses) or use full name. */
function skuFromName(name: string): string {
  const match = name.match(/\(([^)]+)\)/);
  return match ? match[1].trim() : name;
}

type ProductEntry = { name: string; sku?: string; category: ProductCategory };
const IRR = "irrigation" as const;
const MCH = "machinery" as const;

const productEntries: ProductEntry[] = [
  { name: "HOSE PIPE (RAPL-HP-10/100)", category: IRR },
  { name: "HOSE PIPE (RAPL-HP-8.5/100 1/4)", category: IRR },
  { name: "HOSE PIPE (RAPL-HP-8.5/50 1/2)", category: IRR },
  { name: "HOSE PIPE (RAPL-HP-8.5/50 1/4)", category: IRR },
  { name: "PORTABLE POWER SPRAYER (RAPL-PPS-50G)", category: MCH },
  { name: "PORTABLE POWER SPRAYER (RAPL-POPS-139G)", category: MCH },
  { name: "PORTABLE POWER SPRAYER (RAPL-POPS-35G)", category: MCH },
  { name: "PORTABLE POWER SPRAYER (RAPL-PS-26A)", category: MCH },
  { name: "HTP SPRAYER SET (RAPL-PS-26A)", category: MCH },
  { name: "HIT SPRAYER SET (RAPL-PS-26A)", category: MCH },
  { name: "HTP SPRAYER (RAPL-PS-A80)", category: MCH },
  { name: "HTP SPRAYER (RAPL-PS-A65)", category: MCH },
  { name: "HTP SPRAYER (RAPL-PS-B3-50)", category: MCH },
  { name: "HTP SPRAYER (RAPL-PS-A1-30)", category: MCH },
  { name: "HTP SPRAYER (RAPL-PS-A1-22)", category: MCH },
  { name: "EARTH AUGER (PLANTER DOUBLE SPIRAL)", category: MCH },
  { name: "EARTH AUGER (PLANTER SINGLE SPIRAL)", category: MCH },
  { name: "EARTH AUGER (RAPL-EA-6310)", category: MCH },
  { name: "EARTH AUGER (RAPL-EA-5210)", category: MCH },
  { name: 'PETROL CHAINSAW (RAPL-CS-5830-22"-SUPER PRO)', category: MCH },
  { name: 'Petrol chainsaw (RAPL-CS-5820-22"-PRO)', category: MCH },
  { name: 'Petrol chainsaw (RAPL-CS-5810-18"-ECO)', category: MCH },
  { name: "Chain cultivator (RAPL-MC-173D)", category: MCH },
  { name: "Chain cultivator (RAPL-MC-170G)", category: MCH },
  { name: "Power weeder (RAPL-RH-773D)", category: MCH },
  { name: "Power weeder (RAPL-RH-700G)", category: MCH },
  { name: "Front rotary mini tiller (RH-3800G-SP)", category: MCH },
  { name: "Front rotary mini tiller (RH-3800D)", category: MCH },
  { name: "Front rotary mini tiller (RH-3800G)", category: MCH },
  { name: "Front rotary mini tiller (RH-2000)", category: MCH },
  { name: "Trolley brush cutter (RAPL-TB-52)", category: MCH },
  { name: "Mini weeder (RAPL-RH-6301)", category: MCH },
  { name: "Honda oem product (HONDA GX50 OEM)", category: MCH },
  { name: "Honda oem product (HONDA GX35 OEM)", category: MCH },
  { name: "Brush cutter (RAPL-PCHB-139FK)", category: MCH },
  { name: "Brush cutter (M35-B)", category: MCH },
  { name: "Brush cutter (R43W-S)", category: MCH },
  { name: "Brush cutter (R35-S)", category: MCH },
  { name: "Brush cutter (R52-B)", category: MCH },
  { name: "Brush Cutter (R52-S)", category: MCH },
  { name: "power weeder (MY-550G-ES)", category: MCH },
  { name: "LAWN MOWER (MANUAL RUN)", category: MCH },
  { name: "LAWN MOWER (KK-LME-1900)", category: MCH },
  { name: "LAWN MOWER (KK-LME-1800)", category: MCH },
  { name: "MILKING MACHINE (KK-LME-1400)", category: MCH },
  { name: "MILKING MACHINE", category: MCH, sku: "MILKING-MACHINE" },
  { name: "CHAFF CUTTER (KK-FMC-500)", category: MCH },
  { name: "COLD FOGGING SPRAYER (KK-ULV-4000)", category: MCH },
  { name: "THERMAL FOGGING SPRAYERS", category: MCH, sku: "THERMAL-FOGGING" },
  { name: "POST HOLE DIGGERS (KK-PPDE-52)", category: MCH },
  { name: "POST HOLE DIGGER (KK-PPDE-62)", category: MCH },
  { name: "POST HOLE DIGGERS (KK-PPDE-71)", category: MCH },
  { name: "HOE CUTTERS (KK-HC-3526)", category: MCH },
  { name: "PADDY WEEDERS", category: MCH, sku: "PADDY-WEEDERS" },
  { name: "BRUSH CUTTER (KK-SBC-4302)", category: MCH },
  { name: "BRUSH CUTTER (KK-BC-555)", category: MCH },
  { name: "BRUSH CUTTERS (KK-BC4-8635)", category: MCH },
  { name: "BRUSH CUTTER (KK-BC2-8665)", category: MCH },
  { name: "BRUSH CUTTER (KK-BC-7640)", category: MCH },
  { name: "BRUSH CUTTER (KK-BC-8640)", category: MCH },
  { name: "power weeder (MY-800GH)", category: MCH },
  { name: "BRUSH CUTTERS-TROLLEY TYPE (KK-BC2-52T)", category: MCH },
  { name: "HEDGE TRIMMERS", category: MCH, sku: "HEDGE-TRIMMERS" },
  { name: "RICE MILL (KK-RM-6NF4X)", category: MCH },
  { name: "MAIZE SHELLER", category: MCH, sku: "MAIZE-SHELLER" },
  { name: "MAIZE/CORN HARVESTER", category: MCH, sku: "MAIZE-CORN-HARVESTER" },
  { name: "STUBBLE MOWER (KK-STB-050)", category: MCH },
  { name: "SELF PROPELLED REAPERS (KK-SPR-1201P Short Crop)", category: MCH },
  { name: "SEEDERS (KK-SPR-1201PE)", category: MCH },
  { name: "SEEDERS (KK-SFD-05 5-Rows)", category: MCH },
  { name: "SEEDERS (KK-MSD-B1)", category: MCH },
  { name: "SEEDERS (KK-MBT-01)", category: MCH },
  { name: "ORCHARD SPRAYERS (KK-ABOS-0750)", category: MCH },
  { name: "PORTABLE POWER SPRAYER (KK-P768)", category: MCH },
  { name: "HTP SPRAYER (KK-PSE-22X3)", category: MCH },
  { name: "HTP SPRAYER (KK-PSP-22X3)", category: MCH },
  { name: "HTP SPRAYER (KK-PSP-15)", category: MCH },
  { name: "HTP SPRAYER (KK-PSP-22)", category: MCH },
  { name: "HTP SPRAYER (KK-PSP-18)", category: MCH },
  { name: "HTP SPRAYER (KK-58CI3)", category: MCH },
  { name: "HTP SPRAYER (KK-35CI3)", category: MCH },
  { name: "HTP SPRAYER (KK-25CI3)", category: MCH },
  { name: "power weeder (MY-750GH)", category: MCH },
  { name: "HTP SPRAYER (KK-30X3)", category: MCH },
  { name: "power weeder (MY-685D KAMA ENGINE)", category: MCH },
  { name: "HTP SPRAYER (KK-22X3)", category: MCH },
  { name: "power weeder (MY-673D KAMA ENGINE)", category: MCH },
  { name: "HTP SPRAYER (KK-53CI3)", category: MCH },
  { name: "HTP SPRAYER (KK-45CI3)", category: MCH },
  { name: "HTP SPRAYER (KK-22CI3)", category: MCH },
  { name: "HTP SPRAYER (KK-18CI3)", category: MCH },
  { name: "power weeder (MY-600G)", category: MCH },
  { name: "KNAPSACK SPRAYER (KK-BBS-999)", category: MCH },
  { name: "KNAPSACK SPRAYER (KK-BBS-201)", category: MCH },
  { name: "power weeder (MY-585D MY-585D-E)", category: MCH },
  { name: "KNAPSACK SPRAYER (KK-16LTR)", category: MCH },
  { name: "KNAPSACK SPRAYER (KK-KPS-222)", category: MCH },
  { name: "power weeder (MY-550G)", category: MCH },
  { name: "KNAPSACK SPRAYER (KK-KPS-204)", category: MCH },
  { name: "KNAPSACK SPRAYER (KK-KPS-162)", category: MCH },
  { name: "KNAPSACK SPRAYERS (KK-708)", category: MCH },
  { name: "power weeder (MY-480G)", category: MCH },
  { name: "ELECTRIC WATER PUMPS (KK-WPE-37SB)", category: IRR },
  { name: "ELECTRIC WATER PUMPS (KK-WPE-400SB)", category: IRR },
  { name: "power weeder (MY-478D)", category: MCH },
  { name: "ELECTRIC WATER PUMPS (KK-WPE-WQDR15)", category: IRR },
  { name: "ELECTRIC WATER PUMPS (KK-WPE-WQ50)", category: IRR },
  { name: "ELECTRIC WATER PUMPS (KK-WPE-1500F)", category: IRR },
  { name: "power weeder (MY-470G-HL)", category: MCH },
  { name: "ELECTRIC WATER PUMPS (KK-WPE-1100F)", category: IRR },
  { name: "ELECTRIC WATER PUMPS (KK-WPE-750F)", category: IRR },
  { name: "ELECTRIC WATER PUMPS (KK-WPE-550F)", category: IRR },
  { name: "ELECTRIC WATER PUMPS (KK-WPE-1100C)", category: IRR },
  { name: "power weeder (MY-450G)", category: MCH },
  { name: "ELECTRIC WATER PUMPS (KK-WPE-800C)", category: IRR },
  { name: "WATER PUMPS (KK-WPP-33)", category: IRR },
  { name: "WATER PUMPS (KK-WPP-23)", category: IRR },
  { name: "power weeder (HONDA - GX270)", category: MCH },
  { name: "WATER PUMPS (KK-WPP-21)", category: IRR },
  { name: "power weeder (HONDA - GX200)", category: MCH },
  { name: "WATER PUMPS (KK-WPP-15)", category: IRR },
  { name: "WATER PUMPS (KK-WPP-10)", category: IRR },
  { name: "WATER PUMPS (KK-WPP-3515)", category: IRR },
  { name: "WATER PUMPS - DIESEL (KK-WPDV-173)", category: IRR },
  { name: "Mini weeder / power weeder (MY-370G)", category: MCH },
  { name: "ENGINES - DIESEL (KK-DEV-378F)", category: MCH },
  { name: "Mini weeder / power weeder (MY-300G)", category: MCH },
  { name: "ENGINES - DIESEL (KK-DEV-370F)", category: MCH },
  { name: "ENGINES - PETROL (KK-PE4-203)", category: MCH },
  { name: "Gasoline water pump (WA30)", category: IRR },
  { name: "ENGINES - PETROL (KK-PE4-103)", category: MCH },
  { name: "ENGINES - PETROL (KK-PE4-101)", category: MCH },
  { name: "Gasoline water pump (WA20)", category: IRR },
  { name: "ELECTRIC MOTOR (KK-IM4-1030)", category: MCH },
  { name: "ELECTRIC MOTOR (KK-IM4-1020)", category: MCH },
  { name: "ELECTRIC MOTOR (KK-IM4-1015)", category: MCH },
  { name: "ELECTRIC MOTOR (KK-IM4-1010)", category: MCH },
  { name: "Brush cutter (M-52B)", category: MCH },
  { name: "Brush cutter (MY-BC-45G)", category: MCH },
  { name: "Plough", category: MCH, sku: "PLOUGH" },
  { name: "Ridger", category: MCH, sku: "RIDGER" },
  { name: "Potato Digger", category: MCH, sku: "POTATO-DIGGER" },
  { name: "Brush cutter (M-52S)", category: MCH },
  { name: "BLADES (KK-IC-115-700-06)", category: MCH },
  { name: "BLADES (KK-IC-110-700-06)", category: MCH },
  { name: "BLADES (KK-IC-102-700-04)", category: MCH },
  { name: "Brush cutter (M-35B)", category: MCH },
  { name: "POWER WEEDER (KK-IC-400D)", category: MCH },
  { name: "POWER WEEDER (KK-IC-650D)", category: MCH },
  { name: "Brush cutter (M-35s)", category: MCH },
  { name: "POWER WEEDER (KK-IC-350D)", category: MCH },
  { name: "POWER WEEDER (KK-IC-300D)", category: MCH },
  { name: "POWER WEEDER (KK-IC-256D)", category: MCH },
  { name: "POWER WEEDER (KK-IC-255D)", category: MCH },
  { name: "POWER WEEDER (KK-IC-250D)", category: MCH },
  { name: "POWER WEEDER (KK-IC-620P)", category: MCH },
  { name: "POWER WEEDER (KK-IC-410P)", category: MCH },
  { name: "POWER WEEDER (KK-IC-215P)", category: MCH },
  { name: "POWER WEEDER (KK-IC-210P)", category: MCH },
  { name: "POWER WEEDER (KK-IC-208P)", category: MCH },
  { name: "POWER WEEDER (KK-IC-205P)", category: MCH },
  { name: "POWER WEEDER (KK-IC-200P)", category: MCH },
  { name: "POWER WEEDER (KK-IC-100P)", category: MCH },
  { name: "POWER WEEDER (KK-IC-6320)", category: MCH },
  { name: "POWER WEEDER (KK-IC-520)", category: MCH },
  { name: "POWER WEEDER (KK-IC-8626)", category: MCH },
];

let irrCount = 0;
let machCount = 0;
export const products: Product[] = productEntries.map((entry) => {
  const sku = entry.sku ?? skuFromName(entry.name);
  const id =
    entry.category === "irrigation"
      ? `irr-${String(++irrCount).padStart(3, "0")}`
      : `mach-${String(++machCount).padStart(3, "0")}`;
  return createProduct(id, entry.name, sku, entry.category);
});
