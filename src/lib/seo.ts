import type { Metadata } from "next";
import siteData from "../../content/site.json";

const SITE = siteData;

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
    : `${SITE.name} | Estate Agents in Catford, Lee & Hither Green`;
  const desc =
    description ??
    `Premium estate agents in Catford, Lee, Hither Green & Lewisham. ${SITE.slogan} Sales, lettings & free valuations.`;

  return {
    title: fullTitle,
    description: desc,
    keywords: [
      "estate agents Catford",
      "estate agents Lee",
      "estate agents Hither Green",
      "letting agents Catford",
      "property for sale Catford",
      "flats to rent Lee",
      "houses for sale Hither Green",
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
      canonical: path ? `https://kingswellagents.co.uk${path}` : undefined,
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
    areaServed: ["Catford", "Lee", "Hither Green", "Lewisham", "South East London"],
    url: "https://kingswellagents.co.uk",
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
