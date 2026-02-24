import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const points = [
  "Discuss margins and territory with our team",
  "Full range: irrigation, sprayers, pumps, machinery",
  "Quick response on WhatsApp for dealer enquiries",
];

export default function DistributorCTA() {
  return (
    <section className="bg-primary-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-heading font-normal">Become a distributor</h2>
          <p className="mt-2 opacity-90">
            Sell Nandi Agrotech products in your area. We’ll work with you on pricing and delivery.
          </p>
          <ul className="mt-4 space-y-2 text-left inline-block">
            {points.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary-light shrink-0" aria-hidden />
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <Link href="/distributor" className="mt-6 inline-block">
            <Button
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              Enquire on WhatsApp
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
