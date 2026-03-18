"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/lib/types/product";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { formatPriceWithoutSymbol } from "@/lib/utils/formatPrice";
import RatingStars from "./RatingStars";
import PriceDisplay from "./PriceDisplay";
import OrganicBadge from "./OrganicBadge";
import WhatsAppBuyButton from "./WhatsAppBuyButton";
import { SITE_URL } from "@/lib/config";
import { productImages } from "@/lib/data/productImages";
import { cn } from "@/lib/utils";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&q=80";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);
  const productUrl = `${SITE_URL}/product/${product.id}`;

  const primarySrc =
    product.images?.[0] &&
    (product.images[0].startsWith("http") || product.images[0].startsWith("/"))
      ? product.images[0]
      : productImages[product.id] ?? FALLBACK_IMG;
  const fallbackSrc = productImages[product.id] ?? FALLBACK_IMG;
  const [imgSrc, setImgSrc] = useState(primarySrc);

  const showOrganic = product.isOrganic;
  const showBestSeller = product.isFeaturedForFarmers && !product.isOrganic;

  return (
    <article
      className={cn(
        "group flex flex-col rounded-lg border border-border bg-card overflow-hidden transition-shadow hover:shadow-md",
        className
      )}
    >
      <div className="relative aspect-square bg-muted">
        <Link href={`/product/${product.id}`} className="block h-full w-full">
          <Image
            src={imgSrc}
            alt={`${product.name} - ${product.brand}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, 25vw"
            unoptimized={false}
            onError={() => setImgSrc(fallbackSrc)}
          />
        </Link>
        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {showOrganic && <OrganicBadge />}
          {showBestSeller && (
            <span className="rounded px-2 py-0.5 text-xs font-medium bg-offer text-white">
              BEST SELLER
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
            toast.success(inWishlist ? "Removed from Wishlist" : "Added to Wishlist ❤️");
          }}
          className="absolute right-2 top-2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={cn("h-4 w-4", inWishlist ? "fill-red-500 text-red-500" : "text-text-secondary")}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <p className="text-xs text-text-secondary">{product.brand}</p>
        <Link href={`/product/${product.id}`} className="mt-0.5 line-clamp-2 text-sm font-medium text-text-primary hover:text-primary">
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <RatingStars rating={product.rating} size="sm" />
          <span className="text-xs text-text-secondary">({product.reviewCount})</span>
        </div>
        <PriceDisplay
          price={product.price}
          mrp={product.mrp}
          discount={product.discount}
          size="sm"
          className="mt-2"
        />
        {product.minOrderQty > 1 && (
          <p className="mt-1 text-xs text-text-secondary">
            Min. order: {product.minOrderQty} units
          </p>
        )}
        <div className="mt-auto pt-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              addToCart(product.id, 1);
              toast.success("Added to cart");
            }}
            className="w-full rounded-md border border-primary bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            Add to cart
          </button>
          <WhatsAppBuyButton
            productName={product.name}
            productId={product.id}
            price={product.price}
            quantity={1}
            sku={product.sku}
            className="w-full"
          />
        </div>
      </div>
    </article>
  );
}
