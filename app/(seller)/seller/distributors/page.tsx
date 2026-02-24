"use client";

import { Button } from "@/components/ui/button";

const MOCK_APPLICATIONS = [
  { name: "M. Reddy", business: "Reddy Agri Store", state: "AP", date: "2024-02-20", status: "Pending" },
  { name: "S. Patil", business: "Patil Farm Equipments", state: "MH", date: "2024-02-18", status: "Approved" },
];

export default function SellerDistributorsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Distributor Applications</h1>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Business</th>
              <th className="text-left p-3">State</th>
              <th className="text-left p-3">Date Applied</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_APPLICATIONS.map((a) => (
              <tr key={a.business} className="border-b">
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.business}</td>
                <td className="p-3">{a.state}</td>
                <td className="p-3">{a.date}</td>
                <td className="p-3">{a.status}</td>
                <td className="p-3">
                  {a.status === "Pending" && (
                    <>
                      <Button size="sm" className="mr-2">Approve</Button>
                      <Button size="sm" variant="outline">Reject</Button>
                    </>
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
