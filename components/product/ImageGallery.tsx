"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types/product";
import { productImages } from "@/lib/data/productImages";
import { cn } from "@/lib/utils";

const FALLBACK = "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&q=80";

export default function ImageGallery({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const [selected, setSelected] = useState(0);
  const premiumImg = productImages[product.id];
  const images = product.images?.filter((s) => s.startsWith("http")) ?? [];
  const mainSrc = premiumImg ?? images[selected] ?? images[0] ?? FALLBACK;
  const thumbnails = premiumImg ? [premiumImg] : images.length ? images : [FALLBACK];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted group">
        <Image
          src={mainSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          unoptimized={false}
        />
        {product.isOrganic && (
          <div className="absolute left-2 top-2 rounded bg-success px-2 py-1 text-xs font-medium text-white">
            ORGANIC CERTIFIED
          </div>
        )}
        {product.isFeaturedForFarmers && !product.isOrganic && (
          <div className="absolute left-2 top-2 rounded bg-offer px-2 py-1 text-xs font-medium text-white">
            BEST SELLER
          </div>
        )}
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {thumbnails.slice(0, 5).map((src, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSelected(i)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded border-2 transition-colors",
              selected === i ? "border-primary" : "border-border"
            )}
          >
            <Image
              src={src}
              alt={`${product.name} view ${i + 1}`}
              fill
              className="object-cover"
              sizes="64px"
              unoptimized={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
