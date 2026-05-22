"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Bed,
  Bath,
  MapPin,
  Share2,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Property } from "@/lib/types";
import PropertyCard from "@/components/PropertyCard";
import LeadForm from "@/components/LeadForm";
import { whatsappUrl } from "@/lib/whatsapp";

interface PropertyDetailProps {
  property: Property;
  similar?: Property[];
}

export default function PropertyDetail({
  property,
  similar = [],
}: PropertyDetailProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const basePath =
    property.type === "sale" ? "/properties/for-sale" : "/properties/to-rent";

  const waMessage = `Hi, I'm interested in ${property.title} at ${property.address} (${property.priceLabel})`;

  return (
    <>
      <section className="bg-kingswell-green py-6 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
          <Link
            href={basePath}
            className="flex items-center gap-1 text-sm text-white/70 hover:text-kingswell-gold"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to listings
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSaved(!saved)}
              className="rounded-sm border border-kingswell-gold/50 p-2 hover:bg-kingswell-gold/20"
            >
              <Heart className={`h-5 w-5 ${saved ? "fill-kingswell-gold text-kingswell-gold" : ""}`} />
            </button>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="rounded-sm border border-kingswell-gold/50 p-2 hover:bg-kingswell-gold/20"
            >
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative">
        <div className="relative aspect-[16/9] max-h-[600px] w-full bg-gray-900 md:aspect-[21/9]">
          <Image
            src={property.images[activeImage]}
            alt={property.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {property.images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() =>
                  setActiveImage((i) =>
                    i === 0 ? property.images.length - 1 : i - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setActiveImage((i) =>
                    i === property.images.length - 1 ? 0 : i + 1
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto bg-gray-100 p-4">
          {property.images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveImage(i)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-sm ${
                i === activeImage ? "ring-2 ring-kingswell-gold" : ""
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="112px" />
            </button>
          ))}
        </div>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="font-serif text-4xl text-kingswell-green">
              {property.priceLabel}
            </p>
            <h1 className="mt-2 font-serif text-2xl text-gray-800 md:text-3xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-gray-500">
              <MapPin className="h-4 w-4 text-kingswell-gold" />
              {property.address}, {property.area}
            </p>

            <div className="mt-6 flex gap-6 border-y border-gray-100 py-4">
              <span className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-kingswell-gold" />
                {property.bedrooms} Bedrooms
              </span>
              <span className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-kingswell-gold" />
                {property.bathrooms} Bathrooms
              </span>
              <span>{property.receptionRooms} Reception</span>
            </div>

            <div className="mt-8">
              <h2 className="heading-section mb-4">Description</h2>
              <p className="leading-relaxed text-gray-600">
                {property.description}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="heading-section mb-4">Key Features</h2>
              <ul className="grid gap-2 md:grid-cols-2">
                {property.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-kingswell-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {property.floorplan && (
              <div className="mt-8">
                <h2 className="heading-section mb-4">Floorplan</h2>
                <div className="relative aspect-[4/3] max-w-lg overflow-hidden rounded-sm">
                  <Image
                    src={property.floorplan}
                    alt="Floorplan"
                    fill
                    className="object-contain bg-gray-50"
                  />
                </div>
              </div>
            )}

            {property.epcRating && (
              <div className="mt-8">
                <h2 className="heading-section mb-4">Energy Performance (EPC)</h2>
                <div className="flex items-center gap-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-sm bg-kingswell-green font-serif text-3xl text-kingswell-gold">
                    {property.epcRating}
                  </div>
                  {property.epcImage && (
                    <div className="relative h-32 w-48 overflow-hidden rounded-sm">
                      <Image
                        src={property.epcImage}
                        alt="EPC certificate"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-8">
              <h2 className="heading-section mb-4">Location</h2>
              <div className="relative h-[350px] overflow-hidden rounded-sm">
                <iframe
                  title="Property location"
                  src={`https://maps.google.com/maps?q=${property.lat},${property.lng}&z=15&output=embed`}
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-sm border border-kingswell-gold/30 bg-white p-6 shadow-lg">
                <h3 className="font-serif text-xl text-kingswell-green">
                  Request a Viewing
                </h3>
                <LeadForm
                  type="viewing"
                  propertyTitle={property.title}
                  className="mt-4"
                />
              </div>

              <a
                href={whatsappUrl(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] py-4 font-semibold text-white transition hover:opacity-90"
              >
                <MessageCircle className="h-5 w-5" />
                Enquire via WhatsApp
              </a>
            </div>
          </aside>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-gray-50 section-padding">
          <div className="mx-auto max-w-7xl">
            <h2 className="heading-section mb-8 text-center">
              Similar Properties
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
