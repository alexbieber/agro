import { formatPrice } from "@/lib/utils/formatPrice";
import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  price: number;
  mrp?: number;
  discount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PriceDisplay({
  price,
  mrp,
  discount,
  size = "md",
  className,
}: PriceDisplayProps) {
  const sizeClass =
    size === "sm"
      ? "text-sm"
      : size === "lg"
      ? "text-xl"
      : "text-base";

  return (
    <div className={cn("flex flex-wrap items-center gap-2", sizeClass, className)}>
      {price > 0 ? (
        <span className="font-bold text-primary">{formatPrice(price)}</span>
      ) : (
        <span className="font-bold text-primary">Contact for price</span>
      )}
      {mrp != null && mrp > price && (
        <span className="text-text-secondary line-through">{formatPrice(mrp)}</span>
      )}
      {discount != null && discount > 0 && (
        <span className="font-semibold text-offer">{discount}% off</span>
      )}
    </div>
  );
}
