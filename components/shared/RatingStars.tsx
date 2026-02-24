import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export default function RatingStars({
  rating,
  max = 5,
  size = "md",
  className,
}: RatingStarsProps) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = max - full - half;
  const iconSize = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <div className={cn("flex items-center gap-0.5", className)} aria-label={`Rating: ${rating} out of ${max}`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`full-${i}`} className={cn(iconSize, "fill-offer text-offer")} aria-hidden />
      ))}
      {half > 0 && (
        <Star
          className={cn(iconSize, "fill-offer text-offer")}
          style={{ clipPath: "inset(0 50% 0 0)" }}
          aria-hidden
        />
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} className={cn(iconSize, "text-border")} aria-hidden />
      ))}
    </div>
  );
}
