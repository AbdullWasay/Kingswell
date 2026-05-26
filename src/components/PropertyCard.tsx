"use client";

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Share2, Heart } from "lucide-react";
import type { Property } from "@/lib/types";
import { useState } from "react";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [saved, setSaved] = useState(false);
  const basePath =
    property.type === "sale" ? "/properties/for-sale" : "/properties/to-rent";

  const handleShare = async () => {
    const url = `${window.location.origin}${basePath}/${property.slug}`;
    if (navigator.share) {
      await navigator.share({ title: property.title, url });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <article className="group overflow-hidden rounded-sm bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      <Link href={`${basePath}/${property.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0]}
          alt={`${property.title} — ${property.bedrooms} bedroom ${property.type === "sale" ? "for sale" : "to rent"} in ${property.area}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-kingswell-green px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          {property.status === "available"
            ? property.type === "sale"
              ? "For Sale"
              : "To Let"
            : property.status.replace("-", " ")}
        </span>
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setSaved(!saved);
            }}
            className="rounded-full bg-white/90 p-2 text-kingswell-green transition hover:bg-kingswell-gold"
            aria-label="Save property"
          >
            <Heart className={`h-4 w-4 ${saved ? "fill-kingswell-gold text-kingswell-gold" : ""}`} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleShare();
            }}
            className="rounded-full bg-white/90 p-2 text-kingswell-green transition hover:bg-kingswell-gold"
            aria-label="Share property"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </Link>

      <div className="p-5">
        <p className="text-2xl font-serif text-kingswell-green">
          {property.priceLabel}
        </p>
        <Link href={`${basePath}/${property.slug}`}>
          <h3 className="mt-1 font-serif text-lg text-gray-800 transition hover:text-kingswell-gold">
            {property.title}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-gray-500">{property.address}</p>
        <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-kingswell-gold" />
            {property.bedrooms} bed
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-kingswell-gold" />
            {property.bathrooms} bath
          </span>
        </div>
      </div>
    </article>
  );
}
