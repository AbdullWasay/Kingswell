import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import PropertyListings from "@/components/PropertyListings";
import { getProperties, getPublishedProperties } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Properties For Sale",
  description:
    "Browse houses and flats for sale across London and Kent. Premium listings from Kingswell Estate Agents.",
  path: "/properties/for-sale",
  keywords: ["property for sale London", "houses for sale Kent"],
});

export default async function ForSalePage() {
  const properties = getPublishedProperties(await getProperties());
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <PropertyListings type="sale" properties={properties} />
    </Suspense>
  );
}
