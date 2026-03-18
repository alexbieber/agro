import { products } from "./products";

/**
 * Categories aligned with nandiagrotech.com (Nandee Agrotech, Turuvekere).
 * Hose pipes, water pumps (irrigation); sprayers, weeders, brush cutters, etc. (machinery).
 */
export const categories = [
  {
    id: "irrigation",
    name: "Irrigation Systems",
    slug: "irrigation",
    icon: "💧",
    description: "Hose pipes, electric & diesel water pumps, gasoline pumps",
    productCount: products.filter((p) => p.category === "irrigation").length,
  },
  {
    id: "machinery",
    name: "Farm Machinery",
    slug: "machinery",
    icon: "🚜",
    description: "Power sprayers, HTP sprayers, power weeders, brush cutters, tillers, engines & more",
    productCount: products.filter((p) => p.category === "machinery").length,
  },
];
