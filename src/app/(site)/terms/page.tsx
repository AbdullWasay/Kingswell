import { createMetadata } from "@/lib/seo";
import { getSite } from "@/lib/data";

export const metadata = createMetadata({
  title: "Terms & Conditions",
  path: "/terms",
});

export default async function TermsPage() {
  const SITE = await getSite();
  return (
    <section className="section-padding mx-auto max-w-3xl">
      <h1 className="heading-section">Terms & Conditions</h1>
      <p className="mt-6 text-gray-600">
        These terms govern your use of the {SITE.name} website. By using this
        site, you agree to these terms.
      </p>
      <h2 className="mt-8 font-serif text-xl text-kingswell-green">
        Property Information
      </h2>
      <p className="text-gray-600">
        All property details are provided in good faith and should be verified
        independently. Images and floorplans are for guidance only.
      </p>
      <h2 className="mt-8 font-serif text-xl text-kingswell-green">
        Liability
      </h2>
      <p className="text-gray-600">
        {SITE.name} accepts no liability for inaccuracies on this website.
        Mortgage calculator results are indicative only.
      </p>
    </section>
  );
}
