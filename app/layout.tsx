import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import BackToTop from "@/components/shared/BackToTop";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Nandee Agrotech — Irrigation & Farm Machinery | Turuvekere, Karnataka",
  description: "Hose pipes, sprayers, pumps and farm machinery in Turuvekere. Good prices, reliable support. Call or WhatsApp for orders and dealer enquiries.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${instrumentSerif.variable} font-sans antialiased`}>
        <WishlistProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen pb-20 md:pb-0">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <BackToTop />
            <Toaster position="top-center" richColors />
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
