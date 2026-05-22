"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import type { SiteConfig } from "@/lib/content";

const navLinks = [
  { href: "/properties/for-sale", label: "For Sale" },
  { href: "/properties/to-rent", label: "To Rent" },
  { href: "/valuation", label: "Valuation" },
  { href: "/landlords", label: "Landlords" },
  { href: "/buyers", label: "Buyers" },
  { href: "/tenants", label: "Tenants" },
  {
    label: "Areas",
    children: [
      { href: "/areas/catford", label: "Catford" },
      { href: "/areas/lee", label: "Lee" },
      { href: "/areas/hither-green", label: "Hither Green" },
      { href: "/areas/lewisham", label: "Lewisham" },
    ],
  },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ site }: { site: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const [areasOpen, setAreasOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-kingswell-green shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="relative h-14 w-44 md:h-16 md:w-52">
          <Image
            src="/logo.png"
            alt={site.name}
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="group relative">
                <button className="text-sm uppercase tracking-wider text-white/90 transition hover:text-kingswell-gold">
                  {link.label}
                </button>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[180px] rounded-sm border border-kingswell-gold/30 bg-kingswell-green-light py-2 shadow-xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-white/90 hover:bg-kingswell-gold/20 hover:text-kingswell-gold"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className="text-sm uppercase tracking-wider text-white/90 transition hover:text-kingswell-gold"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <a
          href={`tel:${site.phone.replace(/\s/g, "")}`}
          className="hidden items-center gap-2 text-sm text-kingswell-gold md:flex"
        >
          <Phone className="h-4 w-4" />
          {site.phone}
        </a>

        <button
          type="button"
          className="text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-kingswell-gold/20 bg-kingswell-green-light px-4 py-4 lg:hidden">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label}>
                <button
                  type="button"
                  className="block w-full py-2 text-left text-sm uppercase tracking-wider text-white"
                  onClick={() => setAreasOpen(!areasOpen)}
                >
                  {link.label}
                </button>
                {areasOpen &&
                  link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 pl-4 text-sm text-white/80"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className="block py-2 text-sm uppercase tracking-wider text-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href={`tel:${site.phone.replace(/\s/g, "")}`}
            className="mt-4 flex items-center gap-2 text-kingswell-gold"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
