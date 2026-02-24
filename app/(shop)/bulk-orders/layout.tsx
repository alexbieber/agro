import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Bulk Orders — ${SITE_NAME}`,
  description: "Bulk orders for farmers, cooperatives and distributors. Get a quote on WhatsApp for large quantity orders.",
};

export default function BulkOrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
