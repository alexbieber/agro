"use client";

import { useState } from "react";
import { buildDistributorURL } from "@/lib/utils/whatsapp";
import { WHATSAPP_NUMBER } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PRODUCT_OPTIONS = ["Irrigation", "Machinery"];

export default function DistributorApplicationPage() {
  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    gst: "",
    state: "",
    district: "",
    businessType: "",
    products: [] as string[],
    years: "",
    volume: "",
  });

  const handleSubmit = () => {
    const message = `Hello Nandee Agrotech! Distributor Application:\n\nBusiness: ${form.businessName}\nOwner: ${form.ownerName}\nPhone: ${form.phone}\nGST: ${form.gst || "N/A"}\nState: ${form.state}\nDistrict: ${form.district}\nType: ${form.businessType}\nProducts: ${form.products.join(", ") || "N/A"}\nYears in agri: ${form.years}\nExpected monthly volume: ${form.volume}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const toggleProduct = (p: string) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(p)
        ? prev.products.filter((x) => x !== p)
        : [...prev.products, p],
    }));
  };

  return (
    <div>
      <h2 className="text-xl font-heading font-normal text-foreground mb-4">Distributor application</h2>
      <p className="text-muted-foreground mb-6">
        Fill the form below. On submit you will be redirected to WhatsApp with your details for our team to process.
      </p>
      <div className="max-w-lg space-y-4">
        <div>
          <Label htmlFor="business">Business / Shop Name</Label>
          <Input
            id="business"
            value={form.businessName}
            onChange={(e) => setForm((p) => ({ ...p, businessName: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="owner">Owner Name</Label>
          <Input
            id="owner"
            value={form.ownerName}
            onChange={(e) => setForm((p) => ({ ...p, ownerName: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone / WhatsApp</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="gst">GST Number (optional)</Label>
          <Input
            id="gst"
            value={form.gst}
            onChange={(e) => setForm((p) => ({ ...p, gst: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            value={form.state}
            onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))}
            placeholder="e.g. Karnataka"
          />
        </div>
        <div>
          <Label htmlFor="district">District</Label>
          <Input
            id="district"
            value={form.district}
            onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="type">Current Business Type</Label>
          <select
            id="type"
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
            {PRODUCT_OPTIONS.map((p) => (
              <label key={p} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.products.includes(p)}
                  onChange={() => toggleProduct(p)}
                  className="rounded border-border"
                />
                {p}
              </label>
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="years">Years in Agriculture Business</Label>
          <Input
            id="years"
            value={form.years}
            onChange={(e) => setForm((p) => ({ ...p, years: e.target.value }))}
            placeholder="e.g. 5"
          />
        </div>
        <div>
          <Label htmlFor="volume">Expected Monthly Order Volume</Label>
          <Input
            id="volume"
            value={form.volume}
            onChange={(e) => setForm((p) => ({ ...p, volume: e.target.value }))}
            placeholder="e.g. ₹2-5 lakh"
          />
        </div>
        <Button
          variant="whatsapp"
          className="w-full gap-2 mt-4"
          onClick={handleSubmit}
        >
          Send Application via WhatsApp
        </Button>
      </div>
    </div>
  );
}
