import Link from "next/link";
import { products } from "@/lib/data/products";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";

/** First 10 products matching the site’s “Our Collections” list (hose pipes + portable/HTP sprayers). */
const featuredSlugs = [
  "hose-pipe-rapl-hp-10-100",
  "hose-pipe-rapl-hp-8-5-100-1-4",
  "hose-pipe-rapl-hp-8-5-50-1-2",
  "hose-pipe-rapl-hp-8-5-50-1-4",
  "portable-power-sprayer-rapl-pps-50g",
  "portable-power-sprayer-rapl-pops-139g",
  "portable-power-sprayer-rapl-pops-35g",
  "portable-power-sprayer-rapl-ps-26a",
  "htp-sprayer-set-rapl-ps-26a",
  "hit-sprayer-set-rapl-ps-26a",
];

export default function OurCollections() {
  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <section className="py-12 border-t border-border bg-muted/20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-heading font-normal text-foreground mb-2 text-center">
          Our collections
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          Hose pipes, sprayers, pumps and farm machinery – browse by category or see everything.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {featured.map((product) => (
            <ProductCard key={product!.id} product={product!} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/collection">
            <Button className="bg-primary text-white hover:bg-primary/90">
              View full collection
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
