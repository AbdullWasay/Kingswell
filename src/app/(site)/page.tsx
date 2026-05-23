import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Megaphone,
  Camera,
  Share2,
  Shield,
  Zap,
  Star,
  ChevronRight,
} from "lucide-react";
import PropertySearchBar from "@/components/PropertySearchBar";
import PropertyCard from "@/components/PropertyCard";
import AreasWeCover from "@/components/AreasWeCover";
import {
  getProperties,
  getHomepageListings,
  getTestimonials,
  getWhyChoose,
  getCoverageAreas,
  getSite,
} from "@/lib/data";

export const dynamic = "force-dynamic";

const iconMap: Record<string, React.ElementType> = {
  MapPin,
  Megaphone,
  Camera,
  Share2,
  Shield,
  Zap,
};

export default async function HomePage() {
  const [SITE, properties, testimonials, whyChoose, coverageAreas] =
    await Promise.all([
      getSite(),
      getProperties(),
      getTestimonials(),
      getWhyChoose(),
      getCoverageAreas(),
    ]);
  const homepageListings = getHomepageListings(properties);
  const heroTagline =
    SITE.tagline ?? "Premium Estate Agents Covering London & Kent";

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Premium property in London and Kent"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kingswell-green/80 via-kingswell-green/60 to-kingswell-green/90" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 text-center md:px-8">
          <p className="mb-4 animate-fade-in text-sm uppercase tracking-[0.3em] text-kingswell-gold">
            {SITE.slogan}
          </p>
          <h1 className="animate-slide-up font-serif text-4xl font-normal tracking-wide text-white md:text-5xl lg:text-6xl">
            {heroTagline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-slide-up text-lg text-white/80 md:text-xl">
            Helping sellers, buyers, landlords and tenants across London & Kent.
            Local expertise with wider London & Kent reach.
          </p>

          <div className="mt-10 flex animate-slide-up justify-center">
            <PropertySearchBar variant="hero" />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/valuation" className="btn-primary">
              Book Valuation
            </Link>
            <Link
              href="/properties/for-sale"
              className="btn-outline border-white text-white hover:bg-white hover:text-kingswell-green"
            >
              Properties For Sale
            </Link>
            <Link
              href="/properties/to-rent"
              className="btn-outline border-white text-white hover:bg-white hover:text-kingswell-green"
            >
              Properties To Rent
            </Link>
            <Link href="/contact" className="btn-white">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding mx-auto max-w-4xl text-center">
        <div className="gold-divider mb-6" />
        <h2 className="heading-section mb-6">Welcome to Kingswell</h2>
        <p className="text-lg leading-relaxed text-gray-600">
          Kingswell Estate Agents is a luxury boutique agency for discerning
          buyers, sellers, landlords and tenants across London and Kent. We
          combine premium marketing with deep local knowledge — delivering an
          established, personal service that positions your property perfectly
          and finds your ideal home faster.
        </p>
        <Link href="/about" className="btn-primary mt-8 inline-flex">
          Discover Kingswell
          <ChevronRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Featured Properties */}
      <section className="bg-gray-50 section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <div className="gold-divider mb-6" />
            <h2 className="heading-section">Latest Properties</h2>
            <p className="mt-4 text-gray-600">
              {homepageListings.length} listing
              {homepageListings.length !== 1 ? "s" : ""} from our portfolio
              across London & Kent
            </p>
          </div>
          {homepageListings.length === 0 ? (
            <p className="text-center text-gray-500">No properties listed yet.</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {homepageListings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Link href="/properties/for-sale" className="btn-primary">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="gold-divider mb-6" />
          <h2 className="heading-section">Why Choose Kingswell</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item) => {
            const Icon = iconMap[item.icon] || MapPin;
            return (
              <div
                key={item.title}
                className="group rounded-sm border border-gray-100 p-8 transition-all duration-300 hover:border-kingswell-gold/50 hover:shadow-lg"
              >
                <Icon className="mb-4 h-8 w-8 text-kingswell-gold transition-transform group-hover:scale-110" />
                <h3 className="mb-2 font-serif text-xl text-kingswell-green">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <AreasWeCover content={coverageAreas} />

      {/* Testimonials */}
      <section className="section-padding mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="gold-divider mb-6" />
          <h2 className="heading-section">What Our Clients Say</h2>
          <p className="mt-2 flex items-center justify-center gap-1 text-sm text-gray-500">
            <Star className="h-4 w-4 fill-kingswell-gold text-kingswell-gold" />
            Google Reviews
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="rounded-sm border border-gray-100 bg-white p-8 shadow-sm"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-kingswell-gold text-kingswell-gold"
                  />
                ))}
              </div>
              <p className="italic leading-relaxed text-gray-700">
                &ldquo;{t.text}&rdquo;
              </p>
              <footer className="mt-4 font-semibold text-kingswell-green">
                — {t.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Valuation CTA */}
      <section className="relative overflow-hidden bg-kingswell-green section-padding">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl text-white md:text-5xl">
            Book Your Free Property Valuation
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Discover what your home is worth with a no-obligation valuation from
            London & Kent&apos;s trusted luxury agents.
          </p>
          <Link href="/valuation" className="btn-primary mt-8">
            Book Valuation Now
          </Link>
        </div>
      </section>
    </>
  );
}
