"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import SaveBar from "@/components/admin/SaveBar";
import { FormField, inputClass, textareaClass, saveContent } from "@/components/admin/FormField";
import type { WhyChooseItem } from "@/lib/content";

const ICONS = ["MapPin", "Megaphone", "Camera", "Share2", "Shield", "Zap"];

export default function AdminWhyChoosePage() {
  const [items, setItems] = useState<WhyChooseItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content/why-choose").then((r) => r.json()).then(setItems);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveContent("why-choose", items);
      setMessage("Saved!");
    } catch {
      setMessage("Error saving.");
    }
    setSaving(false);
  };

  return (
    <AdminShell title="Why Choose Kingswell">
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="rounded-sm bg-white p-6 shadow-sm">
            <FormField label="Title">
              <input
                className={inputClass}
                value={item.title}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...item, title: e.target.value };
                  setItems(next);
                }}
              />
            </FormField>
            <FormField label="Description">
              <textarea
                className={textareaClass}
                rows={2}
                value={item.description}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...item, description: e.target.value };
                  setItems(next);
                }}
              />
            </FormField>
            <FormField label="Icon">
              <select
                className={inputClass}
                value={item.icon}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...item, icon: e.target.value };
                  setItems(next);
                }}
              >
                {ICONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        ))}
      </div>
      <SaveBar onSave={handleSave} saving={saving} message={message} />
    </AdminShell>
  );
}
