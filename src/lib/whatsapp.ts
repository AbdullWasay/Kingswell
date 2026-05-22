import siteData from "../../content/site.json";

export function whatsappUrl(message?: string): string {
  const name = siteData.name;
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || siteData.whatsapp;
  const text = message
    ? encodeURIComponent(message)
    : encodeURIComponent(
        `Hi ${name}, I'd like to enquire about a property.`
      );
  return `https://wa.me/${whatsapp}?text=${text}`;
}
