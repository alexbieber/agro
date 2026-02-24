"use client";

import { useState, useEffect } from "react";
import { products } from "@/lib/data/products";
import ProductCard from "@/components/shared/ProductCard";
import { cn } from "@/lib/utils";

function useCountdown() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        if (s > 0) return { ...prev, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 23, m: 59, s: 59 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

export default function FlashDeals() {
  const { h, m, s } = useCountdown();
  const deals = products.filter((p) => p.discount >= 10).slice(0, 6);
  const featured = deals.length > 0 ? deals : products.slice(0, 6);

  return (
    <section className="bg-offer/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h2 className="text-xl font-heading font-normal text-foreground">{deals.length > 0 ? "Offers" : "Featured"}</h2>
          <div className="flex items-center gap-2 rounded bg-red-500/20 px-3 py-1 text-sm font-mono font-medium text-red-700">
            <span>{String(h).padStart(2, "0")}</span>
            <span>:</span>
            <span>{String(m).padStart(2, "0")}</span>
            <span>:</span>
            <span>{String(s).padStart(2, "0")}</span>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
          {featured.map((product) => (
            <div
              key={product.id}
              className="w-[260px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
