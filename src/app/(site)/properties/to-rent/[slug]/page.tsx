import { notFound } from "next/navigation";
import PropertyDetail from "@/components/PropertyDetail";
import { getPropertyBySlug, getSimilarProperties } from "@/lib/data";
import { createMetadata, propertySchema } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};
  return createMetadata({
    title: property.title,
    description: property.description.slice(0, 160),
    path: `/properties/to-rent/${slug}`,
  });
}

export default async function PropertyLetPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property || property.type !== "let") notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(propertySchema(property)),
        }}
      />
      <PropertyDetail
        property={property}
        similar={await getSimilarProperties(property)}
      />
    </>
  );
}
