import Link from "next/link";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Tenants",
  description:
    "Renting across London and Kent? Guide to the renting process with Kingswell Estate Agents.",
  path: "/tenants",
  keywords: ["flats to rent London", "renting Kent"],
});

const steps = [
  {
    step: "01",
    title: "Register & Search",
    text: "Browse our available rentals online or register your requirements and we'll notify you when matching properties become available.",
  },
  {
    step: "02",
    title: "View Properties",
    text: "Book viewings at convenient times. We'll show you around and answer any questions about the property and area.",
  },
  {
    step: "03",
    title: "Apply & Reference",
    text: "Submit your application with references and proof of income. We process applications quickly to secure your chosen home.",
  },
  {
    step: "04",
    title: "Move In",
    text: "Sign your tenancy agreement, pay your deposit (protected), and collect your keys. Welcome home!",
  },
];

export default function TenantsPage() {
  return (
    <>
      <section className="bg-kingswell-green py-20 text-center text-white">
        <h1 className="font-serif text-4xl md:text-6xl">Tenants</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          Finding your perfect rental across London & Kent
        </p>
      </section>

      <section className="section-padding mx-auto max-w-4xl text-center">
        <div className="gold-divider mb-6" />
        <p className="text-lg leading-relaxed text-gray-600">
          Whether you&apos;re looking for a family home in Kent, a
          an apartment in Greenwich, or a rental in South East London — Kingswell makes
          renting straightforward, transparent, and stress-free.
        </p>
      </section>

      <section className="bg-gray-50 section-padding">
        <div className="mx-auto max-w-7xl">
          <h2 className="heading-section mb-12 text-center">The Renting Process</h2>
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

      <section className="section-padding mx-auto max-w-7xl text-center">
        <Link href="/properties/to-rent" className="btn-primary">
          View Properties To Rent
        </Link>
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
