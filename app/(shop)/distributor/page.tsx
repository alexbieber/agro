"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { useSavedUserDetails } from "@/hooks/useSavedUserDetails";
import { heroImagePaths } from "@/lib/data/heroImages";
import { heroImages } from "@/lib/data/productImages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BENEFITS = [
  { title: "Partnership terms", text: "Discuss margins and territory with our team on WhatsApp." },
  { title: "Product range", text: "Full irrigation and farm machinery range from Nandee Agrotech." },
  { title: "Support", text: "We back our dealers with stock and after-sales support." },
  { title: "Get in touch", text: "Submit your details and we’ll respond on WhatsApp." },
];

const WHO_CAN = [
  "Agri input dealers",
  "Farm equipment retailers",
  "Cooperative societies & FPOs",
];

const INDIAN_STATES = [
  "Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Maharashtra", "Madhya Pradesh",
  "Gujarat", "Rajasthan", "Punjab", "Haryana", "Uttar Pradesh", "Bihar", "West Bengal",
  "Odisha", "Chhattisgarh", "Jharkhand", "Kerala", "Goa",
];

export default function DistributorPage() {
  const { saved, updateSaved } = useSavedUserDetails();
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    whatsapp: "",
    email: "",
    state: "",
    district: "",
    gst: "",
    businessType: "",
    products: [] as string[],
    turnover: "",
    hearAbout: "",
  });

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      businessName: saved.businessName || prev.businessName,
      ownerName: saved.ownerName || prev.ownerName,
      whatsapp: saved.whatsapp || prev.whatsapp,
      email: saved.email || prev.email,
      state: saved.state || prev.state,
      district: saved.district || prev.district,
    }));
  }, [saved.businessName, saved.ownerName, saved.whatsapp, saved.email, saved.state, saved.district]);

  useEffect(() => {
    const next = {
      businessName: form.businessName,
      ownerName: form.ownerName,
      whatsapp: form.whatsapp,
      email: form.email,
      state: form.state,
      district: form.district,
    };
    const same =
      next.businessName === saved.businessName &&
      next.ownerName === saved.ownerName &&
      next.whatsapp === saved.whatsapp &&
      next.email === saved.email &&
      next.state === saved.state &&
      next.district === saved.district;
    if (!same) updateSaved(next);
  }, [form.businessName, form.ownerName, form.whatsapp, form.email, form.state, form.district, saved, updateSaved]);

  const toggleProduct = (p: string) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(p) ? prev.products.filter((x) => x !== p) : [...prev.products, p],
    }));
  };

  const handleSubmit = () => {
    const message = `Hello Nandee Agrotech! Distributor Enquiry:\n\nBusiness: ${form.businessName}\nOwner: ${form.ownerName}\nWhatsApp: ${form.whatsapp}\nEmail: ${form.email}\nState: ${form.state}\nDistrict: ${form.district}\nGST: ${form.gst || "N/A"}\nType: ${form.businessType}\nProducts: ${form.products.join(", ") || "N/A"}\nTurnover: ${form.turnover}\nHow did you hear: ${form.hearAbout}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary-dark text-white py-20 px-4 overflow-hidden">
        <Image
          src={heroImagePaths[0] || heroImages.machinery}
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-primary-dark/85" />
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-heading font-normal">Become a distributor</h1>
          <p className="mt-4 text-lg opacity-95 max-w-2xl mx-auto">
            Share your details and we’ll get back on WhatsApp with partnership info.
          </p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-6">
            <Button variant="whatsapp" size="lg" className="gap-2 shadow-lg">
              Enquire on WhatsApp
            </Button>
          </a>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.title} className="rounded-lg border border-border bg-card p-6 text-center">
              <h3 className="font-heading font-normal text-foreground">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Who can apply */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-heading font-normal text-foreground mb-6 text-center">Who can apply</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {WHO_CAN.map((item) => (
              <div key={item} className="rounded-lg border border-border bg-card p-6 text-center">
                <p className="font-medium text-text-primary">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-heading font-normal text-foreground mb-6">Distributor enquiry form</h2>
        <p className="text-sm text-muted-foreground mb-4 max-w-xl">Your details are saved in this browser so you don’t have to re-enter them next time.</p>
        <div className="max-w-xl space-y-4">
          <div>
            <Label htmlFor="b">Business / Shop Name</Label>
            <Input id="b" value={form.businessName} onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="o">Owner Name</Label>
            <Input id="o" value={form.ownerName} onChange={(e) => setForm((p) => ({ ...p, ownerName: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="w">WhatsApp Number</Label>
            <Input id="w" type="tel" value={form.whatsapp} onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="e">Email</Label>
            <Input id="e" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="st">State</Label>
            <select
              id="st"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.state}
              onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
            >
              <option value="">Select</option>
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <Label htmlFor="d">District</Label>
            <Input id="d" value={form.district} onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="g">GST Number (optional)</Label>
            <Input id="g" value={form.gst} onChange={(e) => setForm((p) => ({ ...p, gst: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="bt">Type of Business</Label>
            <select
              id="bt"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.businessType}
              onChange={(e) => setForm((p) => ({ ...p, businessType: e.target.value }))}
            >
              <option value="">Select</option>
              <option value="Agri Input Shop">Agri Input Shop</option>
              <option value="Equipment Dealer">Equipment Dealer</option>
              <option value="Cooperative">Cooperative</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <Label>Products Interested In</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Irrigation Systems", "Farm Machinery"].map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.products.includes(p)} onChange={() => toggleProduct(p)} className="rounded border-border" />
                  {p}
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="to">Current Monthly Turnover</Label>
            <select
              id="to"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.turnover}
              onChange={(e) => setForm((p) => ({ ...p, turnover: e.target.value }))}
            >
              <option value="">Select</option>
              <option value="< 1 Lakh">&lt; ₹1 Lakh</option>
              <option value="1-5 Lakh">₹1–5 Lakh</option>
              <option value="5-10 Lakh">₹5–10 Lakh</option>
              <option value="> 10 Lakh">&gt; ₹10 Lakh</option>
            </select>
          </div>
          <div>
            <Label htmlFor="h">How did you hear about us?</Label>
            <select
              id="h"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.hearAbout}
              onChange={(e) => setForm((p) => ({ ...p, hearAbout: e.target.value }))}
            >
              <option value="">Select</option>
              <option value="Search">Search / Google</option>
              <option value="Referral">Referral</option>
              <option value="Exhibition">Exhibition</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <Button variant="whatsapp" className="w-full gap-2 mt-4" onClick={handleSubmit}>
            Send Enquiry on WhatsApp →
          </Button>
          <p className="text-sm text-text-secondary text-center">Our team responds within 2 business hours</p>
        </div>
      </section>

      {/* States */}
      <section className="py-12 bg-muted/50" id="map">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-heading font-normal text-foreground mb-4 text-center">We have distributors in 18 states</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {INDIAN_STATES.map((s) => (
              <span key={s} className="rounded-full border border-border bg-card px-4 py-2 text-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
