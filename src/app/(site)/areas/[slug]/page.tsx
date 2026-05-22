import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Train, GraduationCap, Coffee, TrendingUp, MapPin } from "lucide-react";
import {
  getAreaGuides,
  getAreaGuide,
  getProperties,
  getPublishedProperties,
} from "@/lib/data";
import { createMetadata } from "@/lib/seo";
import PropertyCard from "@/components/PropertyCard";

export async function generateStaticParams() {
  const areaGuides = await getAreaGuides();
  return areaGuides.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = await getAreaGuide(slug);
  if (!area) return {};
  return createMetadata({
    title: `Estate Agents in ${area.name}`,
    description: `Living in ${area.name}? Schools, transport, lifestyle & property market insights. ${area.tagline}`,
    path: `/areas/${slug}`,
    keywords: [
      `estate agents in ${area.name}`,
      `property for sale ${area.name}`,
      `letting agents ${area.name}`,
    ],
  });
}

export default async function AreaGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const area = await getAreaGuide(slug);
  if (!area) notFound();

  const properties = getPublishedProperties(await getProperties());
  const areaProperties = properties.filter(
    (p) => p.area.toLowerCase() === area.name.toLowerCase()
  );

  return (
    <>
      <section className="relative flex min-h-[50vh] items-end">
        <Image
          src={area.heroImage}
          alt={area.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-kingswell-green to-transparent" />
        <div className="relative z-10 w-full p-8 text-white md:p-16">
          <h1 className="font-serif text-4xl md:text-6xl">{area.name}</h1>
          <p className="mt-2 text-xl text-kingswell-gold">{area.tagline}</p>
        </div>
      </section>

      <section className="section-padding mx-auto max-w-4xl">
        <p className="text-lg leading-relaxed text-gray-600">{area.overview}</p>
      </section>

      <section className="bg-gray-50 section-padding">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-kingswell-gold" />
              <h2 className="font-serif text-2xl text-kingswell-green">Schools</h2>
            </div>
            <ul className="space-y-2">
              {area.schools.map((s) => (
                <li key={s} className="text-gray-600">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Train className="h-6 w-6 text-kingswell-gold" />
              <h2 className="font-serif text-2xl text-kingswell-green">Transport</h2>
            </div>
            <ul className="space-y-2">
              {area.transport.map((t) => (
                <li key={t} className="text-gray-600">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Coffee className="h-6 w-6 text-kingswell-gold" />
              <h2 className="font-serif text-2xl text-kingswell-green">Lifestyle</h2>
            </div>
            <ul className="space-y-2">
              {area.lifestyle.map((l) => (
                <li key={l} className="text-gray-600">
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="mb-4 flex items-center gap-2">
              <MapPin className="h-6 w-6 text-kingswell-gold" />
              <h2 className="font-serif text-2xl text-kingswell-green">
                Local Amenities
              </h2>
            </div>
            <ul className="space-y-2">
              {area.amenities.map((a) => (
                <li key={a} className="text-gray-600">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding mx-auto max-w-4xl">
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-kingswell-gold" />
          <h2 className="font-serif text-2xl text-kingswell-green">
            Property Market Insights
          </h2>
        </div>
        <p className="leading-relaxed text-gray-600">{area.marketInsights}</p>
      </section>

      {areaProperties.length > 0 && (
        <section className="bg-gray-50 section-padding">
          <div className="mx-auto max-w-7xl">
            <h2 className="heading-section mb-8 text-center">
              Properties in {area.name}
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {areaProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-kingswell-green section-padding text-center text-white">
        <h2 className="font-serif text-3xl">
          Looking to buy or sell in {area.name}?
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/valuation" className="btn-primary">
            Book Valuation
          </Link>
          <Link href="/properties/for-sale" className="btn-outline border-white text-white hover:bg-white hover:text-kingswell-green">
            View Properties
          </Link>
        </div>
      </section>
    </>
  );
}
