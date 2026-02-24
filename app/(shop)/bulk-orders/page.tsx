"use client";

import { useState, useEffect } from "react";
import { buildBulkOrderURL } from "@/lib/utils/whatsapp";
import { WHATSAPP_NUMBER, SUPPORT_PHONE } from "@/lib/config";
import { useSavedUserDetails } from "@/hooks/useSavedUserDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const INDIAN_STATES = [
  "Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu", "Maharashtra", "Madhya Pradesh",
  "Gujarat", "Rajasthan", "Punjab", "Haryana", "Uttar Pradesh", "Bihar", "West Bengal",
  "Odisha", "Chhattisgarh", "Jharkhand", "Kerala", "Goa",
];

export default function BulkOrdersPage() {
  const { saved, updateSaved } = useSavedUserDetails();
  const [form, setForm] = useState({
    organization: "",
    contactName: "",
    whatsapp: "",
    email: "",
    state: "",
    pincode: "",
    customerType: "",
    categories: [] as string[],
    products: "",
    quantity: "",
    requiredBy: "",
    notes: "",
  });

  // Pre-fill from saved details (browser storage)
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      organization: saved.organization || prev.organization,
      contactName: saved.contactName || prev.contactName,
      whatsapp: saved.whatsapp || prev.whatsapp,
      email: saved.email || prev.email,
      state: saved.state || prev.state,
      pincode: saved.pincode || prev.pincode,
      customerType: saved.customerType || prev.customerType,
    }));
  }, [saved.organization, saved.contactName, saved.whatsapp, saved.email, saved.state, saved.pincode, saved.customerType]);

  // Persist user details when they change (only if different from saved to avoid overwriting on load)
  useEffect(() => {
    const next = {
      organization: form.organization,
      contactName: form.contactName,
      whatsapp: form.whatsapp,
      email: form.email,
      state: form.state,
      pincode: form.pincode,
      customerType: form.customerType,
    };
    const same =
      next.organization === saved.organization &&
      next.contactName === saved.contactName &&
      next.whatsapp === saved.whatsapp &&
      next.email === saved.email &&
      next.state === saved.state &&
      next.pincode === saved.pincode &&
      next.customerType === saved.customerType;
    if (!same) updateSaved(next);
  }, [form.organization, form.contactName, form.whatsapp, form.email, form.state, form.pincode, form.customerType, saved, updateSaved]);

  const toggleCategory = (c: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(c)
        ? prev.categories.filter((x) => x !== c)
        : [...prev.categories, c],
    }));
  };

  const handleSubmit = () => {
    const url = buildBulkOrderURL({
      phone: WHATSAPP_NUMBER,
      organization: form.organization,
      product: form.products || form.categories.join(", ") || "Various",
      quantity: form.quantity,
      state: form.state,
      pincode: form.pincode,
      date: form.requiredBy,
      notes: form.notes,
    });
    window.open(url, "_blank");
  };

  return (
    <div>
      <section className="bg-primary-dark text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-heading font-normal">Bulk orders</h1>
          <p className="mt-4 opacity-90 max-w-2xl mx-auto">
            Farmers, cooperatives and distributors – get better prices on large orders. We’ll quote on WhatsApp.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg border border-border bg-muted/30 p-6 mb-8">
          <h2 className="font-heading font-normal text-foreground mb-4">How it works</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Fill the form below</li>
            <li>Receive a custom quote on WhatsApp within 2 hours</li>
            <li>Confirm and place your bulk order</li>
          </ol>
          <p className="mt-3 text-sm text-muted-foreground">Your contact details are saved in this browser so you don’t have to re-enter them next time.</p>
        </div>

        <div className="max-w-xl space-y-4 mb-8">
          <div>
            <Label htmlFor="org">Organization / Farm / Cooperative Name</Label>
            <Input id="org" value={form.organization} onChange={(e) => setForm((p) => ({ ...p, organization: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="contact">Contact Person Name</Label>
            <Input id="contact" value={form.contactName} onChange={(e) => setForm((p) => ({ ...p, contactName: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="wa">WhatsApp Number</Label>
            <Input id="wa" type="tel" value={form.whatsapp} onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="em">Email</Label>
            <Input id="em" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
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
            <Label htmlFor="pin">Pincode</Label>
            <Input id="pin" value={form.pincode} onChange={(e) => setForm((p) => ({ ...p, pincode: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="type">Customer Type</Label>
            <select
              id="type"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={form.customerType}
              onChange={(e) => setForm((p) => ({ ...p, customerType: e.target.value }))}
            >
              <option value="">Select</option>
              <option value="Farmer">Farmer</option>
              <option value="Cooperative/FPO">Cooperative/FPO</option>
              <option value="Distributor">Distributor</option>
              <option value="NGO">NGO</option>
              <option value="Government">Government</option>
            </select>
          </div>
          <div>
            <Label>Product Category</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {["Irrigation", "Machinery"].map((c) => (
                <label key={c} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.categories.includes(c)} onChange={() => toggleCategory(c)} className="rounded border-border" />
                  {c}
                </label>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="prod">Specific Products Needed</Label>
            <textarea
              id="prod"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
              value={form.products}
              onChange={(e) => setForm((p) => ({ ...p, products: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="qty">Quantity / Volume Required</Label>
            <Input id="qty" value={form.quantity} onChange={(e) => setForm((p) => ({ ...p, quantity: e.target.value }))} placeholder="e.g. 100 units" />
          </div>
          <div>
            <Label htmlFor="date">Required by Date</Label>
            <Input id="date" type="date" value={form.requiredBy} onChange={(e) => setForm((p) => ({ ...p, requiredBy: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <textarea
              id="notes"
              className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
            />
          </div>
          <Button variant="whatsapp" className="w-full gap-2 mt-4" onClick={handleSubmit}>
            Send Bulk Order Request on WhatsApp →
          </Button>
          <p className="text-sm text-muted-foreground text-center mt-2">We respond within 2 hours on business days.</p>
        </div>

        <div className="rounded-lg border border-border overflow-hidden max-w-2xl">
          <h3 className="font-semibold p-4 bg-muted">Bulk pricing reference</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-3">Category</th>
                <th className="text-left p-3">10–25 units</th>
                <th className="text-left p-3">25–50 units</th>
                <th className="text-left p-3">50+ units</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b"><td className="p-3">Irrigation</td><td className="p-3">6% off</td><td className="p-3">10% off</td><td className="p-3">Custom pricing</td></tr>
              <tr className="border-b"><td className="p-3">Machinery</td><td className="p-3">5% off</td><td className="p-3">8% off</td><td className="p-3">Custom pricing</td></tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 py-6 border-t border-border">
          {SUPPORT_PHONE ? (
            <span className="text-muted-foreground">Prefer to call? {SUPPORT_PHONE}</span>
          ) : (
            <span className="text-muted-foreground">Need help? Reach us on WhatsApp</span>
          )}
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            <Button variant="whatsapp">WhatsApp us now →</Button>
          </a>
        </div>
      </div>
    </div>
  );
}
