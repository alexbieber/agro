"use client";

import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { brands } from "@/lib/data/brands";
import { cn } from "@/lib/utils";

const megaMenuData: Record<
  string,
  { subCategories: string[]; featured: { title: string; subtitle: string }; brandKey: keyof typeof brands }
> = {
  irrigation: {
    subCategories: [
      "Drip Irrigation Kits",
      "Sprinkler Systems",
      "Water Pumps",
      "Pipes & Fittings",
      "Filters & Valves",
    ],
    featured: { title: "Drip & irrigation", subtitle: "Pipes, pumps, kits" },
    brandKey: "irrigation",
  },
  machinery: {
    subCategories: [
      "Power Weeders",
      "Mini Tillers",
      "Sprayers",
      "Threshers",
      "Chaff Cutters",
    ],
    featured: { title: "EMI options", subtitle: "Enquire on WhatsApp" },
    brandKey: "machinery",
  },
};

export default function MegaMenu() {
  return (
    <nav className="hidden border-b border-border bg-card md:block" aria-label="Main categories">
      <div className="container mx-auto flex items-center justify-center gap-1 px-4 py-2">
        {categories.map((cat) => {
          const data = megaMenuData[cat.id];
          const brandList = data ? brands[data.brandKey] : [];
          return (
            <div
              key={cat.id}
              className="group relative py-3"
            >
              <Link
                href={`/category/${cat.slug}`}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-primary hover:text-primary"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
              {/* Dropdown */}
              <div
                className={cn(
                  "invisible absolute left-0 top-full z-50 min-w-[320px] rounded-b-md border border-t-0 border-border bg-card py-4 shadow-lg opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100"
                )}
              >
                <div className="grid grid-cols-3 gap-4 px-4">
                  <div className="col-span-2">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                      Sub-categories
                    </p>
                    <ul className="space-y-1">
                      {data?.subCategories.map((sub) => (
                        <li key={sub}>
                          <Link
                            href={`/category/${cat.slug}?sub=${encodeURIComponent(sub)}`}
                            className="block text-sm text-text-primary hover:text-primary hover:underline"
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                      Featured
                    </p>
                    <div className="rounded-md bg-primary/10 p-3">
                      <p className="text-sm font-medium text-primary">
                        {data?.featured.title}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {data?.featured.subtitle}
                      </p>
                    </div>
                    <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                      Brands
                    </p>
                    <ul className="mt-1 space-y-1">
                      {brandList.map((b) => (
                        <li key={b}>
                          <Link
                            href={`/category/${cat.slug}?brand=${encodeURIComponent(b)}`}
                            className="text-sm text-text-primary hover:text-primary hover:underline"
                          >
                            {b}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
