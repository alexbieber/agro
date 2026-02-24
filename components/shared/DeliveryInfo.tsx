import { Truck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeliveryInfoProps {
  freeDeliveryAbove?: number;
  estimatedDays?: string;
  heavyItem?: boolean;
  className?: string;
}

export default function DeliveryInfo({
  freeDeliveryAbove = 1499,
  estimatedDays = "5–7 business days",
  heavyItem,
  className,
}: DeliveryInfoProps) {
  return (
    <div className={cn("space-y-1 text-sm text-text-secondary", className)}>
      <p className="flex items-center gap-2">
        <Truck className="h-4 w-4 text-primary" aria-hidden />
        Delivery across India
      </p>
      <p className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" aria-hidden />
        Estimated: {estimatedDays}
      </p>
      <p>Free delivery above ₹{freeDeliveryAbove.toLocaleString("en-IN")}</p>
      {heavyItem && (
        <p className="text-xs">Heavy item — delivery timeline shared on WhatsApp</p>
      )}
    </div>
  );
}
