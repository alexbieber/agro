"use client";

import { WHATSAPP_NUMBER } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const MOCK_ORDERS = [
  { id: "NA-2024-001", products: "HOSE PIPE (RAPL-HP-10/100) x 2", date: "2024-02-20", amount: 598, status: "Delivered" as const },
  { id: "NA-2024-002", products: "Drip Kit 1 Acre", date: "2024-02-18", amount: 8500, status: "Dispatched" as const },
];

const statusColors: Record<string, string> = {
  Confirmed: "bg-blue-100 text-blue-800",
  Dispatched: "bg-amber-100 text-amber-800",
  Delivered: "bg-success/20 text-success",
  Cancelled: "bg-red-100 text-red-800",
};

export default function OrdersPage() {
  const trackUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I want to track my order #")}`;

  return (
    <div>
      <div className="rounded-lg border border-border bg-primary/5 p-6 mb-6">
        <h2 className="font-heading font-normal text-foreground">Orders via WhatsApp</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Place and track orders in your WhatsApp chat with us.
        </p>
        <a href={trackUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
          <Button variant="whatsapp" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Track My Order on WhatsApp
          </Button>
        </a>
      </div>

      <h3 className="font-heading font-normal text-foreground mb-4">Order history</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-medium">Order ID</th>
              <th className="text-left py-2 font-medium">Products</th>
              <th className="text-left py-2 font-medium">Date</th>
              <th className="text-left py-2 font-medium">Amount</th>
              <th className="text-left py-2 font-medium">Status</th>
              <th className="text-left py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((order) => (
              <tr key={order.id} className="border-b border-border">
                <td className="py-3">{order.id}</td>
                <td className="py-3">{order.products}</td>
                <td className="py-3">{order.date}</td>
                <td className="py-3">₹{order.amount.toLocaleString("en-IN")}</td>
                <td className="py-3">
                  <span className={`rounded px-2 py-0.5 text-xs ${statusColors[order.status] ?? "bg-muted"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, tracking order #${order.id}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-xs"
                  >
                    Track on WhatsApp
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
