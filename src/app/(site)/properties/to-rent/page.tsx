import { Suspense } from "react";
import { createMetadata } from "@/lib/seo";
import PropertyListings from "@/components/PropertyListings";
import { getProperties, getPublishedProperties } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = createMetadata({
  title: "Properties To Rent",
  description:
    "Flats and houses to rent in Catford, Lee, Hither Green and Lewisham. Letting agents you can trust.",
  path: "/properties/to-rent",
  keywords: ["flats to rent Lee", "letting agents Catford"],
});

export default async function ToRentPage() {
  const properties = getPublishedProperties(await getProperties());
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <PropertyListings type="let" properties={properties} />
    </Suspense>
  );
}
