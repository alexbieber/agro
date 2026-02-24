"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroImages } from "@/lib/data/productImages";
import { cn } from "@/lib/utils";

const slides = [
  {
    headline: "Hose pipes & irrigation",
    subtext: "From RAPL hose pipes to water pumps – stock that lasts.",
    cta: "See collection",
    href: "/collection",
    image: heroImages.irrigation,
  },
  {
    headline: "Sprayers & weeders",
    subtext: "Power sprayers and farm machinery for every stage of the season.",
    cta: "See collection",
    href: "/collection",
    image: heroImages.machinery,
  },
  {
    headline: "Good prices, reliable support",
    subtext: "We’re in Turuvekere. Call or WhatsApp for bulk orders and dealer enquiries.",
    cta: "See collection",
    href: "/collection",
    image: heroImages.machinery,
  },
];

const sideCards = [
  { label: "Hose pipes & water pumps", href: "/category/irrigation" },
  { label: "Become a distributor", href: "/distributor" },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-primary-dark text-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-heading font-normal md:text-2xl lg:text-3xl text-white">
            Irrigation & farm machinery in Turuvekere
          </h1>
          <p className="mt-2 text-sm text-white/90">
            Hose pipes, sprayers, pumps and equipment you can rely on.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
          {/* Main slider */}
          <div className="relative flex-1 min-h-[280px] md:min-h-[340px] rounded-xl overflow-hidden shadow-xl">
            {slides.map((slide, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                )}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority={i === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-8">
                  <h2 className="text-2xl font-heading font-normal md:text-3xl lg:text-4xl text-white drop-shadow-sm">{slide.headline}</h2>
                  <p className="mt-2 text-sm text-white/95 md:text-base max-w-lg">{slide.subtext}</p>
                  <Link href={slide.href} className="mt-4 inline-block">
                    <Button
                      variant="secondary"
                      className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold"
                    >
                      {slide.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setCurrent((c) => (c - 1 + slides.length) % slides.length)}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrent((c) => (c + 1) % slides.length)}
              className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/20 p-2 hover:bg-white/30"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === current ? "w-6 bg-white" : "w-2 bg-white/50"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right side cards */}
          <div className="flex flex-row gap-4 lg:flex-col lg:w-64 shrink-0">
            {sideCards.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="flex-1 rounded-lg bg-white/15 p-4 backdrop-blur hover:bg-white/25 transition-colors"
              >
                <span className="text-sm font-medium">{card.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
