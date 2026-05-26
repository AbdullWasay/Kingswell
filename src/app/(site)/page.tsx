import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Megaphone,
  Camera,
  Share2,
  Shield,
  Zap,
  ChevronRight,
  Phone,
  CalendarCheck,
} from "lucide-react";
import PropertySearchBar from "@/components/PropertySearchBar";
import PropertyCard from "@/components/PropertyCard";
import AreasWeCover from "@/components/AreasWeCover";
import HomepageServices from "@/components/HomepageServices";
import HomepageCoveragePreview from "@/components/HomepageCoveragePreview";
import HomepageHeroQuickLinks from "@/components/HomepageHeroQuickLinks";
import TestimonialsGrid from "@/components/TestimonialsGrid";
import { createMetadata } from "@/lib/seo";
import { formatPhone, telHref } from "@/lib/phone";
import {
  getProperties,
  getHomepageListings,
  getTestimonials,
  getWhyChoose,
  getCoverageAreas,
  getSite,
} from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  description:
    "Kingswell Estate Agents — premium sales and lettings across London and Kent. Book a free valuation, search properties for sale and to rent, and speak to our local team.",
  path: "/",
  keywords: [
    "Kingswell estate agents",
    "property valuation London",
    "estate agents EC2A",
  ],
});

const HERO_IMAGE = "/images/hero/london-residential.jpg";
const CTA_BG_IMAGE = "/images/hero/luxury-apartment-interior.jpg";

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
  const phoneDisplay = formatPhone(SITE.phone);
  const phoneHref = telHref(SITE.phone);

  return (
    <>
      {/* Hero — UK residential first impression */}
      <section className="relative flex min-h-[min(92vh,900px)] items-center">
        <Image
          src={HERO_IMAGE}
          alt="Elegant residential property in London"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDAAQRBQYSITFBUWH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAIDAQAAAAAAAAAAAAAAAAECAAMR/9oADAMBAAIRAxEAPwD0vRrOq6fp0VvaywQ28agKoHJJ9zQB//9k="
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kingswell-green/85 via-kingswell-green/55 to-kingswell-green/90" />

        <div className="relative z-10 mx-auto w-full max-w-7xl section-padding-compact pb-16 pt-8 md:pb-20 md:pt-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="hero-eyebrow animate-fade-in">{SITE.slogan}</p>
            <h1 className="mt-4 animate-slide-up font-serif text-[2rem] font-normal leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl">
              {heroTagline}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl animate-slide-up text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
              Boutique estate agency for sellers, buyers, landlords and tenants
              across London and Kent — premium marketing with genuine local
              expertise.
            </p>

            {/* Primary conversion actions */}
            <div className="mt-8 flex animate-slide-up flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
              <Link href="/valuation" className="btn-primary-lg w-full sm:w-auto">
                <CalendarCheck className="h-5 w-5" />
                Book a free valuation
              </Link>
              <a
                href={phoneHref}
                className="btn-outline w-full border-white text-white hover:bg-white hover:text-kingswell-green sm:w-auto"
              >
                <Phone className="h-5 w-5" />
                Call {phoneDisplay}
              </a>
            </div>

            <p className="mt-6 text-sm font-medium uppercase tracking-wider text-white/75">
              Or search our portfolio
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-4xl animate-slide-up [animation-delay:120ms]">
            <PropertySearchBar variant="hero" />
          </div>

          <HomepageHeroQuickLinks />
        </div>
      </section>

      <HomepageServices />

      <HomepageCoveragePreview content={coverageAreas} />

      {/* Intro */}
      <section className="mx-auto max-w-4xl section-padding text-center">
        <div className="gold-divider mb-6" />
        <h2 className="heading-section mb-6">Welcome to Kingswell</h2>
        <p className="text-base leading-relaxed text-gray-600 md:text-lg">
          Kingswell Estate Agents is a luxury boutique agency for discerning
          buyers, sellers, landlords and tenants across London and Kent. We
          combine premium marketing with deep local knowledge — delivering an
          established, personal service that positions your property perfectly
          and finds your ideal home faster.
        </p>
        <Link href="/about" className="btn-primary mt-8 inline-flex w-full sm:w-auto">
          Discover Kingswell
          <ChevronRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Featured Properties */}
      <section className="bg-gray-50 section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center md:mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-kingswell-gold">
              Our portfolio
            </p>
            <div className="gold-divider my-4" />
            <h2 className="heading-section">Latest properties</h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-600">
              {homepageListings.length} listing
              {homepageListings.length !== 1 ? "s" : ""} across London &amp; Kent
            </p>
          </div>
          {homepageListings.length === 0 ? (
            <p className="text-center text-gray-500">No properties listed yet.</p>
          ) : (
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {homepageListings.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          <div className="mt-10 flex flex-col items-center gap-4 sm:mt-12 sm:flex-row sm:justify-center">
            <Link href="/properties/for-sale" className="btn-primary w-full sm:w-auto">
              View all for sale
            </Link>
            <Link
              href="/properties/to-rent"
              className="btn-outline w-full border-kingswell-green text-kingswell-green sm:w-auto"
            >
              View all to rent
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="section-padding mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-12">
          <p className="text-sm uppercase tracking-[0.2em] text-kingswell-gold">
            Why Kingswell
          </p>
          <div className="gold-divider my-4" />
          <h2 className="heading-section">Why choose Kingswell</h2>
        </div>
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item) => {
            const Icon = iconMap[item.icon] || MapPin;
            return (
              <div
                key={item.title}
                className="group rounded-sm border border-gray-100 p-6 transition-all duration-300 ease-out hover:border-kingswell-gold/50 hover:shadow-lg md:p-8"
              >
                <Icon className="mb-4 h-8 w-8 text-kingswell-gold transition-transform duration-300 group-hover:scale-110" />
                <h3 className="mb-2 font-serif text-xl text-kingswell-green">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 md:text-base">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <AreasWeCover content={coverageAreas} />

      <TestimonialsGrid testimonials={testimonials} />

      {/* Valuation CTA */}
      <section className="relative overflow-hidden bg-kingswell-green section-padding">
        <div className="absolute inset-0">
          <Image
            src={CTA_BG_IMAGE}
            alt=""
            fill
            className="object-cover object-center opacity-20"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-kingswell-gold">
            Next step
          </p>
          <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl md:text-5xl">
            Book your free property valuation
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
            Discover what your London or Kent home is worth with a no-obligation
            valuation from our experienced team.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <Link href="/valuation" className="btn-primary-lg w-full sm:w-auto">
              <CalendarCheck className="h-5 w-5" />
              Book valuation now
            </Link>
            <Link
              href="/contact"
              className="btn-outline w-full border-white text-white hover:bg-white hover:text-kingswell-green sm:w-auto"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
