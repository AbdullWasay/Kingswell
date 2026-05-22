import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";
import type { SiteConfig } from "@/lib/content";

const linkGroups = [
  {
    title: "Properties",
    links: [
      { href: "/properties/for-sale", label: "Properties For Sale" },
      { href: "/properties/to-rent", label: "Properties To Rent" },
      { href: "/valuation", label: "Book Valuation" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/landlords", label: "Landlords" },
      { href: "/buyers", label: "Buyers" },
      { href: "/tenants", label: "Tenants" },
      { href: "/about", label: "About Us" },
    ],
  },
  {
    title: "Areas",
    links: [
      { href: "/areas/catford", label: "Catford" },
      { href: "/areas/lee", label: "Lee" },
      { href: "/areas/hither-green", label: "Hither Green" },
      { href: "/areas/lewisham", label: "Lewisham" },
    ],
  },
];

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("44") && digits.length >= 12) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 11 && digits.startsWith("0")) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

export default function Footer({ site }: { site: SiteConfig }) {
  const phoneDisplay = formatPhone(site.phone);
  const phoneHref = site.phone.replace(/\s/g, "");

  return (
    <footer className="bg-kingswell-green text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 lg:py-16">
        {/* Main grid: 5 equal columns on large screens */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="relative mb-5 block h-14 w-44">
              <Image
                src="/logo.png"
                alt={site.name}
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="mb-5 text-sm italic leading-relaxed text-kingswell-gold">
              {site.slogan}
            </p>
            <div className="flex gap-4">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-kingswell-gold"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-kingswell-gold"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 transition hover:text-kingswell-gold"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact — same row as other section headers */}
          <div>
            <h4 className="mb-4 font-serif text-lg tracking-wide text-kingswell-gold">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-kingswell-gold" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-kingswell-gold" />
                <a href={`tel:${phoneHref}`} className="hover:text-white">
                  {phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-kingswell-gold" />
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-kingswell-gold" />
                <span>
                  {site.hours.weekdays}
                  <br />
                  {site.hours.saturday}
                  <br />
                  {site.hours.sunday}
                </span>
              </li>
            </ul>
          </div>

          {/* Properties, Services, Areas */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 font-serif text-lg tracking-wide text-kingswell-gold">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/75 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-kingswell-gold/25 pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/50">
              <span>Property Ombudsman</span>
              <span className="hidden text-kingswell-gold sm:inline">|</span>
              <span>Client Money Protection</span>
              <span className="hidden text-kingswell-gold sm:inline">|</span>
              <span>ICO Registered</span>
            </div>
            <div className="text-xs text-white/50 lg:text-right">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <span className="mx-2 text-kingswell-gold">·</span>
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
              <p className="mt-2">
                © {new Date().getFullYear()} {site.name}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
