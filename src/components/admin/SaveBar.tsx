"use client";

import { Save, Loader2 } from "lucide-react";

interface SaveBarProps {
  onSave: () => void | Promise<void>;
  saving: boolean;
  message?: string;
}

export default function SaveBar({ onSave, saving, message }: SaveBarProps) {
  return (
    <div className="sticky bottom-0 -mx-8 mt-8 flex items-center justify-between border-t border-gray-200 bg-white px-8 py-4 shadow-lg">
      {message && (
        <p
          className={`text-sm ${
            message.includes("success") || message.includes("Saved")
              ? "text-green-600"
              : message.includes("Error")
                ? "text-red-600"
                : "text-gray-500"
          }`}
        >
          {message}
        </p>
      )}
      <div className="ml-auto">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="btn-primary disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
