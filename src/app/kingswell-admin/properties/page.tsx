"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import type { Property } from "@/lib/types";

export default function AdminPropertiesPage() {
  const [items, setItems] = useState<Property[]>([]);

  useEffect(() => {
    fetch("/api/admin/content/properties")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property?")) return;
    const next = items.filter((p) => p.id !== id);
    await fetch("/api/admin/content/properties", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setItems(next);
  };

  return (
    <AdminShell title="Properties">
      <div className="mb-6 flex justify-between">
        <p className="text-gray-600">{items.length} listings</p>
        <Link href="/kingswell-admin/properties/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add Property
        </Link>
      </div>

      <div className="overflow-hidden rounded-sm bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Area</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 capitalize">{p.type}</td>
                <td className="px-4 py-3">{p.area}</td>
                <td className="px-4 py-3">{p.priceLabel}</td>
                <td className="px-4 py-3">{p.status}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/kingswell-admin/properties/${p.id}`}
                      className="text-kingswell-green hover:text-kingswell-gold"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
