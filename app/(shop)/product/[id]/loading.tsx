export default function ProductLoading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="h-5 w-64 bg-muted rounded animate-pulse mb-6" />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="aspect-square bg-muted rounded-lg animate-pulse" />
        <div className="space-y-4">
          <div className="h-6 w-1/3 bg-muted rounded animate-pulse" />
          <div className="h-8 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-10 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
