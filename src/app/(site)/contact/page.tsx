import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { createMetadata } from "@/lib/seo";
import { getSite } from "@/lib/data";
import LeadForm from "@/components/LeadForm";
import { whatsappUrl } from "@/lib/whatsapp";
import { formatPhone, telHref } from "@/lib/phone";

export const metadata = createMetadata({
  title: "Contact Us",
  description:
    "Contact Kingswell Estate Agents. Call 020 8064 3668, email sales@kingswellestateagents.co.uk. Registered office: 66 Paul Street, London EC2A 4NA.",
  path: "/contact",
  keywords: ["contact estate agents London", "Kingswell EC2A"],
});

export default async function ContactPage() {
  const SITE = await getSite();
  return (
    <>
      <section className="bg-kingswell-green py-20 text-center text-white">
        <h1 className="font-serif text-4xl md:text-6xl">Contact Us</h1>
        <p className="mt-4 text-white/70">We&apos;d love to hear from you</p>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="heading-section mb-6">Get In Touch</h2>
            <LeadForm type="enquiry" />

            <div className="mt-10 space-y-4">
              <a
                href={telHref(SITE.phone)}
                className="flex items-center gap-3 text-gray-600 hover:text-kingswell-green"
              >
                <Phone className="h-5 w-5 text-kingswell-gold" />
                {formatPhone(SITE.phone)}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 text-gray-600 hover:text-kingswell-green"
              >
                <Mail className="h-5 w-5 text-kingswell-gold" />
                {SITE.email}
              </a>
              <a
                href={whatsappUrl("Hi Kingswell, I'd like to get in touch.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-600 hover:text-kingswell-green"
              >
                <MessageCircle className="h-5 w-5 text-kingswell-gold" />
                WhatsApp: 07367 087204
              </a>
              <p className="flex items-start gap-3 text-gray-600">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-kingswell-gold" />
                {SITE.address}
              </p>
              <div className="flex items-start gap-3 text-gray-600">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-kingswell-gold" />
                <span>
                  {SITE.hours.weekdays}
                  <br />
                  {SITE.hours.saturday}
                  <br />
                  {SITE.hours.sunday}
                </span>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] overflow-hidden rounded-sm">
            <iframe
              title="Kingswell registered office — 66 Paul Street, London EC2A 4NA"
              src="https://maps.google.com/maps?q=66+Paul+Street+London+EC2A+4NA&z=16&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
