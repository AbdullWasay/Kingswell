"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Property } from "@/lib/types";
import { getPublishedProperties } from "@/lib/properties";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters from "@/components/PropertyFilters";
import PropertyMap from "@/components/PropertyMap";
import MortgageCalculator from "@/components/MortgageCalculator";

interface PropertyListingsProps {
  type: "sale" | "let";
  properties: Property[];
}

export default function PropertyListings({
  type,
  properties,
}: PropertyListingsProps) {
  const searchParams = useSearchParams();

  const filtered = useMemo(() => {
    let list = getPublishedProperties(properties).filter(
      (p) => p.type === type
    );

    const location = searchParams.get("location")?.toLowerCase();
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const bedrooms = searchParams.get("bedrooms");

    if (location) {
      list = list.filter(
        (p) =>
          p.area.toLowerCase().includes(location) ||
          p.address.toLowerCase().includes(location)
      );
    }
    if (minPrice) {
      list = list.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      list = list.filter((p) => p.price <= Number(maxPrice));
    }
    if (bedrooms) {
      list = list.filter((p) => p.bedrooms >= Number(bedrooms));
    }

    return list;
  }, [type, searchParams, properties]);

  const title = type === "sale" ? "Properties For Sale" : "Properties To Rent";

  return (
    <>
      <section className="bg-kingswell-green py-16 text-center text-white">
        <h1 className="font-serif text-4xl md:text-5xl">{title}</h1>
        <p className="mt-4 text-white/70">
          Premium listings across London & Kent
        </p>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <PropertyFilters type={type} />
            {type === "sale" && (
              <div className="mt-6 hidden lg:block">
                <MortgageCalculator />
              </div>
            )}
          </aside>

          <div className="lg:col-span-3">
            <PropertyMap properties={filtered} />

            <p className="my-6 text-sm text-gray-500">
              {filtered.length} propert{filtered.length === 1 ? "y" : "ies"}{" "}
              found
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              {filtered.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="py-12 text-center text-gray-500">
                No properties match your search. Try adjusting your filters or{" "}
                <a href="/contact" className="text-kingswell-gold underline">
                  contact us
                </a>
                .
              </p>
            )}

            {type === "sale" && (
              <div className="mt-8 lg:hidden">
                <MortgageCalculator />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
