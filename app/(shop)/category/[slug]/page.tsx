import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { brands } from "@/lib/data/brands";
import CategoryPageClient from "./CategoryPageClient";
import type { ProductCategory } from "@/lib/types/product";
import { SITE_NAME } from "@/lib/config";

const VALID_SLUGS: ProductCategory[] = ["irrigation", "machinery"];

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = categories.find((c) => c.slug === params.slug);
  if (!category) return { title: "Category" };
  return {
    title: `${category.name} — ${SITE_NAME}`,
    description: category.description,
  };
}

export default function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { sub?: string; brand?: string };
}) {
  const { slug } = params;
  if (!VALID_SLUGS.includes(slug as ProductCategory)) notFound();

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  let categoryProducts = products.filter((p) => p.category === slug);

  const sub = searchParams.sub?.trim();
  if (sub) {
    const lower = sub.toLowerCase();
    categoryProducts = categoryProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower)
    );
  }
  const brand = searchParams.brand?.trim();
  if (brand) {
    categoryProducts = categoryProducts.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());
  }

  const categoryBrands = brands[slug as keyof typeof brands] ?? [];

  return (
    <div className="container mx-auto px-4 py-6">
      <nav className="text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-normal text-foreground">{category.name}</h1>
        <p className="text-muted-foreground mt-1">{category.description}</p>
        {sub && (
          <p className="text-sm text-muted-foreground mt-2">Filtered by: {sub}</p>
        )}
      </div>
      <CategoryPageClient
        category={category}
        initialProducts={categoryProducts}
        categoryBrands={categoryBrands}
      />
    </div>
  );
}
