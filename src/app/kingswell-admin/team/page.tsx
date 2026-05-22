"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";
import SaveBar from "@/components/admin/SaveBar";
import {
  FormField,
  inputClass,
  textareaClass,
  ImageUpload,
  saveContent,
} from "@/components/admin/FormField";
import type { TeamMember } from "@/lib/types";

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/content/team").then((r) => r.json()).then(setItems);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveContent("team", items);
      setMessage("Saved!");
    } catch {
      setMessage("Error saving.");
    }
    setSaving(false);
  };

  return (
    <AdminShell title="Team">
      <button
        type="button"
        onClick={() =>
          setItems([
            ...items,
            {
              id: String(Date.now()),
              name: "",
              role: "",
              bio: "",
              image: "",
            },
          ])
        }
        className="btn-primary mb-6"
      >
        <Plus className="h-4 w-4" />
        Add Member
      </button>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((m, i) => (
          <div key={m.id} className="rounded-sm bg-white p-6 shadow-sm">
            <button
              type="button"
              className="mb-4 text-red-500"
              onClick={() => setItems(items.filter((x) => x.id !== m.id))}
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <FormField label="Name">
              <input
                className={inputClass}
                value={m.name}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...m, name: e.target.value };
                  setItems(next);
                }}
              />
            </FormField>
            <FormField label="Role">
              <input
                className={inputClass}
                value={m.role}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...m, role: e.target.value };
                  setItems(next);
                }}
              />
            </FormField>
            <FormField label="Bio">
              <textarea
                className={textareaClass}
                rows={3}
                value={m.bio}
                onChange={(e) => {
                  const next = [...items];
                  next[i] = { ...m, bio: e.target.value };
                  setItems(next);
                }}
              />
            </FormField>
            <FormField label="Photo">
              <ImageUpload
                value={m.image}
                onChange={(image) => {
                  const next = [...items];
                  next[i] = { ...m, image };
                  setItems(next);
                }}
                folder="team"
              />
            </FormField>
          </div>
        ))}
      </div>
      <SaveBar onSave={handleSave} saving={saving} message={message} />
    </AdminShell>
  );
}
