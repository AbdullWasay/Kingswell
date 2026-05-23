"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

interface PropertySearchBarProps {
  defaultType?: "sale" | "let";
  variant?: "hero" | "inline";
}

export default function PropertySearchBar({
  defaultType = "sale",
  variant = "hero",
}: PropertySearchBarProps) {
  const router = useRouter();
  const [type, setType] = useState(defaultType);
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const base =
      type === "sale" ? "/properties/for-sale" : "/properties/to-rent";
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (bedrooms) params.set("bedrooms", bedrooms);
    router.push(`${base}?${params.toString()}`);
  };

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={handleSearch}
      className={`w-full max-w-4xl ${
        isHero
          ? "rounded-sm bg-white/95 p-4 shadow-2xl backdrop-blur md:p-6"
          : "rounded-sm border border-gray-200 bg-white p-4"
      }`}
    >
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setType("sale")}
          className={`flex-1 rounded-sm py-2 text-sm font-semibold uppercase tracking-wider transition ${
            type === "sale"
              ? "bg-kingswell-green text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Buy
        </button>
        <button
          type="button"
          onClick={() => setType("let")}
          className={`flex-1 rounded-sm py-2 text-sm font-semibold uppercase tracking-wider transition ${
            type === "let"
              ? "bg-kingswell-green text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          Rent
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <input
          type="text"
          placeholder="Location (e.g. London, Kent, Lewisham)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none lg:col-span-2"
        />
        <input
          type="number"
          placeholder={type === "sale" ? "Min price £" : "Min rent £"}
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
        />
        <input
          type="number"
          placeholder={type === "sale" ? "Max price £" : "Max rent £"}
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
        />
        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="rounded-sm border border-gray-200 px-4 py-3 text-sm focus:border-kingswell-gold focus:outline-none"
        >
          <option value="">Bedrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
          <option value="5">5+</option>
        </select>
      </div>

      <button type="submit" className="btn-primary mt-4 w-full md:w-auto">
        <Search className="h-4 w-4" />
        Search Properties
      </button>
    </form>
  );
}
