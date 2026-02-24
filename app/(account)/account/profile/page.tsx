"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  return (
    <div>
      <h2 className="text-xl font-heading font-normal text-foreground mb-6">My profile</h2>
      <div className="max-w-md space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="10-digit mobile" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Email" />
        </div>
        <h3 className="font-heading font-normal text-foreground pt-4">Farm details</h3>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input id="state" placeholder="State" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Input id="district" placeholder="District" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="land">Land size (acres)</Label>
          <Input id="land" type="number" placeholder="e.g. 2" />
        </div>
        <div className="space-y-2">
          <Label>Crops grown</Label>
          <div className="flex flex-wrap gap-2">
            {["Rice", "Tomato", "Maize", "Cotton", "Groundnut"].map((c) => (
              <label key={c} className="flex items-center gap-1 text-sm">
                <input type="checkbox" className="rounded border-border" />
                {c}
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label>Language</Label>
          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>
        <Button>Save changes</Button>
        <div className="pt-4 border-t border-border">
          <h3 className="font-heading font-normal text-foreground mb-2">Change password</h3>
          <div className="space-y-2">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" />
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" />
          </div>
          <Button variant="outline" className="mt-2">Update password</Button>
        </div>
      </div>
    </div>
  );
}
