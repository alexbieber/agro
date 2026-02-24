export type ProductCategory = "irrigation" | "machinery";

export type BulkPricingTier = {
  minQty: number;
  maxQty?: number;
  price: number;
  savings?: number;
};

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  reviewCount: number;
  sku: string;
  stock: number;
  images: string[];
  description: string;
  cropCompatibility?: string[];
  isOrganic: boolean;
  isFeaturedForFarmers: boolean;
  isFeaturedForDistributors: boolean;
  minOrderQty: number;
  bulkPricingTiers: BulkPricingTier[];
  specifications: Record<string, string>;
  highlights: string[];
}
