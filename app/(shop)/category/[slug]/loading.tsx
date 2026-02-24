import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";

export default function CategoryLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="h-5 w-48 bg-muted rounded animate-pulse mb-6" />
      <div className="flex gap-6">
        <div className="hidden md:block w-72 shrink-0 space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-muted rounded animate-pulse" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 flex-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
