"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import type { BlogPost } from "@/lib/content";

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/admin/content/blog").then((r) => r.json()).then(setItems);
  }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this post?")) return;
    const next = items.filter((p) => p.slug !== slug);
    await fetch("/api/admin/content/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    setItems(next);
  };

  return (
    <AdminShell title="Blog">
      <div className="mb-6 flex justify-end">
        <Link href="/kingswell-admin/blog/new" className="btn-primary">
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>
      <div className="space-y-3">
        {items.map((p) => (
          <div
            key={p.slug}
            className="flex items-center justify-between rounded-sm bg-white p-4 shadow-sm"
          >
            <div>
              <h3 className="font-medium text-kingswell-green">{p.title}</h3>
              <p className="text-sm text-gray-500">{p.publishedAt}</p>
            </div>
            <div className="flex gap-2">
              <Link href={`/kingswell-admin/blog/${p.slug}`}>
                <Pencil className="h-4 w-4 text-kingswell-green" />
              </Link>
              <button type="button" onClick={() => handleDelete(p.slug)}>
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
