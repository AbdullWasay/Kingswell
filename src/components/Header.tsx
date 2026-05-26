"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown, CalendarCheck } from "lucide-react";
import type { SiteConfig } from "@/lib/content";
import { formatPhone, telHref } from "@/lib/phone";

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
  { href: "/#areas-we-cover", label: "Areas" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

const linkClass =
  "whitespace-nowrap rounded-sm px-2 py-2 text-[11px] uppercase tracking-wider text-white/90 transition-colors duration-200 hover:text-kingswell-gold xl:text-xs";

export default function Header({ site }: { site: SiteConfig }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const phoneDisplay = formatPhone(site.phone);
  const phoneHref = telHref(site.phone);

  return (
    <header className="sticky top-0 z-50 border-b border-kingswell-gold/15 bg-kingswell-green shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-2.5 sm:gap-3 md:px-8 lg:px-10">
        <Link
          href="/"
          className="relative block h-10 w-36 shrink-0 sm:h-11 sm:w-44 md:h-12 md:w-52 lg:h-14 lg:w-60"
          aria-label={site.name}
        >
          <Image
            src="/logo-header.png"
            alt={site.name}
            fill
            className="object-contain object-left"
            priority
            sizes="(max-width: 768px) 144px, 240px"
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-end gap-0.5 lg:flex xl:gap-1"
          aria-label="Main navigation"
        >
          {navGroups.map((group) => (
            <div key={group.label} className="group relative">
              <button
                type="button"
                className={`flex items-center gap-0.5 ${linkClass}`}
                aria-haspopup="true"
              >
                {group.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 min-w-[180px] pt-1 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="rounded-sm border border-kingswell-gold/20 bg-kingswell-green-light py-1 shadow-xl">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-xs uppercase tracking-wider text-white/90 transition-colors hover:bg-white/5 hover:text-kingswell-gold"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <Link href="/valuation" className="header-cta-valuation">
              <CalendarCheck className="h-4 w-4 shrink-0" aria-hidden />
              <span className="hidden xl:inline">Book valuation</span>
              <span className="xl:hidden">Valuation</span>
            </Link>
            <a
              href={phoneHref}
              className="header-cta-phone hidden lg:inline-flex"
              aria-label={`Call ${phoneDisplay}`}
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden />
              <span className="hidden 2xl:inline">{phoneDisplay}</span>
              <span className="2xl:hidden">Call</span>
            </a>
          </div>

          <button
            type="button"
            className="rounded-sm p-2.5 text-white transition-colors hover:bg-white/10 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          className="border-t border-kingswell-gold/20 bg-kingswell-green-light px-4 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <Link
            href="/valuation"
            className="btn-primary mb-3 flex w-full items-center justify-center gap-2"
            onClick={() => setMenuOpen(false)}
          >
            <CalendarCheck className="h-4 w-4" />
            Book a free valuation
          </Link>
          <a
            href={phoneHref}
            className="header-cta-phone mb-4 flex w-full border-white/30 bg-white/5"
            onClick={() => setMenuOpen(false)}
          >
            <Phone className="h-4 w-4 shrink-0" />
            {phoneDisplay}
          </a>

          {navGroups.map((group) => {
            const expanded = mobileGroup === group.label;
            return (
              <div key={group.label} className="border-b border-white/5">
                <button
                  type="button"
                  className="flex w-full items-center justify-between py-3.5 text-sm font-medium uppercase tracking-wider text-white"
                  onClick={() =>
                    setMobileGroup(expanded ? null : group.label)
                  }
                  aria-expanded={expanded}
                >
                  {group.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                  />
                </button>
                {expanded && (
                  <div className="space-y-1 pb-3 pl-3">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-sm py-2.5 pl-2 text-sm text-white/85 transition-colors hover:text-kingswell-gold"
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
              className="block border-b border-white/5 py-3.5 text-sm uppercase tracking-wider text-white transition-colors hover:text-kingswell-gold"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
