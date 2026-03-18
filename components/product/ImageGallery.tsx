"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());

  const productImageUrls =
    product.images?.filter(
      (s) => s.startsWith("http") || s.startsWith("/")
    ) ?? [];

  const markFailed = (index: number) => {
    setFailedIndices((prev) => new Set(prev).add(index));
  };

  const visibleIndices = useMemo(
    () =>
      productImageUrls
        .map((_, i) => i)
        .filter((i) => !failedIndices.has(i)),
    [productImageUrls.length, failedIndices]
  );

  const currentIndexInVisible = visibleIndices.indexOf(selected);
  const effectiveSelected =
    currentIndexInVisible >= 0
      ? visibleIndices[currentIndexInVisible]
      : visibleIndices[0];
  const mainSrc =
    productImageUrls[effectiveSelected] ??
    productImages[product.id] ??
    FALLBACK;
  const hasMultiple = visibleIndices.length > 1;
  const goPrev = () => {
    if (visibleIndices.length <= 1) return;
    const idx = currentIndexInVisible <= 0 ? visibleIndices.length - 1 : currentIndexInVisible - 1;
    setSelected(visibleIndices[idx]);
  };
  const goNext = () => {
    if (visibleIndices.length <= 1) return;
    const idx = currentIndexInVisible >= visibleIndices.length - 1 ? 0 : currentIndexInVisible + 1;
    setSelected(visibleIndices[idx]);
  };

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
          onError={() => effectiveSelected !== undefined && markFailed(effectiveSelected)}
        />
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
        {product.isOrganic && (
          <div className="absolute left-2 top-2 z-10 rounded bg-success px-2 py-1 text-xs font-medium text-white">
            ORGANIC CERTIFIED
          </div>
        )}
        {product.isFeaturedForFarmers && !product.isOrganic && (
          <div className="absolute left-2 top-2 z-10 rounded bg-offer px-2 py-1 text-xs font-medium text-white">
            BEST SELLER
          </div>
        )}
      </div>
      {visibleIndices.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {visibleIndices.map((index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelected(index)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded border-2 transition-colors",
                selected === index ? "border-primary" : "border-border"
              )}
            >
              <Image
                src={productImageUrls[index]}
                alt={`${product.name} view ${index + 1}`}
                fill
                className="object-cover"
                sizes="64px"
                unoptimized={false}
                onError={() => markFailed(index)}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
