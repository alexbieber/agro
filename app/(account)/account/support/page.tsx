"use client";

import { WHATSAPP_NUMBER } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const TOPICS = [
  "Order Status",
  "Product Query",
  "Return Request",
  "Distributor Enquiry",
  "Technical Help",
];

export default function SupportPage() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <div>
      <h2 className="text-xl font-heading font-normal text-foreground mb-4">Support</h2>
      <div className="rounded-lg border border-border bg-primary/5 p-6 mb-6">
        <h3 className="font-heading font-normal text-foreground">WhatsApp support</h3>
        <p className="text-sm text-muted-foreground mt-1">
          We respond to WhatsApp messages during business hours.
        </p>
        <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
          <Button variant="whatsapp" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Chat with Nandee Agrotech
          </Button>
        </a>
      </div>
      <h3 className="font-heading font-normal text-foreground mb-2">Support topics</h3>
      <ul className="space-y-2">
        {TOPICS.map((t) => (
          <li key={t} className="text-sm text-muted-foreground">
            {t}
          </li>
        ))}
      </ul>
      <h3 className="font-heading font-normal text-foreground mt-6 mb-2">Past support</h3>
      <p className="text-sm text-muted-foreground">No support history yet.</p>
    </div>
  );
}
