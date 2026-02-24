import Link from "next/link";
import { products } from "@/lib/data/products";
import ProductCard from "@/components/shared/ProductCard";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const irrigationDeals = products.filter((p) => p.category === "irrigation").slice(0, 4);
const machineryDeals = products.filter((p) => p.category === "machinery").slice(0, 4);

export default function OffersPage() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div>
      <div className="container mx-auto px-4 pt-6 pb-2">
        <nav className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Offers</span>
        </nav>
      </div>
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-heading font-normal">Offers</h1>
          <p className="mt-2 opacity-90">Need a custom quote? Chat with us on WhatsApp.</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
            <Button variant="secondary" className="bg-white text-primary hover:bg-white/90 gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 space-y-12">
        <section>
          <h2 className="text-xl font-heading font-normal text-foreground mb-4">Irrigation</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {irrigationDeals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-heading font-normal text-foreground mb-4">Farm machinery</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {machineryDeals.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-heading font-normal text-foreground mb-4">Bulk enquiry</h2>
          <p className="text-muted-foreground mb-4">WhatsApp us for volume pricing.</p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
