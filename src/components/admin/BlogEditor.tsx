"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import SaveBar from "@/components/admin/SaveBar";
import {
  FormField,
  inputClass,
  textareaClass,
  ImageUpload,
  saveContent,
} from "@/components/admin/FormField";
import type { BlogPost } from "@/lib/content";

function emptyPost(): BlogPost {
  return {
    slug: "",
    title: "",
    excerpt: "",
    publishedAt: new Date().toISOString().slice(0, 10),
    author: "Kingswell Team",
    image: "",
    body: "",
  };
}

export default function BlogEditor({
  initial,
  isNew,
}: {
  initial?: BlogPost;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [data, setData] = useState<BlogPost>(initial || emptyPost());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    const slug =
      data.slug ||
      data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const updated = { ...data, slug };
    const res = await fetch("/api/admin/content/blog");
    const list: BlogPost[] = await res.json();
    const idx = list.findIndex((p) => p.slug === (initial?.slug || updated.slug));
    const next =
      idx >= 0
        ? list.map((p, i) => (i === idx ? updated : p))
        : isNew
          ? [...list, updated]
          : list;

    try {
      await saveContent("blog", next);
      setMessage("Saved!");
      if (isNew) router.push(`/kingswell-admin/blog/${updated.slug}`);
    } catch {
      setMessage("Error saving.");
    }
    setSaving(false);
  };

  return (
    <AdminShell title={isNew ? "New Blog Post" : "Edit Blog Post"}>
      <div className="max-w-2xl rounded-sm bg-white p-6 shadow-sm">
        <FormField label="Title">
          <input
            className={inputClass}
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </FormField>
        <FormField label="Slug">
          <input
            className={inputClass}
            value={data.slug}
            onChange={(e) => setData({ ...data, slug: e.target.value })}
          />
        </FormField>
        <FormField label="Excerpt">
          <textarea
            className={textareaClass}
            rows={2}
            value={data.excerpt}
            onChange={(e) => setData({ ...data, excerpt: e.target.value })}
          />
        </FormField>
        <FormField label="Author">
          <input
            className={inputClass}
            value={data.author}
            onChange={(e) => setData({ ...data, author: e.target.value })}
          />
        </FormField>
        <FormField label="Published Date">
          <input
            type="date"
            className={inputClass}
            value={data.publishedAt}
            onChange={(e) => setData({ ...data, publishedAt: e.target.value })}
          />
        </FormField>
        <FormField label="Hero Image">
          <ImageUpload
            value={data.image}
            onChange={(image) => setData({ ...data, image })}
            folder="blog"
          />
        </FormField>
        <FormField label="Body" hint="Separate paragraphs with a blank line">
          <textarea
            className={textareaClass}
            rows={12}
            value={data.body}
            onChange={(e) => setData({ ...data, body: e.target.value })}
          />
        </FormField>
      </div>
      <SaveBar onSave={handleSave} saving={saving} message={message} />
    </AdminShell>
  );
}
