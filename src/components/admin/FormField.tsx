export function FormField({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-4">
      <label className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export const inputClass =
  "w-full rounded-sm border border-gray-300 px-3 py-2 text-sm focus:border-kingswell-gold focus:outline-none focus:ring-1 focus:ring-kingswell-gold";

export const textareaClass =
  "w-full rounded-sm border border-gray-300 px-3 py-2 text-sm focus:border-kingswell-gold focus:outline-none focus:ring-1 focus:ring-kingswell-gold";

export function StringListEditor({
  items,
  onChange,
  placeholder = "Add item",
}: {
  items: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="shrink-0 rounded-sm border border-red-200 px-3 text-sm text-red-600 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="text-sm text-kingswell-green hover:text-kingswell-gold"
      >
        + {placeholder}
      </button>
    </div>
  );
}

export function ImageUpload({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
}) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const { url } = await res.json();
      onChange(url);
    } else {
      alert("Upload failed");
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
        placeholder="Image URL or upload below"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="text-sm text-gray-600"
      />
      <p className="text-xs text-gray-500">
        Stored on Cloudinary when configured. URL is saved to MongoDB.
      </p>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Preview" className="h-24 rounded-sm object-cover" />
      )}
    </div>
  );
}

async function saveContent(key: string, data: unknown) {
  const res = await fetch(`/api/admin/content/${key}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save");
}

export { saveContent };
