"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/lib/data/products";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import type { ProductCategory } from "@/lib/types/product";
import { cn } from "@/lib/utils";

const tabs: { id: ProductCategory; label: string }[] = [
  { id: "irrigation", label: "Irrigation" },
  { id: "machinery", label: "Machinery" },
];

export default function TopSelling() {
  const [active, setActive] = useState<ProductCategory>("irrigation");
  const filtered = products.filter((p) => p.category === active).slice(0, 4);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-heading font-normal text-foreground">Popular this season</h2>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                className={cn(
                  "rounded-md px-4 py-2 text-sm font-medium transition-colors",
                  active === tab.id
                    ? "bg-primary text-white"
                    : "bg-muted text-text-secondary hover:bg-muted/80"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <Link href={`/category/${active}`}>
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
