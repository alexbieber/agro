import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, WHATSAPP_NUMBER } from "@/lib/config";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: `Contact — ${SITE_NAME}`,
  description: "Get in touch with Nandi Agrotech. Phone, WhatsApp, email and address in Turuvekere, Karnataka.",
};

export default function ContactPage() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div>
      <section className="bg-primary-dark text-white py-14 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-heading font-normal">Contact us</h1>
          <p className="mt-3 text-lg opacity-90 max-w-xl mx-auto">
            Call, WhatsApp or visit us in Turuvekere. We’re here to help with orders and enquiries.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Contact</span>
        </nav>

        <div className="max-w-2xl mx-auto space-y-8">
          <div className="rounded-xl border border-border bg-muted/40 p-6 sm:p-8 space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-heading font-normal text-foreground">Address</p>
                <p className="text-muted-foreground mt-1">Turuvekere – 572227, Karnataka</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-heading font-normal text-foreground">Phone</p>
                <ul className="text-muted-foreground mt-1 space-y-1 text-sm">
                  <li>Kiran Kumar <a href="tel:+916366542135" className="text-primary hover:underline">(+91) 6366542135</a></li>
                  <li>G R Rangegowda <a href="tel:+919448536281" className="text-primary hover:underline">(+91) 9448536281</a></li>
                  <li>Chetan <a href="tel:+919900505856" className="text-primary hover:underline">(+91) 9900505856</a></li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-heading font-normal text-foreground">Email</p>
                <a href="mailto:nandiagrotech363@gmail.com" className="text-primary hover:underline text-sm">nandiagrotech363@gmail.com</a>
              </div>
            </div>
          </div>

          <div className="text-center">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg" className="gap-2">Chat on WhatsApp</Button>
            </a>
            <p className="text-sm text-muted-foreground mt-3">Fastest response during business hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
