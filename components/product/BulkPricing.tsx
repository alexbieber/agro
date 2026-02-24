import { Product } from "@/lib/types/product";
import { formatPrice } from "@/lib/utils/formatPrice";
import { cn } from "@/lib/utils";

export default function BulkPricing({ product }: { product: Product }) {
  const tiers = product.bulkPricingTiers ?? [];

  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <h4 className="font-semibold text-text-primary mb-3">Bulk / Distributor Pricing</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="py-2 text-left font-medium">Quantity</th>
              <th className="py-2 text-left font-medium">Price/Unit</th>
              <th className="py-2 text-left font-medium">You Save</th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier, i) => {
              const range =
                tier.maxQty != null
                  ? `${tier.minQty}–${tier.maxQty} units`
                  : `${tier.minQty}+ units`;
              const isBest = tier.savings != null && tier.savings > 0 && i === tiers.length - 1;
              return (
                <tr
                  key={i}
                  className={cn(
                    "border-b border-border",
                    isBest && "bg-primary/10"
                  )}
                >
                  <td className="py-2">{range}</td>
                  <td className="py-2 font-medium text-primary">{formatPrice(tier.price)}</td>
                  <td className="py-2">
                    {tier.savings != null ? formatPrice(tier.savings) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-text-secondary">
        For larger quantities, contact us on WhatsApp for custom pricing.
      </p>
    </div>
  );
}
