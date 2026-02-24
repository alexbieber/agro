import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <p className="text-6xl mb-4">🌾</p>
      <h1 className="text-2xl font-heading font-normal text-foreground">Page not found</h1>
      <p className="mt-2 text-muted-foreground">The page you’re looking for doesn’t exist.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">Support on WhatsApp</Button>
        </a>
      </div>
    </div>
  );
}
