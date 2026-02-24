"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { OrderCustomerInfo } from "@/lib/utils/whatsapp";

const STORAGE_KEY = "nandi-order-customer";

const defaultCustomer: OrderCustomerInfo = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

function loadSaved(): OrderCustomerInfo {
  if (typeof window === "undefined") return defaultCustomer;
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s) {
      const parsed = JSON.parse(s) as Partial<OrderCustomerInfo>;
      return { ...defaultCustomer, ...parsed };
    }
  } catch {
    // ignore
  }
  return defaultCustomer;
}

function save(c: OrderCustomerInfo) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
  } catch {
    // ignore
  }
}

interface OrderFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (customer: OrderCustomerInfo) => void;
  title?: string;
  submitLabel?: string;
}

export default function OrderFormModal({
  open,
  onClose,
  onSubmit,
  title = "Your details for order",
  submitLabel = "Send order on WhatsApp",
}: OrderFormModalProps) {
  const [form, setForm] = useState<OrderCustomerInfo>(defaultCustomer);

  useEffect(() => {
    if (open) setForm(loadSaved());
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    save(form);
    onSubmit(form);
    onClose();
  };

  const update = (key: keyof OrderCustomerInfo, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-text-secondary">
          Fill in your details. We will send your order to WhatsApp and our team will confirm.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="order-name">Name *</Label>
            <Input
              id="order-name"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your full name"
            />
          </div>
          <div>
            <Label htmlFor="order-phone">Phone / WhatsApp *</Label>
            <Input
              id="order-phone"
              required
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="10-digit mobile number"
            />
          </div>
          <div>
            <Label htmlFor="order-email">Email</Label>
            <Input
              id="order-email"
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label htmlFor="order-address">Address *</Label>
            <Input
              id="order-address"
              required
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Street, area, landmark"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="order-city">City *</Label>
              <Input
                id="order-city"
                required
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="City"
              />
            </div>
            <div>
              <Label htmlFor="order-state">State *</Label>
              <Input
                id="order-state"
                required
                value={form.state}
                onChange={(e) => update("state", e.target.value)}
                placeholder="State"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="order-pincode">Pincode *</Label>
            <Input
              id="order-pincode"
              required
              inputMode="numeric"
              maxLength={6}
              value={form.pincode}
              onChange={(e) => update("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="6-digit pincode"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="whatsapp" className="flex-1 gap-2">
              {submitLabel}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
