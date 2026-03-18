import Link from "next/link";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  MessageCircle,
  CreditCard,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

const nav = [
  { href: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/products", label: "Products", icon: Package },
  { href: "/seller/orders", label: "Orders", icon: ShoppingBag },
  { href: "/seller/leads", label: "WhatsApp Leads", icon: MessageCircle },
  { href: "/seller/payments", label: "Payments", icon: CreditCard },
  { href: "/seller/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/seller/distributors", label: "Distributors", icon: Users },
  { href: "/seller/settings", label: "Settings", icon: Settings },
];

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 shrink-0 border-r border-border bg-card p-4">
        <Link href="/seller/dashboard" className="flex items-center gap-2 font-bold text-primary mb-6">
          Nandee Agrotech Admin
        </Link>
        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-primary hover:bg-muted"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-6 bg-background">{children}</main>
    </div>
  );
}
