"use client";

import { useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import type { ProductCategory } from "@/lib/types/product";
import { cn } from "@/lib/utils";

export interface FilterState {
  priceRange: [number, number];
  brands: string[];
  rating: string;
  inStockOnly: boolean;
  // Category-specific
  cropType?: string[];
  seedType?: string[];
  season?: string[];
  packSize?: string[];
  productType?: string[];
  certification?: string[];
  systemType?: string[];
  coverageArea?: string[];
  machineType?: string[];
  powerSource?: string[];
  hpRange?: string[];
  emiAvailable?: boolean;
}

const defaultFilters: FilterState = {
  priceRange: [0, 100000],
  brands: [],
  rating: "all",
  inStockOnly: false,
};

const categoryFilters: Record<
  ProductCategory,
  { label: string; key: keyof FilterState; options: string[] }[]
> = {
  irrigation: [
    { label: "System Type", key: "systemType", options: ["Drip", "Sprinkler", "Rain Gun", "Micro-Sprinkler"] },
    { label: "Coverage Area", key: "coverageArea", options: ["Up to 0.5 acre", "1 acre", "2 acres", "5 acres+"] },
    { label: "Brand", key: "brands", options: ["Netafim", "Jain", "Finolex", "Generic"] },
  ],
  machinery: [
    { label: "Machine Type", key: "machineType", options: ["Power Weeder", "Tiller", "Sprayer", "Thresher", "Chaff Cutter"] },
    { label: "Power Source", key: "powerSource", options: ["Electric", "Petrol", "Diesel", "Battery"] },
    { label: "HP Range", key: "hpRange", options: ["<1HP", "1-5HP", "5-10HP", "10HP+"] },
  ],
};

interface FilterSidebarProps {
  category: ProductCategory;
  brands: string[];
  filters: FilterState;
  onFiltersChange: (f: FilterState) => void;
  resultCount: number;
  className?: string;
}

function FilterSidebarInner({
  category,
  brands,
  filters,
  onFiltersChange,
  className,
}: Omit<FilterSidebarProps, "resultCount">) {
  const update = useCallback(
    (patch: Partial<FilterState>) => {
      onFiltersChange({ ...filters, ...patch });
    },
    [filters, onFiltersChange]
  );

  const toggleArray = (key: keyof FilterState, value: string) => {
    const arr = (filters[key] as string[] | undefined) ?? [];
    const next = arr.includes(value)
      ? arr.filter((x) => x !== value)
      : [...arr, value];
    update({ [key]: next });
  };

  const catFilters = categoryFilters[category] ?? [];

  return (
    <aside className={cn("w-full", className)}>
      <Accordion type="multiple" defaultValue={["price", "brand", "rating", "stock"]} className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <Slider
              value={filters.priceRange}
              onValueChange={(v) => update({ priceRange: v as [number, number] })}
              min={0}
              max={100000}
              step={500}
              className="mt-2"
            />
            <p className="mt-2 text-xs text-text-secondary">
              ₹{filters.priceRange[0].toLocaleString("en-IN")} – ₹{filters.priceRange[1].toLocaleString("en-IN")}
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="brand">
          <AccordionTrigger>Brand</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((b) => (
                <label key={b} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(b)}
                    onChange={() => toggleArray("brands", b)}
                    className="rounded border-border"
                  />
                  <span className="text-sm">{b}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            {["4", "3", "all"].map((r) => (
              <label key={r} className="flex items-center gap-2 cursor-pointer mb-2">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === r}
                  onChange={() => update({ rating: r })}
                  className="border-border"
                />
                <span className="text-sm">{r === "all" ? "All" : `${r}★+`}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="stock">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) => update({ inStockOnly: e.target.checked })}
                className="rounded border-border"
              />
              <span className="text-sm">In Stock only</span>
            </label>
          </AccordionContent>
        </AccordionItem>
        {category === "machinery" && (
          <AccordionItem value="emi">
            <AccordionTrigger>EMI Available</AccordionTrigger>
            <AccordionContent>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!filters.emiAvailable}
                  onChange={(e) => update({ emiAvailable: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-sm">Show EMI options</span>
              </label>
            </AccordionContent>
          </AccordionItem>
        )}
        {catFilters.map((section) => (
          <AccordionItem key={section.label} value={section.label}>
            <AccordionTrigger>{section.label}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {section.options.map((opt) => {
                  const key = section.key;
                  const arr = (filters[key] as string[] | undefined) ?? [];
                  const checked = arr.includes(opt);
                  return (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleArray(key, opt)}
                        className="rounded border-border"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
}

export default function FilterSidebar(props: FilterSidebarProps) {
  const { resultCount, category } = props;

  return (
    <>
      {/* Desktop */}
      <div className="hidden w-72 shrink-0 md:block">
        <div className="sticky top-24">
          <FilterSidebarInner {...props} />
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full"
            onClick={() => props.onFiltersChange(defaultFilters)}
          >
            Clear All
          </Button>
        </div>
      </div>
      {/* Mobile */}
      <Sheet>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters ({resultCount})
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
          <FilterSidebarInner {...props} />
          <Button
            variant="outline"
            size="sm"
            className="mt-4 w-full"
            onClick={() => props.onFiltersChange(defaultFilters)}
          >
            Clear All
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}
