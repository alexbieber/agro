"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Building2,
  Search,
  ShoppingCart,
} from "lucide-react";
import { WHATSAPP_NUMBER, SITE_NAME } from "@/lib/config";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MegaMenu from "./MegaMenu";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data/categories";

const MOCK_SUGGESTIONS = [
  "Hose pipe",
  "Water pump",
  "Power sprayer",
  "Power weeder",
  "Brush cutter",
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-5 w-5", className)}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const { wishlist } = useWishlist();
  const { cartCount } = useCart();

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary-dark px-4 py-1 text-xs text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-1">
            🚚 Free delivery on orders above ₹1,499 across India
          </span>
          <div className="flex items-center gap-4">
            <Link
              href="/distributor"
              className="hover:underline"
            >
              Become a Distributor
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <span className="text-3xl">🌾</span>
              <span className="font-heading text-xl md:text-2xl font-bold text-primary">
                {SITE_NAME}
              </span>
            </Link>

            {/* Search - center on desktop */}
            <div className="relative flex-1 max-w-xl mx-auto w-full">
              <div className="flex rounded-md border border-border bg-background overflow-hidden">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px] shrink-0 border-0 bg-muted/50 rounded-none focus:ring-0">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Search hose pipes, sprayers, weeders, machinery..."
                  className="border-0 focus-visible:ring-0 rounded-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                />
                <Link href={`/search?q=${encodeURIComponent(searchQuery)}`}>
                  <Button
                    type="button"
                    size="icon"
                    className="rounded-none bg-primary hover:bg-primary/90 shrink-0"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              {searchFocused && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 rounded-md border border-border bg-card py-2 shadow-lg">
                  {MOCK_SUGGESTIONS.slice(0, 5).map((s) => (
                    <Link
                      key={s}
                      href={`/search?q=${encodeURIComponent(s)}`}
                      className="block px-4 py-2 text-sm text-text-primary hover:bg-muted"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Action icons - hidden on small mobile, show in nav */}
            <div className="hidden items-center gap-1 md:flex">
              <Link href="/collection" className="hidden lg:block">
                <Button variant="ghost" size="sm" className="gap-1 text-text-secondary">
                  Collection
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="gap-1 text-text-secondary relative">
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden lg:inline">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/wishlist">
                <Button variant="ghost" size="sm" className="gap-1 text-text-secondary relative">
                  <Heart className="h-4 w-4" />
                  <span className="hidden lg:inline">Wishlist</span>
                  {wishlist.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-offer text-[10px] font-medium text-white">
                      {wishlist.length}
                    </span>
                  )}
                </Button>
              </Link>

              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="whatsapp"
                  size="sm"
                  className="gap-1 rounded-full"
                  aria-label="Chat on WhatsApp"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  <span className="hidden lg:inline">WhatsApp</span>
                </Button>
              </a>

              <Link href="/distributor">
                <Button variant="outline" size="sm" className="gap-1 border-primary text-primary">
                  <Building2 className="h-4 w-4" />
                  <span className="hidden lg:inline">Distributor</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <MegaMenu />
      </header>

      <MobileNav />
    </>
  );
}
