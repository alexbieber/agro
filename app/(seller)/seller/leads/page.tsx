"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const MOCK_LEADS = [
  { id: "L1", name: "Ramesh K", phone: "98xxx", product: "Drip Kit", date: "2024-02-24", status: "New" },
  { id: "L2", name: "Suresh P", phone: "99xxx", product: "Vermicompost", date: "2024-02-23", status: "Contacted" },
  { id: "L3", name: "Venkat R", phone: "97xxx", product: "Power Weeder", date: "2024-02-22", status: "Converted" },
];

const STATUSES = ["New", "Contacted", "Converted", "Lost"];

export default function SellerLeadsPage() {
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary">WhatsApp Leads</h1>
        <Button variant="outline">Export to CSV</Button>
      </div>
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          type="button"
          onClick={() => setStatusFilter("all")}
          className={`rounded-md px-4 py-2 text-sm ${statusFilter === "all" ? "bg-primary text-white" : "bg-muted"}`}
        >
          All
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`rounded-md px-4 py-2 text-sm ${statusFilter === s ? "bg-primary text-white" : "bg-muted"}`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3">Lead ID</th>
              <th className="text-left p-3">Customer</th>
              <th className="text-left p-3">Phone</th>
              <th className="text-left p-3">Product Enquired</th>
              <th className="text-left p-3">Date</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_LEADS.map((l) => (
              <tr key={l.id} className="border-b">
                <td className="p-3">{l.id}</td>
                <td className="p-3">{l.name}</td>
                <td className="p-3">{l.phone}</td>
                <td className="p-3">{l.product}</td>
                <td className="p-3">{l.date}</td>
                <td className="p-3">{l.status}</td>
                <td className="p-3">
                  {l.status === "New" && (
                    <Button size="sm" variant="outline">Mark as Converted</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
