import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: `Become a Distributor — ${SITE_NAME}`,
  description: "Partner with Nandi Agrotech. Distributor enquiry and partnership details. We respond on WhatsApp.",
};

export default function DistributorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
