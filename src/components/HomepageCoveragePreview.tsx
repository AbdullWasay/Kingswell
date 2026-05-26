import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import type { CoverageAreasContent } from "@/components/AreasWeCover";

const FALLBACK = "/images/areas/london.jpg";

export default function HomepageCoveragePreview({
  content,
}: {
  content: CoverageAreasContent;
}) {
  const highlights = content.areas
    .filter((a) => a.featured || a.slug === "london" || a.slug === "kent")
    .slice(0, 3);

  const preview =
    highlights.length >= 3
      ? highlights
      : content.areas.filter((a) => !a.featured).slice(0, 3);

  return (
    <section
      className="scroll-mt-24 bg-kingswell-green section-padding-compact text-white"
      aria-labelledby="coverage-preview-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-kingswell-gold">
              Where we work
            </p>
            <h2
              id="coverage-preview-heading"
              className="mt-3 font-serif text-3xl md:text-4xl"
            >
              Covering London &amp; Kent
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
              Boutique expertise across prime London neighbourhoods, South East
              London, and Kent — with the reach to market your property to the
              right audience.
            </p>
          </div>
          <Link
            href="#areas-we-cover"
            className="btn-primary shrink-0 w-full sm:w-auto"
          >
            <MapPin className="h-4 w-4" />
            Explore all areas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6">
          {preview.map((area) => (
            <li key={area.name}>
              <Link
                href="#areas-we-cover"
                className="group relative block min-h-[10rem] overflow-hidden rounded-sm sm:min-h-[12rem]"
              >
                <Image
                  src={area.image || FALLBACK}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-kingswell-green via-kingswell-green/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-5">
                  <p className="font-serif text-lg text-white md:text-xl">
                    {area.name}
                  </p>
                  {area.tagline && (
                    <p className="mt-1 text-xs text-white/75 md:text-sm">
                      {area.tagline}
                    </p>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
