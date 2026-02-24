"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddresses, type SavedAddress } from "@/hooks/useAddresses";
import { toast } from "sonner";

function formatAddress(addr: SavedAddress) {
  const parts = [addr.address1, addr.address2, addr.district, addr.state, addr.pincode].filter(Boolean);
  return parts.join(", ");
}

export default function AddressesPage() {
  const { addresses, addAddress, updateAddress, removeAddress, setDefault } = useAddresses();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    state: "",
    district: "",
    address1: "",
    address2: "",
    type: "farm" as "home" | "farm",
  });

  function resetForm() {
    setForm({
      name: "",
      phone: "",
      pincode: "",
      state: "",
      district: "",
      address1: "",
      address2: "",
      type: "farm",
    });
    setShowForm(false);
    setEditingId(null);
  }

  function handleSaveNew(e: React.FormEvent) {
    e.preventDefault();
    if (!form.address1?.trim()) {
      toast.error("Enter at least address line 1.");
      return;
    }
    addAddress({
      ...form,
      isDefault: addresses.length === 0,
    });
    toast.success("Address saved.");
    resetForm();
  }

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    if (!form.address1?.trim()) {
      toast.error("Enter at least address line 1.");
      return;
    }
    updateAddress(editingId, form);
    toast.success("Address updated.");
    resetForm();
  }

  function startEdit(addr: SavedAddress) {
    setForm({
      name: addr.name,
      phone: addr.phone,
      pincode: addr.pincode,
      state: addr.state,
      district: addr.district,
      address1: addr.address1,
      address2: addr.address2,
      type: addr.type,
    });
    setEditingId(addr.id);
    setShowForm(true);
  }

  return (
    <div>
      <h2 className="text-xl font-heading font-normal text-foreground mb-4">Saved addresses</h2>
      <div className="space-y-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="rounded-lg border border-border p-4 flex justify-between items-start">
            <div>
              <p className="font-medium">{addr.name || "Unnamed"}</p>
              <p className="text-sm text-muted-foreground">{formatAddress(addr)}</p>
              {addr.phone && <p className="text-xs text-muted-foreground mt-1">{addr.phone}</p>}
              <span className="text-xs text-primary">{addr.type === "farm" ? "Farm" : "Home"}</span>
              {addr.isDefault && (
                <span className="ml-2 text-xs rounded bg-primary/20 text-primary px-2 py-0.5">Default</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setDefault(addr.id)} disabled={addr.isDefault}>
                Set default
              </Button>
              <Button variant="outline" size="sm" onClick={() => startEdit(addr)}>Edit</Button>
              <Button variant="ghost" size="sm" className="text-destructive" onClick={() => { removeAddress(addr.id); toast.success("Address removed."); }}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
      {showForm ? (
        <div className="mt-6 rounded-lg border border-border p-6 space-y-4">
          <h3 className="font-semibold">{editingId ? "Edit address" : "Add address"}</h3>
          <form onSubmit={editingId ? handleUpdate : handleSaveNew} className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Full name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="10-digit mobile" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" placeholder="6-digit pincode" value={form.pincode} onChange={(e) => setForm((p) => ({ ...p, pincode: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="State" value={form.state} onChange={(e) => setForm((p) => ({ ...p, state: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" placeholder="District" value={form.district} onChange={(e) => setForm((p) => ({ ...p, district: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address1">Address line 1</Label>
              <Input id="address1" placeholder="Street, village" value={form.address1} onChange={(e) => setForm((p) => ({ ...p, address1: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address2">Address line 2 (optional)</Label>
              <Input id="address2" placeholder="Landmark" value={form.address2} onChange={(e) => setForm((p) => ({ ...p, address2: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <select
                id="type"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={form.type}
                onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as "home" | "farm" }))}
              >
                <option value="home">Home</option>
                <option value="farm">Farm</option>
              </select>
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
              <Button type="submit">{editingId ? "Update address" : "Save address"}</Button>
            </div>
          </form>
        </div>
      ) : (
        <Button className="mt-6" onClick={() => { setShowForm(true); setForm({ name: "", phone: "", pincode: "", state: "", district: "", address1: "", address2: "", type: "farm" }); }}>Add address</Button>
      )}
    </div>
  );
}
