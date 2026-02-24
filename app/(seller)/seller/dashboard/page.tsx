"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const STATS = [
  { label: "Revenue This Month", value: "₹4,82,000", change: "+18%" },
  { label: "Orders Logged", value: "1,243", change: "+12%" },
  { label: "WhatsApp Enquiries", value: "847", change: "" },
  { label: "Active Listings", value: "87", change: "" },
  { label: "Distributor Applications", value: "14 pending", change: "" },
];

const CHART_DATA = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  revenue: 12000 + Math.random() * 8000,
}));

const RECENT_ORDERS = [
  { id: "NA-001", product: "HOSE PIPE (RAPL-HP-10/100)", customer: "Ramesh", state: "AP", amount: 598, status: "Dispatched" },
  { id: "NA-002", product: "PORTABLE POWER SPRAYER (RAPL-PPS-50G)", customer: "Suresh", state: "KA", amount: 8500, status: "Confirmed" },
];

const LOW_STOCK = [
  { name: "HOSE PIPE (RAPL-HP-8.5/50 1/4)", stock: 12 },
  { name: "Power weeder (RAPL-RH-700G)", stock: 5 },
];

const TOP_ENQUIRIES = [
  { name: "Electric Water Pumps", count: 89 },
  { name: "Power sprayers & HTP sprayers", count: 76 },
];

export default function SellerDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-sm text-text-secondary">{s.label}</p>
            <p className="text-xl font-bold text-text-primary mt-1">{s.value}</p>
            {s.change && <p className="text-sm text-success">{s.change}</p>}
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-card p-4 mb-8 h-64">
        <h3 className="font-semibold text-text-primary mb-4">Revenue (last 30 days)</h3>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={CHART_DATA}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#2E7D32" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <h3 className="font-semibold text-text-primary p-4 border-b">Recent Orders</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-2">Order ID</th>
                <th className="text-left p-2">Product</th>
                <th className="text-left p-2">Customer</th>
                <th className="text-left p-2">State</th>
                <th className="text-left p-2">Amount</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{o.product}</td>
                  <td className="p-2">{o.customer}</td>
                  <td className="p-2">{o.state}</td>
                  <td className="p-2">₹{o.amount.toLocaleString()}</td>
                  <td className="p-2">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <div className="rounded-lg border border-border bg-card p-4 mb-4">
            <h3 className="font-semibold text-text-primary mb-3">Low Stock Alerts</h3>
            <ul className="space-y-2 text-sm">
              {LOW_STOCK.map((p) => (
                <li key={p.name} className="flex justify-between">
                  <span>{p.name}</span>
                  <span className="text-offer font-medium">{p.stock} units</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold text-text-primary mb-3">Top 5 by WhatsApp Enquiries</h3>
            <ul className="space-y-2 text-sm">
              {TOP_ENQUIRIES.map((p) => (
                <li key={p.name} className="flex justify-between">
                  <span className="truncate pr-2">{p.name}</span>
                  <span className="text-primary font-medium">{p.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
