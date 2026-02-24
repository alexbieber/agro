"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "nandi-order-history";

export interface OrderRecord {
  id: string;
  date: string;
  products: string;
  amount: number;
  status: "Placed";
}

function load(): OrderRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.sort((a, b) => (b.date > a.date ? 1 : -1));
  } catch {
    return [];
  }
}

function save(orders: OrderRecord[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // ignore
  }
}

function generateOrderId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  const h = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NA-${y}${m}${d}-${h}${min}-${r}`;
}

export function useOrderHistory() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOrders(load());
  }, []);

  const addOrder = useCallback((productsSummary: string, amount: number) => {
    const order: OrderRecord = {
      id: generateOrderId(),
      date: new Date().toISOString().slice(0, 10),
      products: productsSummary,
      amount,
      status: "Placed",
    };
    setOrders((prev) => {
      const next = [order, ...prev];
      save(next);
      return next;
    });
  }, []);

  return { orders: mounted ? orders : [], addOrder };
}
