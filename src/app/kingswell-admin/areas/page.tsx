"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import type { AreaGuide } from "@/lib/types";

export default function AdminAreasPage() {
  const [items, setItems] = useState<AreaGuide[]>([]);

  useEffect(() => {
    fetch("/api/admin/content/areas").then((r) => r.json()).then(setItems);
  }, []);

  return (
    <AdminShell title="Area Guides">
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((a) => (
          <Link
            key={a.slug}
            href={`/kingswell-admin/areas/${a.slug}`}
            className="flex items-center justify-between rounded-sm bg-white p-6 shadow-sm hover:border-kingswell-gold hover:shadow-md"
          >
            <div>
              <h3 className="font-serif text-xl text-kingswell-green">{a.name}</h3>
              <p className="text-sm text-gray-500">{a.tagline}</p>
            </div>
            <Pencil className="h-5 w-5 text-kingswell-gold" />
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
