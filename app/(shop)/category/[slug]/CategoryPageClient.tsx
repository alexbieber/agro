"use client";

import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FilterSidebar, { FilterState } from "@/components/shared/FilterSidebar";
import ProductCard from "@/components/shared/ProductCard";
import { LayoutGrid, List } from "lucide-react";
import { Product, type ProductCategory } from "@/lib/types/product";

type SortOption = "relevance" | "price-asc" | "price-desc" | "newest" | "rating" | "bestseller";

const defaultFilters: FilterState = {
  priceRange: [0, 100000],
  brands: [],
  rating: "all",
  inStockOnly: false,
};

export default function CategoryPageClient({
  category,
  initialProducts,
  categoryBrands,
}: {
  category: { id: string; name: string; slug: string };
  initialProducts: Product[];
  categoryBrands: string[];
}) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sort, setSort] = useState<SortOption>("relevance");
  const [listView, setListView] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 12;

  const filtered = useMemo(() => {
    let list = [...initialProducts];
    const [minP, maxP] = filters.priceRange;
    list = list.filter((p) => p.price >= minP && p.price <= maxP);
    if (filters.brands.length) list = list.filter((p) => filters.brands.includes(p.brand));
    if (filters.rating !== "all") {
      const r = Number(filters.rating);
      list = list.filter((p) => p.rating >= r);
    }
    if (filters.inStockOnly) list = list.filter((p) => p.stock > 0);
    if (filters.emiAvailable && category.id === "machinery") {
      list = list.filter((p) => p.price > 10000);
    }
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sort === "bestseller") list.sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [initialProducts, filters, sort, category.id]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const activeChips = [
    filters.brands.length ? `Brands: ${filters.brands.length}` : null,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 100000 ? "Price" : null,
    filters.rating !== "all" ? `${filters.rating}★+` : null,
    filters.inStockOnly ? "In stock" : null,
  ].filter(Boolean);

  return (
    <div className="flex gap-6">
      <FilterSidebar
        category={category.id as ProductCategory}
        brands={categoryBrands}
        filters={filters}
        onFiltersChange={setFilters}
        resultCount={filtered.length}
      />

      <div className="flex-1 min-w-0">
        <p className="text-muted-foreground mb-2">
          Showing {filtered.length} results for {category.name}
        </p>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-asc">Price Low-High</SelectItem>
              <SelectItem value="price-desc">Price High-Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="bestseller">Best Seller</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex border rounded-md overflow-hidden">
            <button
              type="button"
              onClick={() => setListView(false)}
              className={`p-2 ${!listView ? "bg-primary text-white" : "bg-card"}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setListView(true)}
              className={`p-2 ${listView ? "bg-primary text-white" : "bg-card"}`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {activeChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeChips.map((label) => (
              <span
                key={String(label)}
                className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs"
              >
                {label}
              </span>
            ))}
            <button
              type="button"
              onClick={() => setFilters(defaultFilters)}
              className="text-sm text-primary hover:underline"
            >
              Clear All
            </button>
          </div>
        )}

        <div
          className={
            listView
              ? "grid grid-cols-1 gap-4 max-w-2xl"
              : "grid grid-cols-2 gap-4 md:grid-cols-4"
          }
        >
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-muted-foreground">
            <p>No products match your filters.</p>
            <button
              type="button"
              onClick={() => setFilters(defaultFilters)}
              className="mt-2 text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded border border-border px-4 py-2 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="flex items-center px-4 text-sm">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded border border-border px-4 py-2 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
