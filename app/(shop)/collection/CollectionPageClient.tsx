"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types/product";
import { cn } from "@/lib/utils";

type FilterId = "all" | Product["category"];

interface CollectionPageClientProps {
  initialProducts: Product[];
  categoryFilters: { id: FilterId; label: string }[];
}

export default function CollectionPageClient({
  initialProducts,
  categoryFilters,
}: CollectionPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paramCategory = searchParams.get("category") as FilterId | null;
  const [filter, setFilter] = useState<FilterId>(paramCategory && categoryFilters.some((f) => f.id === paramCategory) ? paramCategory : "all");

  const filtered =
    filter === "all"
      ? initialProducts
      : initialProducts.filter((p) => p.category === filter);

  const handleFilterChange = (id: FilterId) => {
    setFilter(id);
    if (id === "all") {
      router.push("/collection", { scroll: false });
    } else {
      router.push(`/collection?category=${id}`, { scroll: false });
    }
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-text-secondary">Filters</span>
        <div className="flex flex-wrap gap-2">
          {categoryFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => handleFilterChange(f.id)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                filter === f.id
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-card text-text-primary hover:bg-muted"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p>No products in this category.</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => handleFilterChange("all")}
          >
            View all products
          </Button>
        </div>
      )}
    </>
  );
}
