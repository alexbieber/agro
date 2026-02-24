import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import ImageGallery from "@/components/product/ImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductTabs from "@/components/product/ProductTabs";
import ProductCard from "@/components/shared/ProductCard";
import ProductPageClient from "./ProductPageClient";
import { SITE_NAME, SITE_URL } from "@/lib/config";
import { productImages } from "@/lib/data/productImages";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = products.find((p) => p.id === params.id);
  if (!product) return { title: "Product" };
  return {
    title: `${product.name} — Buy on WhatsApp | ${SITE_NAME}`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} | ${SITE_NAME}`,
      description: product.description.slice(0, 160),
      url: `${SITE_URL}/product/${product.id}`,
    },
  };
}

export default function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = products.find((p) => p.id === params.id);
  if (!product) notFound();

  const sameCategory = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);
  const alsoEnquired = products.filter(
    (p) => p.category !== product.category
  ).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    image: productImages[product.id] || (product.images?.[0]?.startsWith("http") ? product.images[0] : `${SITE_URL}/og.png`),
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="text-sm text-muted-foreground mb-4">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/category/${product.category}`} className="hover:text-primary capitalize">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground line-clamp-1">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr,1fr] lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ImageGallery product={product} />
        </div>
        <div>
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <ProductTabs product={product} />
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-heading font-normal text-foreground mb-4">More from Nandi Agrotech</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {sameCategory.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-heading font-normal text-foreground mb-4">Customers also enquired about</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {alsoEnquired.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <ProductPageClient currentProductId={product.id} category={product.category} />
    </div>
  );
}
