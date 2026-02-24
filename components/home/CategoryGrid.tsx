import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data/categories";
import { products } from "@/lib/data/products";
import { categoryImages } from "@/lib/data/productImages";
import { cn } from "@/lib/utils";

export default function CategoryGrid() {
  const countByCategory = products.reduce(
    (acc, p) => {
      acc[p.category] = (acc[p.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-heading font-normal text-foreground mb-6">Shop by category</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {categories.map((cat) => {
            const img = categoryImages[cat.id as keyof typeof categoryImages];
            return (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="group relative flex flex-col rounded-xl overflow-hidden min-h-[220px] transition-transform hover:-translate-y-1 hover:shadow-xl"
              >
                {img && (
                  <Image
                    src={img}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                )}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent",
                  !img && "bg-muted"
                )} />
                <div className="relative flex flex-1 flex-col justify-end p-6 text-white">
                  <span className="text-3xl drop-shadow-sm">{cat.icon}</span>
                  <h3 className="mt-2 font-semibold text-lg">{cat.name}</h3>
                  <p className="mt-1 text-sm text-white/90">{cat.description}</p>
                  <p className="mt-2 text-sm font-medium text-primary-light">
                    {countByCategory[cat.id] ?? 0} products
                  </p>
                  <span className="mt-2 text-sm font-medium text-primary-light group-hover:underline">Explore →</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
