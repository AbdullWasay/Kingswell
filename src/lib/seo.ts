import type { Metadata } from "next";
import siteData from "../../content/site.json";

const SITE = siteData;
const DEFAULT_TAGLINE =
  "tagline" in SITE && typeof SITE.tagline === "string"
    ? SITE.tagline
    : "Premium Estate Agents Covering London & Kent";

export function createMetadata({
  title,
  description,
  path = "",
  keywords = [],
}: {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} | ${DEFAULT_TAGLINE}`;
  const desc =
    description ??
    `Helping sellers, buyers, landlords and tenants across London & Kent. ${SITE.slogan} Sales, lettings & free valuations.`;

  return {
    title: fullTitle,
    description: desc,
    keywords: [
      "estate agents London",
      "estate agents Kent",
      "estate agents South East London",
      "letting agents London",
      "property for sale London",
      "houses for sale Kent",
      ...keywords,
    ],
    openGraph: {
      title: fullTitle,
      description: desc,
      type: "website",
      locale: "en_GB",
      siteName: SITE.name,
    },
    alternates: {
      canonical: path ? `https://kingswellestateagents.co.uk${path}` : undefined,
    },
  };
}

export function realEstateAgentSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: SITE.name,
    slogan: SITE.slogan,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "12 Rushey Green",
      addressLocality: "Catford",
      addressRegion: "London",
      postalCode: "SE6 4JF",
      addressCountry: "GB",
    },
    areaServed: [
      "London",
      "Kent",
      "South East London",
      "Catford",
      "Lewisham",
      "Bromley",
      "Greenwich",
      "Blackheath",
    ],
    url: "https://kingswellestateagents.co.uk",
    priceRange: "£££",
  };
}

export function propertySchema(property: {
  title: string;
  description: string;
  priceLabel: string;
  address: string;
  images: string[];
  bedrooms: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Residence",
    name: property.title,
    description: property.description,
    numberOfRooms: property.bedrooms,
    address: property.address,
    image: property.images,
    offers: {
      "@type": "Offer",
      price: property.priceLabel,
      priceCurrency: "GBP",
    },
  };
}
