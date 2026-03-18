import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, WHATSAPP_NUMBER } from "@/lib/config";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: `Return Policy — ${SITE_NAME}`,
  description: "Return and refund policy for Nandee Agrotech. Contact us on WhatsApp for returns and replacements.",
};

export default function ReturnsPage() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Return Policy</span>
      </nav>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading font-normal text-foreground mb-6">Return policy</h1>

        <div className="prose prose-neutral max-w-none space-y-6 text-foreground">
          <p className="leading-relaxed">
            We want you to be satisfied with your purchase. If an item is defective, damaged in transit, or not as described, please contact us within 3 days of delivery.
          </p>
          <p className="leading-relaxed">
            Reach us on WhatsApp with your order details and a photo of the issue. We’ll arrange a return or replacement as appropriate. For large or heavy equipment, we may arrange a visit or pickup.
          </p>
          <p className="leading-relaxed">
            Refunds are processed after we receive and inspect the product. This usually takes 5–7 business days from when we receive the item.
          </p>
          <p className="leading-relaxed text-muted-foreground text-sm">
            For questions about a specific return, WhatsApp us with your order reference and we’ll help you through the process.
          </p>
        </div>

        <div className="mt-10">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp" className="gap-2">Start a return on WhatsApp</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
