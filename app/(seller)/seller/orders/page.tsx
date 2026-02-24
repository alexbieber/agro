"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const TABS = ["All", "Confirmed", "Dispatched", "Delivered", "Cancelled"];
const MOCK_ORDERS = [
  { id: "NA-2024-001", customer: "Ramesh", phone: "98xxx", state: "AP", product: "HOSE PIPE (RAPL-HP-10/100)", qty: 2, amount: 598, status: "Dispatched", payment: "Paid" },
  { id: "NA-2024-002", customer: "Suresh", phone: "99xxx", state: "KA", product: "Drip Kit", qty: 1, amount: 8500, status: "Confirmed", payment: "Pending" },
];

export default function SellerOrdersPage() {
  const [tab, setTab] = useState("All");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Orders</h1>
        <Button>Log New Order</Button>
      </div>
      <div className="flex gap-2 mb-4">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-md px-4 py-2 text-sm font-medium ${tab === t ? "bg-primary text-white" : "bg-muted"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3">Order ID</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">State</th>
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3">Qty</th>
              <th className="text-left p-3">Amount</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Payment</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.customer}<br /><span className="text-xs text-text-secondary">{o.phone}</span></td>
                <td className="p-3">{o.state}</td>
                <td className="p-3">{o.product}</td>
                <td className="p-3">{o.qty}</td>
                <td className="p-3">₹{o.amount.toLocaleString()}</td>
                <td className="p-3">{o.status}</td>
                <td className="p-3">{o.payment}</td>
                <td className="p-3"><Button variant="outline" size="sm">Update</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
