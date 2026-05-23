import {
  getSite,
  getProperties,
  getCoverageAreas,
} from "@/lib/content";
import { getPublishedProperties } from "@/lib/properties";
import type { Property } from "@/lib/types";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://kingswellestateagents.co.uk";

function propertyUrl(p: Property): string {
  const path = p.type === "sale" ? "for-sale" : "to-rent";
  return `${siteUrl}/properties/${path}/${p.slug}`;
}

function summariseProperty(p: Property): string {
  const desc =
    p.description.length > 220
      ? `${p.description.slice(0, 220)}…`
      : p.description;
  return [
    `- ${p.title}`,
    `  Type: ${p.type === "sale" ? "For sale" : "To rent"} | Status: ${p.status}`,
    `  Price: ${p.priceLabel} | ${p.bedrooms} bed, ${p.bathrooms} bath`,
    `  Location: ${p.address}, ${p.area}`,
    `  Features: ${p.features.slice(0, 6).join("; ") || "—"}`,
    `  Link: ${propertyUrl(p)}`,
    `  Summary: ${desc}`,
  ].join("\n");
}

export async function buildChatSystemPrompt(): Promise<string> {
  const [site, properties, coverage] = await Promise.all([
    getSite(),
    getProperties(),
    getCoverageAreas(),
  ]);

  const published = getPublishedProperties(properties);
  const forSale = published.filter((p) => p.type === "sale");
  const toRent = published.filter((p) => p.type === "let");

  const areaNames = coverage.areas.map((a) => a.name).join(", ");

  const propertyBlock =
    published.length === 0
      ? "There are currently no published listings on the website."
      : [
          `Total published listings: ${published.length} (${forSale.length} for sale, ${toRent.length} to rent).`,
          "",
          "FOR SALE:",
          forSale.length
            ? forSale.map(summariseProperty).join("\n")
            : "None at the moment.",
          "",
          "TO RENT:",
          toRent.length
            ? toRent.map(summariseProperty).join("\n")
            : "None at the moment.",
        ].join("\n");

  return `You are the helpful AI assistant for ${site.name}, a premium estate agency covering London and Kent.

RULES:
- Answer only using the knowledge below about Kingswell, its services, areas, and current property listings.
- If asked about a property or availability, use the property list below. Mention price, beds, area, and include the property link when relevant.
- If no matching property exists, say so honestly and suggest contacting the team or browsing the website.
- For valuations, viewings, or offers, direct users to book via ${siteUrl}/valuation or contact:
  Phone: ${site.phone}
  Email: ${site.email}
  WhatsApp: +${site.whatsapp.replace(/^44/, "44 ")}
  Address: ${site.address}
- Be professional, warm, and concise — like a luxury boutique agent.
- Do not invent listings, prices, or policies not stated here.
- You may use markdown for lists and links when helpful.

ABOUT THE AGENCY:
- Slogan: ${site.slogan}
- Tagline: ${site.tagline ?? "Premium Estate Agents Covering London & Kent"}
- Coverage: ${areaNames}, and wider London & Kent
- Services: sales, lettings, free valuations, landlord services, buyer & tenant support
- Website pages:
  - Home: ${siteUrl}/
  - Properties for sale: ${siteUrl}/properties/for-sale
  - Properties to rent: ${siteUrl}/properties/to-rent
  - Valuation: ${siteUrl}/valuation
  - Landlords: ${siteUrl}/landlords
  - Buyers: ${siteUrl}/buyers
  - Tenants: ${siteUrl}/tenants
  - Areas we cover: ${siteUrl}/#areas-we-cover
  - Contact: ${siteUrl}/contact
  - About: ${siteUrl}/about

AREAS WE COVER (summary):
${coverage.areas.map((a) => `- ${a.name}: ${a.blurb}`).join("\n")}

CURRENT PROPERTY LISTINGS (live from website):
${propertyBlock}`;
}
