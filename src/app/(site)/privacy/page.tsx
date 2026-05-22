import { createMetadata } from "@/lib/seo";
import { getSite } from "@/lib/data";

export const metadata = createMetadata({
  title: "Privacy Policy",
  path: "/privacy",
});

export default async function PrivacyPage() {
  const SITE = await getSite();
  return (
    <section className="section-padding mx-auto max-w-3xl prose prose-gray">
      <h1 className="heading-section">Privacy Policy</h1>
      <p className="mt-6 text-gray-600">
        {SITE.name} is committed to protecting your privacy. This policy explains
        how we collect, use, and safeguard your personal data in accordance with
        UK GDPR.
      </p>
      <h2 className="mt-8 font-serif text-xl text-kingswell-green">
        Data We Collect
      </h2>
      <p className="text-gray-600">
        When you submit forms on our website, we collect your name, email, phone
        number, and any property-related information you provide.
      </p>
      <h2 className="mt-8 font-serif text-xl text-kingswell-green">
        How We Use Your Data
      </h2>
      <p className="text-gray-600">
        Your data is used to respond to enquiries, provide property services, and
        improve our website. We may share data with our CRM provider and email
        service for legitimate business purposes.
      </p>
      <p className="mt-6 text-gray-600">
        Contact {SITE.email} for any data-related requests.
      </p>
    </section>
  );
}
