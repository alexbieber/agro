"use client";

import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-heading font-normal text-foreground">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">Please try again or contact us on WhatsApp.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        <Button onClick={reset}>Try again</Button>
        <Link href="/">
          <Button variant="outline">Go Home</Button>
        </Link>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
          <Button variant="whatsapp">Contact us on WhatsApp</Button>
        </a>
      </div>
    </div>
  );
}
