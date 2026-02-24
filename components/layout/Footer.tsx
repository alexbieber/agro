import Link from "next/link";
import { SITE_NAME, SITE_URL, WHATSAPP_NUMBER, YOUTUBE_CHANNEL_URL } from "@/lib/config";
import { Facebook, Instagram, Mail, Youtube } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <footer className="bg-primary-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 - Nandi Agrotech */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌾</span>
              <span className="font-heading font-bold text-lg">{SITE_NAME}</span>
            </div>
            <p className="mt-2 text-sm opacity-80">
              We supply irrigation systems, sprayers, pumps and farm machinery in Turuvekere and across Karnataka. Good prices, reliable support.
            </p>
            <p className="mt-2 text-sm opacity-80">
              Turuvekere – 572227
            </p>
            <p className="mt-2 text-sm opacity-90 flex items-center gap-1">
              <Mail className="h-4 w-4 shrink-0" />
              <a href="mailto:nandiagrotech363@gmail.com" className="hover:underline">nandiagrotech363@gmail.com</a>
            </p>
            <p className="mt-1 text-sm opacity-90">
              Tel: Kiran Kumar (+91) 6366542135 · G R Rangegowda (+91) 9448536281 · Chetan (+91) 9900505856
            </p>
            <div className="mt-4 flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-80 hover:opacity-100"
                aria-label="Nandi Agrotech on YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Col 2 - CHECK OUT */}
          <div>
            <h3 className="font-heading font-normal text-lg mb-3">Shop</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link href="/category/irrigation" className="hover:underline">Irrigation Systems</Link></li>
              <li><Link href="/category/machinery" className="hover:underline">Farm Machinery & Equipment</Link></li>
              <li><Link href="/offers" className="hover:underline">Seasonal Offers</Link></li>
            </ul>
          </div>

          {/* Col 3 - GET IN TOUCH */}
          <div>
            <h3 className="font-heading font-normal text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Tel: <a href="tel:+916366542135" className="hover:underline">Kiran Kumar (+91) 6366542135</a></li>
              <li><a href="tel:+919448536281" className="hover:underline">G R Rangegowda (+91) 9448536281</a></li>
              <li><a href="tel:+919900505856" className="hover:underline">Chetan (+91) 9900505856</a></li>
              <li><a href="mailto:nandiagrotech363@gmail.com" className="hover:underline">nandiagrotech363@gmail.com</a></li>
              <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a></li>
            </ul>
          </div>

          {/* Col 4 - Company */}
          <div>
            <h3 className="font-heading font-normal text-lg mb-3">Company</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li><Link href="/about" className="hover:underline">About Nandi Agrotech</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
              <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:underline">Track Your Order</a></li>
              <li><Link href="/returns" className="hover:underline">Return Policy</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:underline">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-8 sm:flex-row text-sm opacity-90">
          <p>© 2024 Nandi Agrotech. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Orders & Enquiries via WhatsApp
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex text-whatsapp" aria-label="WhatsApp">
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            {WHATSAPP_NUMBER}
          </p>
          <p>Turuvekere, Karnataka</p>
        </div>
      </div>
    </footer>
  );
}
