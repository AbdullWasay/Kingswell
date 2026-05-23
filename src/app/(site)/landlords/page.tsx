import Link from "next/link";
import { Check, Shield, Users, FileCheck } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import LeadForm from "@/components/LeadForm";

export const metadata = createMetadata({
  title: "Landlords",
  description:
    "Lettings services for landlords across London and Kent. Fully managed, tenant find, and compliance support.",
  path: "/landlords",
  keywords: ["letting agents London", "property management Kent"],
});

const services = [
  {
    icon: Shield,
    title: "Fully Managed",
    description:
      "Complete peace of mind. We handle everything — tenant find, referencing, rent collection, maintenance, inspections, and compliance.",
  },
  {
    icon: Users,
    title: "Tenant Find",
    description:
      "Professional marketing, viewings, referencing, and tenancy agreements. You manage the day-to-day, we find the perfect tenant.",
  },
  {
    icon: FileCheck,
    title: "Compliance Support",
    description:
      "Gas safety, EPC, EICR, Right to Rent checks, deposit protection, and licensing — we keep you fully compliant.",
  },
];

export default function LandlordsPage() {
  return (
    <>
      <section className="bg-kingswell-green py-20 text-center text-white">
        <h1 className="font-serif text-4xl md:text-6xl">Landlords</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          Premium lettings and property management across London & Kent
        </p>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-sm border border-gray-100 p-8 text-center transition hover:shadow-lg"
            >
              <s.icon className="mx-auto mb-4 h-10 w-10 text-kingswell-gold" />
              <h3 className="font-serif text-xl text-kingswell-green">
                {s.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 section-padding">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
          <div>
            <h2 className="heading-section mb-6">Rental Valuation</h2>
            <p className="mb-6 text-gray-600">
              Find out what your property could achieve on the rental market.
              Our lettings experts provide accurate, data-driven valuations.
            </p>
            <LeadForm type="landlord" />
          </div>
          <div>
            <h2 className="heading-section mb-6">Landlord Benefits</h2>
            <ul className="space-y-4">
              {[
                "Dedicated lettings manager",
                "24/7 maintenance helpline",
                "Regular property inspections",
                "Transparent monthly statements",
                "Legal eviction support if needed",
                "Competitive management fees",
              ].map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-kingswell-gold" />
                  <span className="text-gray-600">{b}</span>
                </li>
              ))}
            </ul>
            <Link href="/valuation" className="btn-primary mt-8 inline-flex">
              Book Rental Valuation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
