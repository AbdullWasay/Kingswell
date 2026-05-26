import Image from "next/image";

type Partner = {
  name: string;
  logo: string;
  width: number;
  height: number;
  label: string;
  logoClass?: string;
  logoBoxClass?: string;
};

const defaultLogoClass =
  "max-h-10 w-auto max-w-[9rem] object-contain sm:max-w-[10.5rem]";
const defaultLogoBoxClass = "flex h-14 w-full items-center justify-center";

const partners: Partner[] = [
  {
    name: "Rightmove",
    logo: "/certificates/rightmove.png",
    width: 160,
    height: 42,
    label: "Property portal",
  },
  {
    name: "Zoopla",
    logo: "/certificates/zoopla.png",
    width: 140,
    height: 42,
    label: "Property portal",
  },
  {
    name: "TDS",
    logo: "/certificates/tds.png",
    width: 90,
    height: 50,
    label: "Deposit protection",
  },
  {
    name: "Property Redress Scheme",
    logo: "/certificates/property-redress.jpeg",
    width: 220,
    height: 72,
    label: "Redress scheme",
    // Image file has extra padding — scale within the logo area only
    logoClass:
      "h-10 w-auto max-w-[10rem] object-contain origin-center scale-[1.85] sm:scale-[2]",
    logoBoxClass: "flex h-14 w-full items-center justify-center overflow-hidden",
  },
];

export default function PartnersSection() {
  return (
    <section
      className="bg-kingswell-green py-12 sm:py-16"
      aria-labelledby="partners-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading row */}
        <div className="mb-10 flex flex-col items-center gap-2 sm:mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-kingswell-gold">
            Trusted &amp; recognised
          </p>
          <h2
            id="partners-heading"
            className="font-serif text-2xl text-white sm:text-3xl"
          >
            Our industry partners
          </h2>
          {/* thin gold rule */}
          <span className="mt-1 block h-px w-16 bg-kingswell-gold/60" />
        </div>

        {/* Logo grid */}
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {partners.map((partner) => (
            <li key={partner.name}>
              <div className="group flex flex-col items-center gap-4 rounded-sm border border-kingswell-gold/25 bg-white px-4 py-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-kingswell-gold/70 hover:shadow-md sm:py-7">
                {/* Logo — fixed height so label never overlaps */}
                <div className={partner.logoBoxClass ?? defaultLogoBoxClass}>
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className={partner.logoClass ?? defaultLogoClass}
                    sizes="208px"
                  />
                </div>
                {/* Label */}
                <span className="shrink-0 text-center text-[10px] uppercase tracking-[0.18em] text-kingswell-green/70 sm:text-[11px]">
                  {partner.label}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Bottom note */}
        <p className="mt-8 text-center text-xs text-white/40 sm:mt-10">
          Kingswell Estate Agents is a registered member of the Property
          Redress Scheme and Tenancy Deposit Scheme.
        </p>
      </div>
    </section>
  );
}
