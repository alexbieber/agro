"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { products } from "@/lib/data/products";
import ProductCard from "@/components/shared/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/data/categories";

type SortOption = "relevance" | "price-asc" | "price-desc" | "rating";

const MOCK_RELATED = ["Hose pipe", "Water pump", "Power sprayer", "Power weeder"];
const MOCK_DID_YOU_MEAN: Record<string, string> = {
  drip: "drip irrigation",
  spray: "power sprayer",
  weeder: "power weeder",
};

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [sort, setSort] = useState<SortOption>("relevance");

  const results = useMemo(() => {
    if (!q.trim()) return [];
    const lower = q.toLowerCase();
    let list = products.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.category.includes(lower)
    );
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, sort]);

  const didYouMean = q ? MOCK_DID_YOU_MEAN[q.toLowerCase()] : null;

  if (!q.trim()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-heading font-normal text-foreground mb-4">Search</h1>
        <p className="text-muted-foreground">Enter a search term above.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-heading font-normal text-foreground mb-2">
        Results for &apos;{q}&apos;
      </h1>
      {didYouMean && (
        <p className="text-muted-foreground mb-2">
          Did you mean: <Link href={`/search?q=${encodeURIComponent(didYouMean)}`} className="text-primary hover:underline">{didYouMean}</Link>?
        </p>
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {MOCK_RELATED.map((term) => (
          <Link
            key={term}
            href={`/search?q=${encodeURIComponent(term)}`}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-muted"
          >
            {term}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4 mb-4">
        <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-asc">Price Low-High</SelectItem>
            <SelectItem value="price-desc">Price High-Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground mb-4">No results found.</p>
          <p className="text-sm text-muted-foreground mb-4">Try:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {["Hose pipe", "Water pump", "Power sprayer", "Power weeder"].map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-muted"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
