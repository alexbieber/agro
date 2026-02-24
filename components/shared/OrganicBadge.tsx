import { cn } from "@/lib/utils";

interface OrganicBadgeProps {
  className?: string;
}

export default function OrganicBadge({ className }: OrganicBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-medium text-white bg-success",
        className
      )}
    >
      🌿 ORGANIC
    </span>
  );
}
