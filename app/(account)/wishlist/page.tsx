"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/lib/data/products";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="mx-auto h-16 w-16 text-muted-foreground" strokeWidth={1} />
        <h1 className="mt-4 text-2xl font-heading font-normal text-foreground">Wishlist</h1>
        <p className="mt-2 text-muted-foreground">Save items you like and enquire on WhatsApp when you’re ready.</p>
        <Link href="/">
          <Button className="mt-6">Browse products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-heading font-normal text-foreground mb-6">
        Saved products ({wishlistProducts.length})
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
