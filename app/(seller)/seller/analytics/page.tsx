"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const CATEGORY_DATA = [
  { name: "Irrigation", value: 45, color: "#2196F3" },
  { name: "Machinery", value: 55, color: "#FF8F00" },
];

const TOP_STATES = [
  { state: "Andhra Pradesh", revenue: 125000 },
  { state: "Karnataka", revenue: 98000 },
  { state: "Maharashtra", revenue: 87000 },
];

export default function SellerAnalyticsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Analytics</h1>
      <div className="grid gap-6 lg:grid-cols-2 mb-8">
        <div className="rounded-lg border border-border bg-card p-4 h-64">
          <h3 className="font-semibold text-text-primary mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie
                data={CATEGORY_DATA}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {CATEGORY_DATA.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-semibold text-text-primary mb-4">Top States by Revenue</h3>
          <table className="w-full text-sm">
            {TOP_STATES.map((r) => (
              <tr key={r.state} className="border-b">
                <td className="py-2">{r.state}</td>
                <td className="py-2 text-right font-medium">₹{r.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="font-semibold text-text-primary mb-2">Key Metrics</h3>
        <p className="text-sm text-text-secondary">WhatsApp Enquiry → Order Conversion Rate, Return Rate (mock)</p>
      </div>
    </div>
  );
}
