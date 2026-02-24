"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SubscribeSection() {
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:nandiagrotech363@gmail.com?subject=Subscribe%20for%2010%25%20off&body=Please%20subscribe%20me%20for%2010%25%20off.%20Email%3A%20${encodeURIComponent(email)}`;
    }
  }

  return (
    <section className="py-12 border-t border-border bg-primary/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-heading font-normal text-foreground">
          Get new arrivals and offers in your inbox
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Drop your email – we’ll send updates and a 10% off code for first-time subscribers.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-sm mx-auto justify-center">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />
          <Button type="submit" className="bg-primary text-white hover:bg-primary/90">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
