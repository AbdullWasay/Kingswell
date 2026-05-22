import { Check } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import LeadForm from "@/components/LeadForm";

export const metadata = createMetadata({
  title: "Free Property Valuation",
  description:
    "Book your free, no-obligation property valuation in Catford, Lee, Hither Green or Lewisham. Expert advice from Kingswell Estate Agents.",
  path: "/valuation",
  keywords: ["property valuation Catford", "house valuation Lee"],
});

const benefits = [
  "Accurate market appraisal based on local data",
  "No obligation — completely free",
  "Expert advice on maximising your sale price",
  "Professional marketing plan included",
  "Same-day response from your local advisor",
];

const sellerBenefits = [
  "Premium photography & virtual tours",
  "Rightmove, Zoopla & OnTheMarket listing",
  "Targeted social media campaigns",
  "Dedicated senior negotiator",
  "Regular progress updates",
];

export default function ValuationPage() {
  return (
    <>
      <section className="bg-kingswell-green py-20 text-center text-white">
        <h1 className="font-serif text-4xl md:text-6xl">
          Book Your Free Valuation
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          Discover what your property is worth with South East London&apos;s
          trusted luxury estate agents.
        </p>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="heading-section mb-6">Instant Valuation Request</h2>
            <p className="mb-6 text-gray-600">
              Complete the form below and a member of our team will contact you
              within 24 hours to arrange your free, no-obligation valuation.
            </p>
            <LeadForm type="valuation" />
          </div>

          <div>
            <h2 className="heading-section mb-6">Why Choose Kingswell</h2>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-kingswell-gold" />
                  <span className="text-gray-600">{b}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-serif text-xl text-kingswell-green">
              Seller & Landlord Benefits
            </h3>
            <ul className="mt-4 space-y-3">
              {sellerBenefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-kingswell-gold" />
                  <span className="text-gray-600">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
