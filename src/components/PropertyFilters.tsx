"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

interface PropertyFiltersProps {
  type: "sale" | "let";
}

export default function PropertyFilters({ type }: PropertyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedrooms: searchParams.get("bedrooms") || "",
    propertyType: searchParams.get("propertyType") || "",
  });

  const applyFilters = () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    const base =
      type === "sale" ? "/properties/for-sale" : "/properties/to-rent";
    router.push(`${base}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <div className="rounded-sm border border-gray-200 bg-white p-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between font-semibold text-kingswell-green md:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </span>
        <span>{open ? "−" : "+"}</span>
      </button>

      <div className={`${open ? "block" : "hidden"} space-y-4 md:block`}>
        <h3 className="hidden font-serif text-lg text-kingswell-green md:block">
          Refine Search
        </h3>

        <input
          placeholder="Location"
          value={filters.location}
          onChange={(e) =>
            setFilters({ ...filters, location: e.target.value })
          }
          className="w-full rounded-sm border border-gray-200 px-3 py-2 text-sm"
        />

        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder={type === "sale" ? "Min £" : "Min pcm"}
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
            className="rounded-sm border border-gray-200 px-3 py-2 text-sm"
          />
          <input
            type="number"
            placeholder={type === "sale" ? "Max £" : "Max pcm"}
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
            className="rounded-sm border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <select
          value={filters.bedrooms}
          onChange={(e) =>
            setFilters({ ...filters, bedrooms: e.target.value })
          }
          className="w-full rounded-sm border border-gray-200 px-3 py-2 text-sm"
        >
          <option value="">Any bedrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>

        <select
          value={filters.propertyType}
          onChange={(e) =>
            setFilters({ ...filters, propertyType: e.target.value })
          }
          className="w-full rounded-sm border border-gray-200 px-3 py-2 text-sm"
        >
          <option value="">All types</option>
          <option value="house">House</option>
          <option value="flat">Flat</option>
          <option value="bungalow">Bungalow</option>
        </select>

        <button type="button" onClick={applyFilters} className="btn-primary w-full">
          Apply Filters
        </button>
      </div>
    </div>
  );
}
