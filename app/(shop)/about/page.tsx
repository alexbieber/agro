import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, WHATSAPP_NUMBER } from "@/lib/config";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: `About — ${SITE_NAME}`,
  description:
    "Nandee Agrotech supplies irrigation, sprayers and farm machinery from Turuvekere. Family-run, focused on fair prices and reliable support.",
};

const WHY_US = [
  { title: "Vetted products", text: "We only stock items we’d recommend to our own neighbours." },
  { title: "Simple ordering", text: "Order on the site or by phone/WhatsApp. We’ll help with sizing and bulk pricing." },
  { title: "Real support", text: "We’re in Turuvekere. Call, visit or message – we respond and fix issues." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero – matches Offers / Distributor */}
      <section className="bg-primary-dark text-white py-14 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-normal">About Nandee Agrotech</h1>
          <p className="mt-3 text-lg opacity-90 max-w-xl mx-auto">
            Based in Turuvekere, Karnataka – irrigation, sprayers and farm machinery you can rely on.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">About</span>
        </nav>

        <div className="max-w-2xl mx-auto">
          <section className="space-y-4">
            <p className="text-foreground leading-relaxed">
              We sell irrigation equipment – hose pipes, water pumps – plus sprayers, weeders and other farm machinery. The brands we stock are ones we’ve used and trust.
            </p>
            <p className="text-foreground leading-relaxed">
              Browse and order online, or call / WhatsApp for quotes and bulk orders. We deliver across the region and work with dealers who want to retail our range.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-xl font-heading font-normal text-foreground mb-3">What we do</h2>
            <p className="text-foreground leading-relaxed">
              We keep prices fair and give clear, practical support. If something doesn’t suit or there’s an issue, we sort it. We’re easy to reach – contact details are on every page.
            </p>
          </section>

          {/* Why work with us – same card grid as home WhyChoose */}
          <section className="mt-14">
            <h2 className="text-xl font-heading font-normal text-foreground mb-6 text-center">Why work with us</h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {WHY_US.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-border bg-card p-6 text-center shadow-sm"
                >
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact – full-width strip for emphasis */}
          <section className="mt-14 pt-10 border-t border-border">
            <h2 className="text-xl font-heading font-normal text-foreground mb-6 text-center">Visit or get in touch</h2>
            <div className="rounded-xl border border-border bg-muted/40 p-6 sm:p-8 max-w-2xl mx-auto">
              <div className="grid gap-5 sm:grid-cols-1">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">Turuvekere – 572227, Karnataka</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground mb-1">Phone</p>
                    <ul className="text-muted-foreground space-y-1 text-sm">
                      <li>Kiran Kumar <a href="tel:+916366542135" className="text-primary hover:underline">(+91) 6366542135</a></li>
                      <li>G R Rangegowda <a href="tel:+919448536281" className="text-primary hover:underline">(+91) 9448536281</a></li>
                      <li>Chetan <a href="tel:+919900505856" className="text-primary hover:underline">(+91) 9900505856</a></li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:nandiagrotech363@gmail.com" className="text-primary hover:underline text-sm">nandiagrotech363@gmail.com</a>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-border text-center">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="whatsapp" className="gap-2">Chat on WhatsApp</Button>
                </a>
                <Link href="/collection" className="ml-3 inline-block">
                  <Button variant="outline">Browse collection</Button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
