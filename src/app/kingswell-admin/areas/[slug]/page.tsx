"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import SaveBar from "@/components/admin/SaveBar";
import {
  FormField,
  inputClass,
  textareaClass,
  StringListEditor,
  ImageUpload,
  saveContent,
} from "@/components/admin/FormField";
import type { AreaGuide } from "@/lib/types";

export default function EditAreaPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<AreaGuide | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content/areas")
      .then((r) => r.json())
      .then((list: AreaGuide[]) => setData(list.find((a) => a.slug === slug) || null));
  }, [slug]);

  const handleSave = async () => {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/admin/content/areas");
    const list: AreaGuide[] = await res.json();
    const next = list.map((a) => (a.slug === slug ? data : a));
    try {
      await saveContent("areas", next);
      setMessage("Saved!");
    } catch {
      setMessage("Error saving.");
    }
    setSaving(false);
  };

  if (!data) return <p className="p-8">Loading...</p>;

  return (
    <AdminShell title={`Edit ${data.name}`}>
      <div className="max-w-3xl space-y-6 rounded-sm bg-white p-6 shadow-sm">
        <FormField label="Tagline">
          <input
            className={inputClass}
            value={data.tagline}
            onChange={(e) => setData({ ...data, tagline: e.target.value })}
          />
        </FormField>
        <FormField label="Hero Image">
          <ImageUpload
            value={data.heroImage}
            onChange={(heroImage) => setData({ ...data, heroImage })}
            folder="areas"
          />
        </FormField>
        <FormField label="Overview">
          <textarea
            className={textareaClass}
            rows={4}
            value={data.overview}
            onChange={(e) => setData({ ...data, overview: e.target.value })}
          />
        </FormField>
        <FormField label="Schools">
          <StringListEditor
            items={data.schools}
            onChange={(schools) => setData({ ...data, schools })}
          />
        </FormField>
        <FormField label="Transport">
          <StringListEditor
            items={data.transport}
            onChange={(transport) => setData({ ...data, transport })}
          />
        </FormField>
        <FormField label="Lifestyle">
          <StringListEditor
            items={data.lifestyle}
            onChange={(lifestyle) => setData({ ...data, lifestyle })}
          />
        </FormField>
        <FormField label="Amenities">
          <StringListEditor
            items={data.amenities}
            onChange={(amenities) => setData({ ...data, amenities })}
          />
        </FormField>
        <FormField label="Market Insights">
          <textarea
            className={textareaClass}
            rows={4}
            value={data.marketInsights}
            onChange={(e) =>
              setData({ ...data, marketInsights: e.target.value })
            }
          />
        </FormField>
      </div>
      <SaveBar onSave={handleSave} saving={saving} message={message} />
    </AdminShell>
  );
}
