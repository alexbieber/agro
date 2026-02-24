import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { SITE_NAME } from "@/lib/config";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import CollectionPageClient from "./CollectionPageClient";
import type { ProductCategory } from "@/lib/types/product";

export const metadata: Metadata = {
  title: `Collection — All Products | ${SITE_NAME}`,
  description: "Browse our range of agricultural equipment – irrigation and farm machinery. Nandi Agrotech, Turuvekere.",
};

const CATEGORY_FILTERS: { id: "all" | ProductCategory; label: string }[] = [
  { id: "all", label: "All Collections" },
  ...categories.filter((c) => c.productCount > 0).map((c) => ({ id: c.id as ProductCategory, label: c.name })),
];

export default function CollectionPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <nav className="text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Collection</span>
      </nav>

      <div className="mb-6">
        <h1 className="text-2xl font-heading font-normal text-foreground">Collection</h1>
        <p className="text-muted-foreground mt-1">
          Browse irrigation, sprayers, pumps and farm machinery.
        </p>
      </div>

      <Suspense fallback={<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4"><div className="h-64 animate-pulse rounded-lg bg-muted" /><div className="h-64 animate-pulse rounded-lg bg-muted" /><div className="h-64 animate-pulse rounded-lg bg-muted" /><div className="h-64 animate-pulse rounded-lg bg-muted" /></div>}>
        <CollectionPageClient
          initialProducts={products}
          categoryFilters={CATEGORY_FILTERS}
        />
      </Suspense>
    </div>
  );
}
