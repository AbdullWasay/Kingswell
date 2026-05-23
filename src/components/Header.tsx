"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import type { SiteConfig } from "@/lib/content";

const navGroups = [
  {
    label: "Properties",
    items: [
      { href: "/properties/for-sale", label: "For Sale" },
      { href: "/properties/to-rent", label: "To Rent" },
    ],
  },
  {
    label: "Services",
    items: [
      { href: "/landlords", label: "Landlords" },
      { href: "/buyers", label: "Buyers" },
      { href: "/tenants", label: "Tenants" },
    ],
  },
] as const;

const navLinks = [
  { href: "/valuation", label: "Valuation" },
  { href: "/#areas-we-cover", label: "Areas" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const linkClass =
  "whitespace-nowrap text-[11px] uppercase tracking-wider text-white/90 transition hover:text-kingswell-gold xl:text-xs";

export default function Header({ site }: { site: SiteConfig }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const phoneHref = `tel:${site.phone.replace(/\s/g, "")}`;

  return (
    <header className="sticky top-0 z-50 border-b border-kingswell-gold/15 bg-kingswell-green shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 md:gap-4 md:px-8 md:py-2.5 lg:px-10">
        <Link
          href="/"
          className="relative block h-10 w-40 shrink-0 sm:h-11 sm:w-44 md:h-12 md:w-52 lg:h-14 lg:w-60"
          aria-label={site.name}
        >
          <Image
            src="/logo-header.png"
            alt=""
            fill
            className="object-contain object-left"
            priority
            sizes="(max-width: 768px) 160px, 240px"
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-end gap-1 lg:flex xl:gap-2">
          {navGroups.map((group) => (
            <div key={group.label} className="group relative">
              <button
                type="button"
                className={`flex items-center gap-0.5 px-2 py-2 ${linkClass}`}
                aria-haspopup="true"
              >
                {group.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-70 transition group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 min-w-[180px] pt-1 opacity-0 transition-all group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-sm border border-kingswell-gold/20 bg-kingswell-green-light py-1 shadow-xl">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-xs uppercase tracking-wider text-white/90 transition hover:bg-white/5 hover:text-kingswell-gold"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={`px-2 py-2 ${linkClass}`}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
          <a
            href={phoneHref}
            className="hidden items-center gap-2 rounded-sm border border-kingswell-gold bg-kingswell-gold/10 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-kingswell-gold transition hover:bg-kingswell-gold hover:text-kingswell-green lg:inline-flex xl:px-4"
            aria-label={`Call ${site.phone}`}
          >
            <Phone className="h-4 w-4" />
            Call
          </a>

          <button
            type="button"
            className="rounded-sm p-2 text-white lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-kingswell-gold/20 bg-kingswell-green-light px-4 py-4 lg:hidden">
          {navGroups.map((group) => {
            const expanded = mobileGroup === group.label;
            return (
              <div key={group.label} className="border-b border-white/5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3 text-sm uppercase tracking-wider text-white"
                  onClick={() =>
                    setMobileGroup(expanded ? null : group.label)
                  }
                  aria-expanded={expanded}
                >
                  {group.label}
                  <ChevronDown
                    className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
                {expanded && (
                  <div className="pb-2 pl-3">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-2 text-sm text-white/80 hover:text-kingswell-gold"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block border-b border-white/5 py-3 text-sm uppercase tracking-wider text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <a
            href={phoneHref}
            className="btn-primary mt-4 flex w-full items-center justify-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <Phone className="h-4 w-4" />
            Call {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
