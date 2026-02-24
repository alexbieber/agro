"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, MessageCircle, Heart, ShoppingCart } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/collection", label: "Collection", icon: Package },
  { href: "/cart", label: "Cart", icon: ShoppingCart, badge: "cartCount" as const },
  { href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp", icon: MessageCircle, external: true },
  { href: "/wishlist", label: "Wishlist", icon: Heart, badge: "wishlist" as const },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { wishlist } = useWishlist();
  const { cartCount } = useCart();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-card py-2 md:hidden"
      aria-label="Mobile navigation"
    >
      {navItems.map((item) => {
        const isWhatsApp = item.external;
        const isActive = !item.external && pathname === item.href;
        const showBadge =
          (item.badge === "wishlist" && wishlist.length > 0) ||
          (item.badge === "cartCount" && cartCount > 0);
        const badgeCount = item.badge === "cartCount" ? cartCount : item.badge === "wishlist" ? wishlist.length : 0;

        const content = (
          <>
            {isWhatsApp ? (
              <span className={cn("rounded-full p-2", isWhatsApp && "bg-whatsapp text-white")}>
                <WhatsAppIcon />
              </span>
            ) : (
              <item.icon
                className={cn(
                  "h-6 w-6",
                  isActive ? "text-primary" : "text-text-secondary"
                )}
              />
            )}
            <span className={cn(
              "text-[10px]",
              isActive && !isWhatsApp ? "text-primary font-medium" : "text-text-secondary"
            )}>
              {item.label}
            </span>
            {showBadge && (
              <span className={cn(
                "absolute -top-0.5 right-1/4 flex h-3.5 w-3.5 items-center justify-center rounded-full text-[9px] font-medium text-white",
                item.badge === "cartCount" ? "bg-primary" : "bg-offer"
              )}>
                {badgeCount > 99 ? "99+" : badgeCount}
              </span>
            )}
          </>
        );

        const className = "flex flex-col items-center gap-0.5 relative px-3 py-1 rounded-md hover:bg-muted";

        if (item.external) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              aria-label="Chat on WhatsApp"
            >
              {content}
            </a>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={className}
            aria-current={isActive ? "page" : undefined}
          >
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
