import { cn } from "@/lib/utils";

export default function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg border border-border bg-card overflow-hidden animate-pulse", className)}>
      <div className="aspect-square bg-muted" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-1/4 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-3 w-2/3 bg-muted rounded" />
        <div className="h-4 w-20 bg-muted rounded" />
        <div className="h-9 w-full bg-muted rounded mt-2" />
      </div>
    </div>
  );
}
