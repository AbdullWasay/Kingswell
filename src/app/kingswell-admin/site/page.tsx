"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import SaveBar from "@/components/admin/SaveBar";
import { FormField, inputClass, saveContent } from "@/components/admin/FormField";
import type { SiteConfig } from "@/lib/content";

export default function AdminSitePage() {
  const [data, setData] = useState<SiteConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content/site")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    setMessage("");
    try {
      await saveContent("site", data);
      setMessage("Saved successfully!");
    } catch {
      setMessage("Error saving. Try again.");
    }
    setSaving(false);
  };

  if (!data) {
    return (
      <AdminShell title="Site Settings">
        <p className="text-gray-500">Loading...</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell title="Site Settings">
      <div className="max-w-2xl rounded-sm bg-white p-6 shadow-sm">
        <FormField label="Agency Name">
          <input
            className={inputClass}
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </FormField>
        <FormField label="Slogan">
          <input
            className={inputClass}
            value={data.slogan}
            onChange={(e) => setData({ ...data, slogan: e.target.value })}
          />
        </FormField>
        <FormField label="Phone">
          <input
            className={inputClass}
            value={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
          />
        </FormField>
        <FormField label="Email">
          <input
            className={inputClass}
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </FormField>
        <FormField label="WhatsApp (no +)">
          <input
            className={inputClass}
            value={data.whatsapp}
            onChange={(e) => setData({ ...data, whatsapp: e.target.value })}
          />
        </FormField>
        <FormField label="Address">
          <textarea
            className={inputClass}
            rows={2}
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
        </FormField>
        <h3 className="mb-3 font-serif text-lg text-kingswell-green">Opening Hours</h3>
        {(["weekdays", "saturday", "sunday"] as const).map((key) => (
          <FormField key={key} label={key}>
            <input
              className={inputClass}
              value={data.hours[key]}
              onChange={(e) =>
                setData({
                  ...data,
                  hours: { ...data.hours, [key]: e.target.value },
                })
              }
            />
          </FormField>
        ))}
        <h3 className="mb-3 mt-6 font-serif text-lg text-kingswell-green">Social Links</h3>
        {(["instagram", "facebook", "linkedin"] as const).map((key) => (
          <FormField key={key} label={key}>
            <input
              className={inputClass}
              value={data.social[key]}
              onChange={(e) =>
                setData({
                  ...data,
                  social: { ...data.social, [key]: e.target.value },
                })
              }
            />
          </FormField>
        ))}
      </div>
      <SaveBar onSave={handleSave} saving={saving} message={message} />
    </AdminShell>
  );
}
