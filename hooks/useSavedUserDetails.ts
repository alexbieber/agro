"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "nandi-user-details";

export interface SavedUserDetails {
  organization: string;
  contactName: string;
  whatsapp: string;
  email: string;
  state: string;
  pincode: string;
  customerType: string;
  district: string;
  businessName: string;
  ownerName: string;
}

const defaults: SavedUserDetails = {
  organization: "",
  contactName: "",
  whatsapp: "",
  email: "",
  state: "",
  pincode: "",
  customerType: "",
  district: "",
  businessName: "",
  ownerName: "",
};

function load(): SavedUserDetails {
  if (typeof window === "undefined") return { ...defaults };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaults };
    const parsed = JSON.parse(raw) as Partial<SavedUserDetails>;
    return { ...defaults, ...parsed };
  } catch {
    return { ...defaults };
  }
}

function save(data: Partial<SavedUserDetails>) {
  if (typeof window === "undefined") return;
  try {
    const current = load();
    const merged = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // ignore
  }
}

/**
 * Persisted user details in localStorage so returning visitors don't have to re-enter.
 * Use on bulk order, distributor, and any form that collects contact info.
 */
export function useSavedUserDetails() {
  const [saved, setSaved] = useState<SavedUserDetails>(defaults);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaved(load());
  }, []);

  const updateSaved = useCallback((partial: Partial<SavedUserDetails>) => {
    setSaved((prev) => {
      const next = { ...prev, ...partial };
      save(next);
      return next;
    });
  }, []);

  return { saved: mounted ? saved : defaults, updateSaved };
}
