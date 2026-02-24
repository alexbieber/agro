"use client";

import { WHATSAPP_NUMBER } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useOrderHistory } from "@/hooks/useOrderHistory";
import { formatPrice } from "@/lib/utils/formatPrice";

export default function OrdersPage() {
  const { orders } = useOrderHistory();
  const trackUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I want to track my order #")}`;

  return (
    <div>
      <div className="rounded-lg border border-border bg-primary/5 p-6 mb-6">
        <h2 className="font-heading font-normal text-foreground">Orders via WhatsApp</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Place and track orders in your WhatsApp chat with us. Orders you place from this device appear below.
        </p>
        <a href={trackUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4">
          <Button variant="whatsapp" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Track order on WhatsApp
          </Button>
        </a>
      </div>

      <h3 className="font-heading font-normal text-foreground mb-4">Order history</h3>
      {orders.length === 0 ? (
        <p className="text-muted-foreground py-6">
          No orders yet. When you place an order from the cart (via WhatsApp), it will show here for reference. Track status in your WhatsApp chat with us.
        </p>
      ) : (
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
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border">
                  <td className="py-3">{order.id}</td>
                  <td className="py-3 max-w-xs truncate" title={order.products}>{order.products}</td>
                  <td className="py-3">{order.date}</td>
                  <td className="py-3">{order.amount > 0 ? formatPrice(order.amount) : "Contact for price"}</td>
                  <td className="py-3">
                    <span className="rounded px-2 py-0.5 text-xs bg-blue-100 text-blue-800">
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
      )}
    </div>
  );
}
