import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import type { PrsMembership } from "@/lib/content";

export default function PrsMembershipSection({
  prs,
}: {
  prs?: PrsMembership;
}) {
  if (!prs) return null;

  return (
    <section
      id="regulatory-membership"
      className="border-t border-kingswell-gold/20 bg-[#faf9f7] section-padding"
      aria-labelledby="prs-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="gold-divider mb-6" />
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-kingswell-gold">
            Your protection
          </p>
          <h2
            id="prs-heading"
            className="font-serif text-3xl text-kingswell-green md:text-4xl"
          >
            Regulated &amp; Protected
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            We are proud members of the Property Redress Scheme, giving you
            independent redress and peace of mind when you work with us.
          </p>
        </div>

        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 rounded-sm border border-kingswell-gold/25 bg-white p-8 shadow-sm md:flex-row md:items-stretch md:gap-12 md:p-10 lg:p-12">
          <a
            href={prs.certificateImage}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mx-auto shrink-0 overflow-hidden rounded-sm border border-gray-200 shadow-md transition hover:border-kingswell-gold md:mx-0"
            title="View full PRS membership certificate"
          >
            <Image
              src={prs.certificateImage}
              alt={`Property Redress Scheme membership certificate — ${prs.legalName}`}
              width={220}
              height={310}
              className="h-auto w-44 object-cover object-top sm:w-52 md:w-56"
            />
            <span className="absolute inset-x-0 bottom-0 bg-kingswell-green/90 py-2 text-center text-[10px] uppercase tracking-wider text-white opacity-0 transition group-hover:opacity-100">
              View certificate
            </span>
          </a>

          <div className="flex min-w-0 flex-1 flex-col justify-center text-center md:text-left">
            <div className="mb-4 flex items-center justify-center gap-2 md:justify-start">
              <ShieldCheck className="h-6 w-6 text-kingswell-gold" />
              <p className="text-sm font-medium uppercase tracking-widest text-kingswell-gold">
                Property Redress Scheme
              </p>
            </div>
            <h3 className="font-serif text-2xl text-kingswell-green md:text-3xl">
              {prs.legalName}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base">
              As a registered member, you have access to independent redress
              through the Property Redress Scheme if we are unable to resolve
              your complaint directly.
            </p>
            <dl className="mt-6 space-y-2 text-sm text-gray-600">
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3 md:justify-start">
                <dt className="font-medium text-kingswell-green">
                  Membership No:
                </dt>
                <dd>{prs.membershipNumber}</dd>
              </div>
              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3 md:justify-start">
                <dt className="font-medium text-kingswell-green">Valid:</dt>
                <dd>
                  {prs.startDate} – {prs.expiryDate}
                </dd>
              </div>
            </dl>
            <a
              href={prs.schemeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-medium text-kingswell-gold underline-offset-2 hover:underline"
            >
              Learn more at propertyredress.co.uk →
            </a>
          </div>
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-gray-500">
          <li>Client Money Protection</li>
          <li className="hidden text-kingswell-gold sm:inline" aria-hidden>
            ·
          </li>
          <li>ICO Registered</li>
        </ul>
      </div>
    </section>
  );
}
