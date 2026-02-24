"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/data/products";
import ProductCard from "@/components/shared/ProductCard";

const RECENTLY_VIEWED_KEY = "recentlyViewed";

export default function ProductPageClient({
  currentProductId,
  category,
}: {
  currentProductId: string;
  category: string;
}) {
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      const prev: string[] = stored ? JSON.parse(stored) : [];
      const next = [currentProductId, ...prev.filter((id) => id !== currentProductId)].slice(0, 6);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
      setRecentIds(next.filter((id) => id !== currentProductId));
    } catch {
      setRecentIds([]);
    }
  }, [currentProductId]);

  const recentProducts = products.filter((p) => recentIds.includes(p.id)).slice(0, 4);

  if (recentProducts.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-heading font-normal text-foreground mb-4">Recently viewed</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {recentProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
