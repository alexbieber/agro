import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Privacy Policy — ${SITE_NAME}`,
  description: "Privacy policy for Nandee Agrotech. How we collect, use and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Privacy Policy</span>
      </nav>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-heading font-normal text-foreground mb-6">Privacy policy</h1>

        <div className="space-y-6 text-foreground leading-relaxed">
          <section>
            <h2 className="text-xl font-heading font-normal text-foreground mb-2">Information we collect</h2>
            <p>When you place an order or contact us (by phone, WhatsApp, or through this site), we may collect your name, phone number, email, address and order details. We use this to process orders, respond to enquiries and improve our service.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-normal text-foreground mb-2">How we use it</h2>
            <p>We use your information only to fulfil orders, communicate with you about your order or enquiry, and send occasional updates or offers if you have subscribed. We do not sell your data to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-normal text-foreground mb-2">Storage and security</h2>
            <p>We keep your data only as long as needed for orders and support. Contact and order details may be stored in our systems and on WhatsApp as part of our conversations. We take reasonable steps to keep your information secure.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-normal text-foreground mb-2">Cookies and site data</h2>
            <p>This site may use cookies or local storage to remember your preferences (e.g. cart, saved details in forms). You can clear these in your browser settings.</p>
          </section>
          <section>
            <h2 className="text-xl font-heading font-normal text-foreground mb-2">Contact</h2>
            <p>For questions about this policy or your data, contact us at <a href="mailto:nandiagrotech363@gmail.com" className="text-primary hover:underline">nandiagrotech363@gmail.com</a> or via the contact page.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
