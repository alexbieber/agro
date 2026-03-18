"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Product } from "@/lib/types/product";
import { WHATSAPP_NUMBER, ORDER_WHATSAPP_NUMBER, SITE_URL } from "@/lib/config";
import { buildEnquiryURL, buildSingleOrderWithCustomerURL } from "@/lib/utils/whatsapp";
import { formatPrice, formatPriceWithoutSymbol } from "@/lib/utils/formatPrice";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import RatingStars from "@/components/shared/RatingStars";
import OrganicBadge from "@/components/shared/OrganicBadge";
import BulkPricing from "./BulkPricing";
import DeliveryInfo from "@/components/shared/DeliveryInfo";
import OrderFormModal from "@/components/shared/OrderFormModal";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ProductInfo({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const [qty, setQty] = useState(Math.max(1, product.minOrderQty));
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, qty);
    toast.success(`Added ${qty} to cart`);
  };
  const productUrl = `${SITE_URL}/product/${product.id}`;
  const priceStr = product.price > 0 ? formatPriceWithoutSymbol(product.price) : "Contact for price";
  const isHeavy = product.category === "machinery" && product.price > 10000;
  const [showOrderModal, setShowOrderModal] = useState(false);

  const handleBuyWhatsApp = (customer: Parameters<typeof buildSingleOrderWithCustomerURL>[0]["customer"]) => {
    const url = buildSingleOrderWithCustomerURL({
      phone: ORDER_WHATSAPP_NUMBER,
      productName: product.name,
      productUrl,
      quantity: qty,
      sku: product.sku,
      price: priceStr,
      customer,
    });
    window.open(url, "_blank");
  };

  const handleEnquire = () => {
    const url = buildEnquiryURL({
      phone: WHATSAPP_NUMBER,
      productName: product.name,
      productUrl,
    });
    window.open(url, "_blank");
  };

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-sm text-text-secondary">
        <Link href={`/category/${product.category}?brand=${encodeURIComponent(product.brand)}`} className="hover:text-primary">
          {product.brand}
        </Link>
      </p>
      <h1 className="text-2xl font-bold text-text-primary">{product.name}</h1>
      <div className="flex items-center gap-2">
        <RatingStars rating={product.rating} />
        <span className="text-sm text-text-secondary">
          {product.rating} ({product.reviewCount} ratings) | {product.reviewCount} reviews
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {product.isOrganic && <OrganicBadge />}
        <span className="rounded bg-muted px-2 py-0.5 text-xs">🏛️ Government Approved</span>
      </div>

      <div className="border-t border-b border-border py-4">
        <p className="text-2xl font-bold text-primary">
          {product.price > 0 ? formatPrice(product.price) : "Contact for price"}
        </p>
        {product.price > 0 && product.mrp > product.price && (
          <p className="text-text-secondary line-through">{formatPrice(product.mrp)}</p>
        )}
        {product.discount > 0 && (
          <p className="font-semibold text-offer">{product.discount}% off</p>
        )}
        <p className="text-xs text-text-secondary mt-1">
          Inclusive of all taxes. Free delivery above ₹1,499
        </p>
      </div>

      <BulkPricing product={product} />

      {isHeavy && (
        <p className="text-sm text-text-secondary">
          💬 <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Enquiry about EMI options for: ${product.name} - ${productUrl}`)}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Enquire about EMI options on WhatsApp</a>
        </p>
      )}

      <div className="flex items-center gap-2">
        <span className="text-sm text-text-secondary">Quantity:</span>
        <div className="flex items-center border border-border rounded-md overflow-hidden">
          <button
            type="button"
            onClick={() => setQty((x) => Math.max(product.minOrderQty, x - 1))}
            className="px-3 py-2 hover:bg-muted"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="px-4 py-2 min-w-[3rem] text-center">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((x) => x + 1)}
            className="px-3 py-2 hover:bg-muted"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        {product.minOrderQty > 1 && (
          <span className="text-xs text-text-secondary">Min. order: {product.minOrderQty}</span>
        )}
      </div>

      <DeliveryInfo heavyItem={isHeavy} />

      <div className="space-y-2">
        <Button
          className="w-full gap-2 h-12 text-base bg-primary hover:bg-primary/90"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-5 w-5" />
          ADD TO CART
        </Button>
        <Button
          variant="whatsapp"
          className="w-full gap-2 h-11 text-base"
          onClick={() => setShowOrderModal(true)}
        >
          <WhatsAppIcon className="h-5 w-5" />
          BUY ON WHATSAPP
        </Button>
        <OrderFormModal
          open={showOrderModal}
          onClose={() => setShowOrderModal(false)}
          onSubmit={handleBuyWhatsApp}
          title="Your details for this order"
          submitLabel="Send order on WhatsApp"
        />
        <Button
          variant="outline"
          className="w-full gap-2 border-primary text-primary"
          onClick={handleEnquire}
        >
          <MessageCircle className="h-4 w-4" />
          ENQUIRE NOW
        </Button>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary"
        >
          <Heart className={cn("h-4 w-4", inWishlist && "fill-red-500 text-red-500")} />
          Save to Wishlist
        </button>
      </div>

      <p className="text-sm text-text-secondary">
        Sold by <strong>Nandee Agrotech</strong> · <span className="text-success">Verified Seller</span>
      </p>

      {product.highlights?.length ? (
        <ul className="list-disc list-inside text-sm text-text-primary space-y-1">
          {product.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      ) : null}

      {(product.cropCompatibility?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-text-secondary">Crop:</span>
          {product.cropCompatibility?.map((c) => (
            <span key={c} className="rounded-full bg-muted px-3 py-1 text-xs">{c}</span>
          ))}
        </div>
      )}
    </div>
  );
}
