export const dynamic = "force-dynamic";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnersSection from "@/components/PartnersSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import Chatbot from "@/components/Chatbot";
import { getSite } from "@/lib/content";
import { realEstateAgentSchema, websiteSchema } from "@/lib/seo";

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
          __html: JSON.stringify([
            realEstateAgentSchema(),
            websiteSchema(),
          ]),
        }}
      />
      <Header site={site} />
      <main>{children}</main>
      <PartnersSection />
      <Footer site={site} />
      <Chatbot />
      <WhatsAppButton />
    </>
  );
}
