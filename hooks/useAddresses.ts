"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "nandi-addresses";

export interface SavedAddress {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  state: string;
  district: string;
  address1: string;
  address2: string;
  type: "home" | "farm";
  isDefault: boolean;
}

function load(): SavedAddress[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function save(addresses: SavedAddress[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(addresses));
  } catch {
    // ignore
  }
}

function generateId() {
  return "addr-" + Date.now() + "-" + Math.random().toString(36).slice(2, 9);
}

export function useAddresses() {
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAddresses(load());
  }, []);

  const addAddress = useCallback((addr: Omit<SavedAddress, "id">) => {
    const newAddr: SavedAddress = { ...addr, id: generateId() };
    setAddresses((prev) => {
      const next = [...prev, newAddr];
      save(next);
      return next;
    });
  }, []);

  const updateAddress = useCallback((id: string, patch: Partial<SavedAddress>) => {
    setAddresses((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, ...patch } : a));
      save(next);
      return next;
    });
  }, []);

  const removeAddress = useCallback((id: string) => {
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      save(next);
      return next;
    });
  }, []);

  const setDefault = useCallback((id: string) => {
    setAddresses((prev) => {
      const next = prev.map((a) => ({ ...a, isDefault: a.id === id }));
      save(next);
      return next;
    });
  }, []);

  return {
    addresses: mounted ? addresses : [],
    addAddress,
    updateAddress,
    removeAddress,
    setDefault,
  };
}
