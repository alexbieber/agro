import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Terms — ${SITE_NAME}`,
  description: "Terms of use for Nandi Agrotech website and orders.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Terms</span>
      </nav>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading font-normal text-foreground mb-6">Terms of use</h1>

        <div className="space-y-6 text-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-heading font-normal text-foreground mb-2">Use of this site</h2>
            <p>This website is operated by Nandi Agrotech. By using the site you agree to use it only for lawful purposes and for browsing, enquiring or ordering agricultural equipment and related products.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-normal text-foreground mb-2">Orders and payment</h2>
            <p>Orders are confirmed only after we acknowledge them (by phone or WhatsApp). Payment terms, delivery and pricing will be communicated at the time of order. Prices on the site are indicative; we may quote different prices for bulk or custom orders.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-normal text-foreground mb-2">Product information</h2>
            <p>We try to keep product details accurate. Images and descriptions are for reference; actual products may vary. For technical or sizing questions, contact us before ordering.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-normal text-foreground mb-2">Returns and disputes</h2>
            <p>Our return policy is described on the Return Policy page. Any disputes will be handled in good faith; you can contact us via the details on the Contact page.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-normal text-foreground mb-2">Changes</h2>
            <p>We may update these terms from time to time. Continued use of the site after changes means you accept the updated terms.</p>
          </section>
          <section>
            <p className="text-muted-foreground text-sm">For questions, see our <Link href="/contact" className="text-primary hover:underline">Contact</Link> page.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
