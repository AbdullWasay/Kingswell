export const dynamic = "force-dynamic";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getSite } from "@/lib/content";
import { realEstateAgentSchema } from "@/lib/seo";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(realEstateAgentSchema()),
        }}
      />
      <Header site={site} />
      <main>{children}</main>
      <Footer site={site} />
      <WhatsAppButton />
    </>
  );
}
