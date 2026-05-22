"use client";

import type { Property } from "@/lib/types";

interface PropertyMapProps {
  properties: Property[];
  selectedId?: string;
}

export default function PropertyMap({
  properties,
  selectedId,
}: PropertyMapProps) {
  const center = properties[0]
    ? `${properties[0].lat},${properties[0].lng}`
    : "51.4452,-0.0201";

  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-sm bg-gray-100 md:h-[500px]">
      {/* Replace YOUR_GOOGLE_MAPS_API_KEY with actual key in production */}
      <iframe
        title="Property map"
        src={`https://maps.google.com/maps?q=${center}&z=13&output=embed`}
        className="h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute bottom-4 left-4 rounded-sm bg-white/95 px-4 py-2 text-sm shadow">
        <span className="font-semibold text-kingswell-green">
          {properties.length}
        </span>{" "}
        properties shown
        {selectedId && (
          <span className="ml-2 text-kingswell-gold">· 1 selected</span>
        )}
      </div>
      {/* Hidden markers data for future Google Maps JS API integration */}
      <script type="application/json" id="property-markers">
        {JSON.stringify(
          properties.map((p) => ({
            id: p.id,
            lat: p.lat,
            lng: p.lng,
            title: p.title,
            price: p.priceLabel,
          }))
        )}
      </script>
    </div>
  );
}
