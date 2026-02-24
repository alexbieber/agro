import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Offers — ${SITE_NAME}`,
  description: "Seasonal offers and deals on irrigation and farm machinery. Chat on WhatsApp for custom quotes.",
};

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
