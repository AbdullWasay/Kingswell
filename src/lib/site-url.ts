const DEFAULT_SITE_URL = "https://kingswellestateagents.co.uk";

export function getSiteUrl(): string {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    DEFAULT_SITE_URL;
  return url.replace(/\/$/, "");
}
