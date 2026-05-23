import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

export interface CoverageArea {
  name: string;
  slug?: string;
  tagline?: string;
  image: string;
  blurb: string;
  featured?: boolean;
}

export interface CoverageAreasContent {
  title: string;
  intro: string;
  disclaimer: string;
  areas: CoverageArea[];
}

const FALLBACK_AREA_IMAGE = "/images/areas/london.jpg";

function areaSearchHref(name: string) {
  const params = new URLSearchParams({ location: name });
  return `/properties/for-sale?${params.toString()}`;
}

export default function AreasWeCover({ content }: { content: CoverageAreasContent }) {
  const primaryAreas = content.areas.filter((a) => !a.featured);
  const featuredArea = content.areas.find((a) => a.featured);

  return (
    <section id="areas-we-cover" className="bg-[#faf9f7] section-padding scroll-mt-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="gold-divider mb-6" />
        <p className="mb-3 text-sm uppercase tracking-[0.25em] text-kingswell-gold">
          Local expertise · Wider reach
        </p>
        <h2 className="font-serif text-3xl text-kingswell-green md:text-5xl">
          {content.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
          {content.intro}
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {primaryAreas.map((area, index) => (
            <article
              key={area.name}
              className={`group relative min-h-[22rem] overflow-hidden rounded-sm shadow-md transition-shadow duration-500 hover:shadow-xl ${
                index === 0 ? "sm:col-span-2 sm:min-h-[26rem] lg:col-span-2 lg:row-span-2 lg:min-h-full" : ""
              }`}
            >
              <Image
                src={area.image || FALLBACK_AREA_IMAGE}
                alt={area.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes={
                  index === 0
                    ? "(max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />
              <div className="absolute inset-0 bg-gradient-to-t from-kingswell-green via-kingswell-green/55 to-kingswell-green/10 transition-opacity duration-500 group-hover:via-kingswell-green/65" />
              <div className="absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-kingswell-gold/40" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="mb-3 flex items-center gap-2 text-kingswell-gold">
                  <MapPin className="h-4 w-4 shrink-0" />
                  {area.tagline && (
                    <span className="text-xs uppercase tracking-widest">
                      {area.tagline}
                    </span>
                  )}
                </div>
                <h3
                  className={`font-serif text-white ${
                    index === 0 ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
                  }`}
                >
                  {area.name}
                </h3>
                <p
                  className={`mt-3 leading-relaxed text-white/85 ${
                    index === 0 ? "max-w-xl text-base md:text-lg" : "text-sm md:text-base"
                  }`}
                >
                  {area.blurb}
                </p>
                <Link
                  href={areaSearchHref(area.name)}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-kingswell-gold transition group-hover:gap-3"
                >
                  View properties
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {featuredArea && (
          <article className="group relative mt-8 min-h-[20rem] overflow-hidden rounded-sm shadow-md transition-shadow hover:shadow-xl md:min-h-[18rem]">
            <Image
              src={featuredArea.image || FALLBACK_AREA_IMAGE}
              alt={featuredArea.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-kingswell-green via-kingswell-green/85 to-kingswell-green/40 md:via-kingswell-green/75" />
            <div className="relative flex h-full min-h-[20rem] flex-col justify-center p-8 md:min-h-[18rem] md:max-w-2xl md:p-12">
              <p className="text-xs uppercase tracking-[0.25em] text-kingswell-gold">
                {featuredArea.tagline}
              </p>
              <h3 className="mt-2 font-serif text-3xl text-white md:text-4xl">
                {featuredArea.name}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
                {featuredArea.blurb}
              </p>
              <Link href="/contact" className="btn-primary mt-8 w-fit">
                Discuss your area
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        )}
      </div>

      <p className="mx-auto mt-14 max-w-2xl text-center text-sm italic leading-relaxed text-gray-500">
        {content.disclaimer}
      </p>
    </section>
  );
}
