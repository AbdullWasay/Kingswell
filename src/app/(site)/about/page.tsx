import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { getTeam } from "@/lib/data";

export const metadata = createMetadata({
  title: "About Us",
  description:
    "Meet the Kingswell team. Premium estate agents covering London & Kent with local expertise and boutique service.",
  path: "/about",
});

export default async function AboutPage() {
  const team = await getTeam();
  return (
    <>
      <section className="relative flex min-h-[50vh] items-center justify-center bg-kingswell-green">
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80"
          alt="Kingswell office"
          fill
          className="object-cover opacity-30"
        />
        <div className="relative z-10 text-center text-white">
          <h1 className="font-serif text-4xl md:text-6xl">About Kingswell</h1>
          <p className="mt-4 text-xl text-kingswell-gold">
            Premium Estate Agents Covering London & Kent
          </p>
        </div>
      </section>

      <section className="section-padding mx-auto max-w-4xl text-center">
        <div className="gold-divider mb-6" />
        <h2 className="heading-section mb-6">Our Mission</h2>
        <p className="text-lg leading-relaxed text-gray-600">
          Kingswell Estate Agents was founded to bring luxury boutique standards
          to sellers, buyers, landlords and tenants across London and Kent. We
          believe every client deserves a premium, personal service — whether
          selling a period home in Blackheath, letting in Lewisham, or buying
          across Bromley and Greenwich.
        </p>
      </section>

      <section className="bg-gray-50 section-padding">
        <div className="mx-auto max-w-7xl">
          <h2 className="heading-section mb-12 text-center">
            Why Kingswell Is Different
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Luxury Brand Identity",
                text: "Every property presented with professional photography, premium marketing, and the elegance your home deserves.",
              },
              {
                title: "London & Kent Expertise",
                text: "Local knowledge where it matters, with the reach and resources of a premium agency — from South East London to Kent towns and villages.",
              },
              {
                title: "Personal Approach",
                text: "No call centres, no rotating staff. Your dedicated advisor from valuation to completion.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-sm bg-white p-8 text-center shadow-sm"
              >
                <h3 className="font-serif text-xl text-kingswell-green">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <h2 className="heading-section mb-12 text-center">Meet The Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div key={member.id} className="text-center">
              <div className="relative mx-auto mb-4 aspect-square w-48 overflow-hidden rounded-full">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <h3 className="font-serif text-xl text-kingswell-green">
                {member.name}
              </h3>
              <p className="text-sm text-kingswell-gold">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-kingswell-green section-padding text-center text-white">
        <h2 className="font-serif text-3xl">Ready to work with us?</h2>
        <Link href="/valuation" className="btn-primary mt-6">
          Book Your Free Valuation
        </Link>
      </section>
    </>
  );
}
