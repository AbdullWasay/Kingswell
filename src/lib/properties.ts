import type { Property } from "./types";

const PUBLIC_STATUSES = ["available", "under-offer"] as const;

/** Properties visible on the public site */
export function getPublishedProperties(properties: Property[]): Property[] {
  return properties.filter((p) =>
    PUBLIC_STATUSES.includes(p.status as (typeof PUBLIC_STATUSES)[number])
  );
}

/** Homepage: featured first, then other published listings */
export function getHomepageListings(properties: Property[]): Property[] {
  const published = getPublishedProperties(properties);
  const featured = published.filter((p) => p.featured);
  const rest = published.filter((p) => !p.featured);
  return [...featured, ...rest];
}

export function sortPropertiesForDisplay(properties: Property[]): Property[] {
  return getHomepageListings(properties);
}
