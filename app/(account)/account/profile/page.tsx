"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

export default function ProfilePage() {
  const { profile, updateProfile, toggleCrop, defaultCrops } = useProfile();

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const name = (form.querySelector("#name") as HTMLInputElement)?.value ?? "";
    const phone = (form.querySelector("#phone") as HTMLInputElement)?.value ?? "";
    const email = (form.querySelector("#email") as HTMLInputElement)?.value ?? "";
    const state = (form.querySelector("#state") as HTMLInputElement)?.value ?? "";
    const district = (form.querySelector("#district") as HTMLInputElement)?.value ?? "";
    const land = (form.querySelector("#land") as HTMLInputElement)?.value ?? "";
    const language = (form.querySelector("#language") as HTMLSelectElement)?.value ?? "en";
    updateProfile({ name, phone, email, state, district, land, language });
    toast.success("Profile saved. Stored in this browser.");
  }

  return (
    <div>
      <h2 className="text-xl font-heading font-normal text-foreground mb-6">My profile</h2>
      <form onSubmit={handleSave} className="max-w-md space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Full name" value={profile.name} onChange={(e) => updateProfile({ name: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="10-digit mobile" value={profile.phone} onChange={(e) => updateProfile({ phone: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Email" value={profile.email} onChange={(e) => updateProfile({ email: e.target.value })} />
        </div>
        <h3 className="font-heading font-normal text-foreground pt-4">Farm details</h3>
        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Input id="state" placeholder="State" value={profile.state} onChange={(e) => updateProfile({ state: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="district">District</Label>
          <Input id="district" placeholder="District" value={profile.district} onChange={(e) => updateProfile({ district: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="land">Land size (acres)</Label>
          <Input id="land" type="number" placeholder="e.g. 2" value={profile.land} onChange={(e) => updateProfile({ land: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label>Crops grown</Label>
          <div className="flex flex-wrap gap-2">
            {defaultCrops.map((c) => (
              <label key={c} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  className="rounded border-border"
                  checked={profile.crops.includes(c)}
                  onChange={() => toggleCrop(c)}
                />
                {c}
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <select
            id="language"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={profile.language}
            onChange={(e) => updateProfile({ language: e.target.value })}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>
        <Button type="submit">Save changes</Button>
        <div className="pt-4 border-t border-border">
          <h3 className="font-heading font-normal text-foreground mb-2">Change password</h3>
          <p className="text-sm text-muted-foreground mb-2">Password changes are not stored here. Use your account provider or contact support.</p>
          <div className="space-y-2">
            <Label htmlFor="current">Current password</Label>
            <Input id="current" type="password" placeholder="Current password" />
            <Label htmlFor="new">New password</Label>
            <Input id="new" type="password" placeholder="New password" />
          </div>
          <Button type="button" variant="outline" className="mt-2" onClick={() => toast.info("Wire to your auth provider to change password.")}>Update password</Button>
        </div>
      </form>
    </div>
  );
}
