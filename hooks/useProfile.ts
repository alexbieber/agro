"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "nandi-profile";

export interface ProfileData {
  name: string;
  phone: string;
  email: string;
  state: string;
  district: string;
  land: string;
  crops: string[];
  language: string;
}

const defaultCrops = ["Rice", "Tomato", "Maize", "Cotton", "Groundnut"];
const defaults: ProfileData = {
  name: "",
  phone: "",
  email: "",
  state: "",
  district: "",
  land: "",
  crops: [],
  language: "en",
};

function load(): ProfileData {
  if (typeof window === "undefined") return { ...defaults };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaults };
    const parsed = JSON.parse(raw) as Partial<ProfileData>;
    if (Array.isArray(parsed.crops)) {
      return { ...defaults, ...parsed, crops: parsed.crops };
    }
    return { ...defaults, ...parsed, crops: defaults.crops };
  } catch {
    return { ...defaults };
  }
}

function save(data: ProfileData) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function useProfile() {
  const [profile, setProfile] = useState<ProfileData>(defaults);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setProfile(load());
  }, []);

  const updateProfile = useCallback((patch: Partial<ProfileData>) => {
    setProfile((prev) => {
      const next = { ...prev, ...patch };
      save(next);
      return next;
    });
  }, []);

  const toggleCrop = useCallback((crop: string) => {
    setProfile((prev) => {
      const crops = prev.crops.includes(crop)
        ? prev.crops.filter((c) => c !== crop)
        : [...prev.crops, crop];
      const next = { ...prev, crops };
      save(next);
      return next;
    });
  }, []);

  return { profile: mounted ? profile : defaults, updateProfile, toggleCrop, defaultCrops };
}
