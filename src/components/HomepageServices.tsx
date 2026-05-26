import Link from "next/link";
import {
  Home,
  Key,
  Building2,
  Search,
  ArrowRight,
  CalendarCheck,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Selling your home",
    description:
      "Premium marketing and expert pricing across London and Kent, tailored to achieve the best result for your property.",
    href: "/valuation",
    cta: "Book a valuation",
    primary: true,
  },
  {
    icon: Search,
    title: "Buying a property",
    description:
      "Search curated homes and flats for sale with local insight from a boutique agency that knows the market.",
    href: "/properties/for-sale",
    cta: "View homes for sale",
    primary: false,
  },
  {
    icon: Key,
    title: "Renting & tenants",
    description:
      "Find quality rental homes across London and Kent, with straightforward support from enquiry to move-in.",
    href: "/properties/to-rent",
    cta: "Properties to rent",
    primary: false,
  },
  {
    icon: Building2,
    title: "Landlords & lettings",
    description:
      "Lettings, tenant find, and property management for landlords who expect professional, attentive service.",
    href: "/landlords",
    cta: "Landlord services",
    primary: false,
  },
] as const;

export default function HomepageServices() {
  return (
    <section
      id="what-we-do"
      className="scroll-mt-24 border-b border-gray-100 bg-white section-padding"
      aria-labelledby="what-we-do-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.25em] text-kingswell-gold">
            What we do
          </p>
          <h2
            id="what-we-do-heading"
            className="heading-section mt-3"
          >
            Estate agency for London &amp; Kent
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
            Kingswell helps sellers, buyers, landlords, and tenants with a
            personal, premium service — from your first valuation to finding
            the right home.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className={`flex flex-col rounded-sm border p-6 transition-all duration-300 md:p-8 ${
                  service.primary
                    ? "border-kingswell-gold/40 bg-kingswell-green/5 shadow-md"
                    : "border-gray-100 bg-[#faf9f7] hover:border-kingswell-gold/30 hover:shadow-lg"
                }`}
              >
                <Icon
                  className={`mb-4 h-8 w-8 ${
                    service.primary ? "text-kingswell-gold" : "text-kingswell-green"
                  }`}
                  aria-hidden
                />
                <h3 className="font-serif text-xl text-kingswell-green md:text-2xl">
                  {service.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600 md:text-base">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className={
                    service.primary
                      ? "btn-primary mt-6 w-full sm:w-auto"
                      : "mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-kingswell-green transition hover:text-kingswell-gold"
                  }
                >
                  {service.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="cta-pair">
          <Link href="/valuation" className="cta-pair-primary">
            <CalendarCheck className="h-5 w-5 shrink-0" />
            Book your free valuation
          </Link>
          <Link href="/contact" className="cta-pair-outline">
            Speak to our team
          </Link>
        </div>
      </div>
    </section>
  );
}
