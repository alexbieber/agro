"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import { products } from "@/lib/data/products";
import { productImages } from "@/lib/data/productImages";
import { ORDER_WHATSAPP_NUMBER, SITE_URL } from "@/lib/config";
import { buildCartOrderWithCustomerURL } from "@/lib/utils/whatsapp";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils/formatPrice";
import OrderFormModal from "@/components/shared/OrderFormModal";
import type { Product } from "@/lib/types/product";

const FALLBACK_IMG = "https://via.placeholder.com/400x400/2E7D32/FFFFFF?text=Nandee+Agrotech";

function CartProductImage({ product }: { product: Product }) {
  const primary =
    product.images?.[0] &&
    (product.images[0].startsWith("http") || product.images[0].startsWith("/"))
      ? product.images[0]
      : productImages[product.id] || FALLBACK_IMG;
  const fallback = productImages[product.id] || FALLBACK_IMG;
  const [src, setSrc] = useState(primary);
  return (
    <Image
      src={src}
      alt={product.name}
      fill
      className="object-cover"
      sizes="80px"
      onError={() => setSrc(fallback)}
    />
  );
}

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, cartCount } = useCart();
  const { addOrder } = useOrderHistory();
  const [showOrderModal, setShowOrderModal] = useState(false);

  const cartProducts = useMemo(() => {
    return items.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    }).filter(Boolean) as { product: (typeof products)[0]; quantity: number }[];
  }, [items]);

  const placeOrderWhatsApp = (customer: Parameters<typeof buildCartOrderWithCustomerURL>[0]["customer"]) => {
    const productsSummary = cartProducts
      .map(({ product, quantity }) => `${product.name} (${product.sku}) x ${quantity}`)
      .join(", ");
    const amount = cartProducts.reduce((sum, { product, quantity }) => sum + (product.price > 0 ? product.price * quantity : 0), 0);
    addOrder(productsSummary, amount);

    const payload = cartProducts.map(({ product, quantity }) => ({
      name: product.name,
      quantity,
      sku: product.sku,
      url: `${SITE_URL}/product/${product.id}`,
    }));
    const url = buildCartOrderWithCustomerURL({
      phone: ORDER_WHATSAPP_NUMBER,
      items: payload,
      siteUrl: SITE_URL,
      customer,
    });
    window.open(url, "_blank");
    clearCart();
  };

  if (cartCount === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-heading font-normal text-foreground mb-2">Cart</h1>
        <p className="text-muted-foreground mb-6">Your cart is empty.</p>
        <Link href="/collection">
          <Button>View collection</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <nav className="text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/collection" className="hover:text-primary">Collection</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Cart</span>
      </nav>

      <h1 className="text-2xl font-heading font-normal text-foreground mb-6">Cart ({cartCount} {cartCount === 1 ? "item" : "items"})</h1>

      <div className="space-y-4 mb-8">
        {cartProducts.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card p-4"
            >
              <Link href={`/product/${product.id}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
                <CartProductImage product={product} />
              </Link>
              <div className="min-w-0 flex-1">
                <Link href={`/product/${product.id}`} className="font-medium text-text-primary hover:text-primary line-clamp-2">
                  {product.name}
                </Link>
                <p className="text-sm text-text-secondary">{product.sku}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="h-8 w-8 rounded border border-border bg-background text-sm font-medium hover:bg-muted"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  className="h-8 w-8 rounded border border-border bg-background text-sm font-medium hover:bg-muted"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div className="text-sm text-text-secondary">
                {product.price > 0 ? formatPrice(product.price * quantity) : "Contact for price"}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </Button>
            </div>
          ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <Link href="/collection">
          <Button variant="outline">Continue shopping</Button>
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={clearCart}>
            Clear cart
          </Button>
          <Button variant="whatsapp" onClick={() => setShowOrderModal(true)} className="gap-2">
            Place order via WhatsApp
          </Button>
        </div>
      </div>

      <OrderFormModal
        open={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onSubmit={placeOrderWhatsApp}
        title="Your details for order"
        submitLabel="Send order on WhatsApp"
      />
    </div>
  );
}
