import Link from "next/link";
import { Home, KeyRound, MapPin, ArrowRight } from "lucide-react";

const links = [
  {
    href: "/properties/for-sale",
    label: "Properties for sale",
    icon: Home,
  },
  {
    href: "/properties/to-rent",
    label: "Properties to rent",
    icon: KeyRound,
  },
  {
    href: "#areas-we-cover",
    label: "Areas we cover",
    icon: MapPin,
  },
] as const;

export default function HomepageHeroQuickLinks() {
  return (
    <nav
      className="mx-auto mt-8 w-full max-w-3xl"
      aria-label="Quick property links"
    >
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
        {links.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex min-h-[52px] items-center justify-between gap-3 rounded-sm border border-white/35 bg-white/12 px-4 py-3.5 text-left shadow-lg backdrop-blur-md transition-all duration-300 ease-out hover:border-kingswell-gold hover:bg-white/20 hover:shadow-xl sm:flex-col sm:items-start sm:justify-center sm:py-4"
            >
              <span className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-2">
                <Icon
                  className="h-5 w-5 shrink-0 text-kingswell-gold"
                  aria-hidden
                />
                <span className="text-sm font-semibold leading-snug text-white sm:text-base">
                  {label}
                </span>
              </span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-kingswell-gold transition-transform duration-300 group-hover:translate-x-0.5 sm:hidden"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
