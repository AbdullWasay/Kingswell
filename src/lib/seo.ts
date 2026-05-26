import type { Metadata } from "next";
import siteData from "../../content/site.json";
import { getSiteUrl } from "./site-url";
import { formatPhone } from "./phone";

const SITE = siteData;
const DEFAULT_TAGLINE =
  "tagline" in SITE && typeof SITE.tagline === "string"
    ? SITE.tagline
    : "Premium Estate Agents Covering London & Kent";

const REGISTERED_ADDRESS = {
  streetAddress: "66 Paul Street",
  addressLocality: "London",
  addressRegion: "Greater London",
  postalCode: "EC2A 4NA",
  addressCountry: "GB",
};

export function createMetadata({
  title,
  description,
  path = "",
  keywords = [],
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const siteUrl = getSiteUrl();
  const fullTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} | ${DEFAULT_TAGLINE}`;
  const desc =
    description ??
    `Premium estate agents across London and Kent. Sales, lettings and free valuations. Call ${formatPhone(SITE.phone)}.`;

  const canonical = path ? `${siteUrl}${path}` : siteUrl;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(siteUrl),
    keywords: [
      "estate agents London",
      "estate agents Kent",
      "estate agents EC2A",
      "estate agents Shoreditch",
      "letting agents London",
      "property for sale London",
      "houses for sale Kent",
      "free property valuation London",
      ...keywords,
    ],
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description: desc,
      type: "website",
      locale: "en_GB",
      siteName: SITE.name,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
    },
    alternates: {
      canonical,
    },
  };
}

export function realEstateAgentSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${siteUrl}/#organization`,
    name: SITE.name,
    slogan: SITE.slogan,
    description: DEFAULT_TAGLINE,
    telephone: SITE.phone.replace(/\s/g, ""),
    email: SITE.email,
    url: siteUrl,
    image: `${siteUrl}/logo-header.png`,
    address: {
      "@type": "PostalAddress",
      ...REGISTERED_ADDRESS,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.5254,
      longitude: -0.0854,
    },
    areaServed: [
      { "@type": "City", name: "London" },
      { "@type": "AdministrativeArea", name: "Kent" },
      { "@type": "Place", name: "South East London" },
      { "@type": "Place", name: "Catford" },
      { "@type": "Place", name: "Lewisham" },
      { "@type": "Place", name: "Bromley" },
      { "@type": "Place", name: "Greenwich" },
      { "@type": "Place", name: "Blackheath" },
    ],
    priceRange: "£££",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:30",
        closes: "16:00",
      },
    ],
    sameAs: [
      SITE.social.instagram,
      SITE.social.facebook,
      SITE.social.linkedin,
    ],
  };
}

export function websiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: SITE.name,
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/properties/for-sale?location={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function propertySchema(property: {
  title: string;
  description: string;
  priceLabel: string;
  address: string;
  images: string[];
  bedrooms: number;
  type?: "sale" | "let";
}) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: property.title,
    description: property.description.slice(0, 500),
    numberOfRooms: property.bedrooms,
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressCountry: "GB",
    },
    image: property.images.map((img) =>
      img.startsWith("http") ? img : `${siteUrl}${img}`
    ),
    offers: {
      "@type": "Offer",
      price: property.priceLabel,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
    },
  };
}

export { REGISTERED_ADDRESS };
