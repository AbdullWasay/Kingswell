"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import type { Property } from "@/lib/types";

function emptyProperty(): Property {
  return {
    id: String(Date.now()),
    slug: "",
    type: "sale",
    title: "",
    address: "",
    area: "Catford",
    price: 0,
    priceLabel: "",
    bedrooms: 2,
    bathrooms: 1,
    receptionRooms: 1,
    description: "",
    features: [],
    images: [],
    lat: 51.4452,
    lng: -0.0201,
    status: "available",
    featured: false,
  };
}

export default function PropertyEditor({
  initial,
  isNew,
}: {
  initial?: Property;
  isNew?: boolean;
}) {
  const router = useRouter();
  const [data, setData] = useState<Property>(initial || emptyProperty());
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    const slug =
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const updated = { ...data, slug };

    const res = await fetch("/api/admin/content/properties");
    const list: Property[] = await res.json();
    const idx = list.findIndex((p) => p.id === updated.id);
    const next =
      idx >= 0
        ? list.map((p) => (p.id === updated.id ? updated : p))
        : [...list, updated];

    try {
      await saveContent("properties", next);
      setMessage("Property saved!");
      if (isNew) router.push(`/kingswell-admin/properties/${updated.id}`);
    } catch {
      setMessage("Error saving.");
    }
    setSaving(false);
  };

  return (
    <AdminShell title={isNew ? "Add Property" : "Edit Property"}>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-sm bg-white p-6 shadow-sm">
          <FormField label="Title">
            <input
              className={inputClass}
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </FormField>
          <FormField label="URL Slug" hint="Auto-generated from title if empty">
            <input
              className={inputClass}
              value={data.slug}
              onChange={(e) => setData({ ...data, slug: e.target.value })}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Type">
              <select
                className={inputClass}
                value={data.type}
                onChange={(e) =>
                  setData({ ...data, type: e.target.value as "sale" | "let" })
                }
              >
                <option value="sale">Sale</option>
                <option value="let">Let</option>
              </select>
            </FormField>
            <FormField label="Status">
              <select
                className={inputClass}
                value={data.status}
                onChange={(e) =>
                  setData({
                    ...data,
                    status: e.target.value as Property["status"],
                  })
                }
              >
                <option value="available">Available</option>
                <option value="under-offer">Under Offer</option>
                <option value="let-agreed">Let Agreed</option>
                <option value="sold">Sold</option>
              </select>
            </FormField>
          </div>
          <FormField label="Area">
            <select
              className={inputClass}
              value={data.area}
              onChange={(e) => setData({ ...data, area: e.target.value })}
            >
              {["Catford", "Lee", "Hither Green", "Lewisham"].map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Address">
            <input
              className={inputClass}
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Price (number)">
              <input
                type="number"
                className={inputClass}
                value={data.price}
                onChange={(e) =>
                  setData({ ...data, price: Number(e.target.value) })
                }
              />
            </FormField>
            <FormField label="Price Label">
              <input
                className={inputClass}
                value={data.priceLabel}
                onChange={(e) =>
                  setData({ ...data, priceLabel: e.target.value })
                }
                placeholder="£625,000"
              />
            </FormField>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormField label="Beds">
              <input
                type="number"
                className={inputClass}
                value={data.bedrooms}
                onChange={(e) =>
                  setData({ ...data, bedrooms: Number(e.target.value) })
                }
              />
            </FormField>
            <FormField label="Baths">
              <input
                type="number"
                className={inputClass}
                value={data.bathrooms}
                onChange={(e) =>
                  setData({ ...data, bathrooms: Number(e.target.value) })
                }
              />
            </FormField>
            <FormField label="Reception">
              <input
                type="number"
                className={inputClass}
                value={data.receptionRooms}
                onChange={(e) =>
                  setData({ ...data, receptionRooms: Number(e.target.value) })
                }
              />
            </FormField>
          </div>
          <label className="mb-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.featured}
              onChange={(e) =>
                setData({ ...data, featured: e.target.checked })
              }
            />
            <span className="text-sm">Featured on homepage</span>
          </label>
        </div>

        <div className="space-y-6">
          <div className="rounded-sm bg-white p-6 shadow-sm">
            <FormField label="Description">
              <textarea
                className={textareaClass}
                rows={6}
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />
            </FormField>
            <FormField label="Features">
              <StringListEditor
                items={data.features}
                onChange={(features) => setData({ ...data, features })}
              />
            </FormField>
            <FormField label="EPC Rating">
              <input
                className={inputClass}
                value={data.epcRating || ""}
                onChange={(e) =>
                  setData({ ...data, epcRating: e.target.value })
                }
              />
            </FormField>
          </div>

          <div className="rounded-sm bg-white p-6 shadow-sm">
            <FormField label="Images">
              <StringListEditor
                items={data.images}
                onChange={(images) => setData({ ...data, images })}
                placeholder="Add image URL"
              />
            </FormField>
            <FormField label="Upload new image">
              <ImageUpload
                value=""
                onChange={(url) =>
                  setData({ ...data, images: [...data.images, url] })
                }
                folder="properties"
              />
            </FormField>
            <FormField label="Floorplan URL">
              <ImageUpload
                value={data.floorplan || ""}
                onChange={(floorplan) => setData({ ...data, floorplan })}
                folder="properties"
              />
            </FormField>
          </div>
        </div>
      </div>
      <SaveBar onSave={handleSave} saving={saving} message={message} />
    </AdminShell>
  );
}
