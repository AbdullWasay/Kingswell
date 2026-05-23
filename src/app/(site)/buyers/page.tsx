import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Buyers",
  description:
    "Your guide to buying property across London and Kent. Expert support from Kingswell Estate Agents.",
  path: "/buyers",
});

const steps = [
  {
    step: "01",
    title: "Register Your Requirements",
    text: "Tell us exactly what you're looking for — location, budget, bedrooms, and must-haves. We'll match you with suitable properties.",
  },
  {
    step: "02",
    title: "View Properties",
    text: "We'll arrange private viewings at times that suit you. Our team accompanies every viewing to answer questions on the spot.",
  },
  {
    step: "03",
    title: "Make an Offer",
    text: "Found the one? We'll guide you through making a competitive offer and negotiating the best terms.",
  },
  {
    step: "04",
    title: "Conveyancing & Completion",
    text: "We liaise with solicitors, surveyors, and mortgage brokers to keep your purchase on track through to completion.",
  },
];

export default function BuyersPage() {
  return (
    <>
      <section className="bg-kingswell-green py-20 text-center text-white">
        <h1 className="font-serif text-4xl md:text-6xl">Buyers</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          Your journey to finding the perfect home across London & Kent
        </p>
      </section>

      <section className="section-padding mx-auto max-w-4xl text-center">
        <div className="gold-divider mb-6" />
        <p className="text-lg leading-relaxed text-gray-600">
          Buying a home is one of life&apos;s biggest decisions. At Kingswell,
          we make it seamless — combining local expertise, honest advice, and a
          personal touch that larger agencies simply can&apos;t match.
        </p>
      </section>

      <section className="bg-gray-50 section-padding">
        <div className="mx-auto max-w-7xl">
          <h2 className="heading-section mb-12 text-center">The Buying Process</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="rounded-sm bg-white p-6 shadow-sm">
                <span className="font-serif text-3xl text-kingswell-gold">
                  {s.step}
                </span>
                <h3 className="mt-4 font-serif text-lg text-kingswell-green">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <h2 className="heading-section mb-6 text-center">Mortgage Support</h2>
        <p className="mx-auto max-w-2xl text-center text-gray-600">
          We work with trusted independent mortgage advisers who can help you
          secure the best rates. Whether you&apos;re a first-time buyer or
          moving up the ladder, we&apos;ll connect you with the right expert.
        </p>
        <div className="mt-8 text-center">
          <Link href="/properties/for-sale" className="btn-primary">
            Browse Properties For Sale
          </Link>
        </div>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <h2 className="heading-section mb-8 text-center">Area Guides</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {["catford", "lee", "hither-green", "lewisham"].map((slug) => (
            <Link
              key={slug}
              href={`/areas/${slug}`}
              className="rounded-sm border border-kingswell-gold/30 p-6 text-center transition hover:bg-kingswell-green hover:text-white"
            >
              <span className="font-serif text-xl capitalize">
                {slug.replace("-", " ")}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
