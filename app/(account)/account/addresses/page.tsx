"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MOCK_ADDRESSES = [
  { id: "1", name: "Farm", address: "Village X, District Y, State - 500001", type: "farm" as const, isDefault: true },
];

export default function AddressesPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-heading font-normal text-foreground mb-4">Saved addresses</h2>
      <div className="space-y-4">
        {MOCK_ADDRESSES.map((addr) => (
          <div key={addr.id} className="rounded-lg border border-border p-4 flex justify-between items-start">
            <div>
              <p className="font-medium">{addr.name}</p>
              <p className="text-sm text-text-secondary">{addr.address}</p>
              <span className="text-xs text-primary">{addr.type === "farm" ? "Farm" : "Home"}</span>
              {addr.isDefault && (
                <span className="ml-2 text-xs rounded bg-primary/20 text-primary px-2 py-0.5">Default</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
            </div>
          </div>
        ))}
      </div>
      {showForm ? (
        <div className="mt-6 rounded-lg border border-border p-6 space-y-4">
          <h3 className="font-semibold">Add Address</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Full name" />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" placeholder="10-digit mobile" />
            </div>
            <div>
              <Label htmlFor="pincode">Pincode</Label>
              <Input id="pincode" placeholder="6-digit pincode" />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="State" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="district">District</Label>
              <Input id="district" placeholder="District" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address1">Address line 1</Label>
              <Input id="address1" placeholder="Street, village" />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address2">Address line 2 (optional)</Label>
              <Input id="address2" placeholder="Landmark" />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <select id="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="home">Home</option>
                <option value="farm">Farm</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowForm(false)} variant="outline">Cancel</Button>
            <Button>Save Address</Button>
          </div>
        </div>
      ) : (
        <Button className="mt-6" onClick={() => setShowForm(true)}>Add Address</Button>
      )}
    </div>
  );
}
