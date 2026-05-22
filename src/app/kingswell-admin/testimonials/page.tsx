"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import SaveBar from "@/components/admin/SaveBar";
import { FormField, inputClass, textareaClass, saveContent } from "@/components/admin/FormField";
import type { Testimonial } from "@/lib/types";

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content/testimonials").then((r) => r.json()).then(setItems);
  }, []);

  const addNew = () => {
    setItems([
      ...items,
      {
        id: String(Date.now()),
        name: "",
        text: "",
        rating: 5,
        date: new Date().toISOString().slice(0, 10),
      },
    ]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveContent("testimonials", items);
      setMessage("Saved!");
    } catch {
      setMessage("Error saving.");
    }
    setSaving(false);
  };

  return (
    <AdminShell title="Testimonials">
      <button type="button" onClick={addNew} className="btn-primary mb-6">
        <Plus className="h-4 w-4" />
        Add Review
      </button>
      <div className="space-y-6">
        {items.map((t, i) => (
          <div key={t.id} className="rounded-sm bg-white p-6 shadow-sm">
            <div className="mb-4 flex justify-between">
              <span className="text-sm text-gray-500">Review #{i + 1}</span>
              <button
                type="button"
                onClick={() => setItems(items.filter((x) => x.id !== t.id))}
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <FormField label="Name">
                <input
                  className={inputClass}
                  value={t.name}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...t, name: e.target.value };
                    setItems(next);
                  }}
                />
              </FormField>
              <FormField label="Rating (1-5)">
                <input
                  type="number"
                  min={1}
                  max={5}
                  className={inputClass}
                  value={t.rating}
                  onChange={(e) => {
                    const next = [...items];
                    next[i] = { ...t, rating: Number(e.target.value) };
                    setItems(next);
                  }}
                />
              </FormField>
            </div>
            <FormField label="Review Text">
              <textarea
                className={textareaClass}
                rows={3}
                value={t.text}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...t, text: e.target.value };
                  setItems(next);
                }}
              />
            </FormField>
          </div>
        ))}
      </div>
      <SaveBar onSave={handleSave} saving={saving} message={message} />
    </AdminShell>
  );
}
