import { readContent } from "./content-store";
import type { AreaGuide, Property, TeamMember, Testimonial } from "./types";
import siteDefaults from "../../content/site.json";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  image: string;
  body: string;
}

export interface CoverageAreasContent {
  title: string;
  intro: string;
  disclaimer: string;
  areas: {
    name: string;
    slug?: string;
    tagline?: string;
    image: string;
    blurb: string;
    featured?: boolean;
  }[];
}

export interface PrsMembership {
  legalName: string;
  membershipNumber: string;
  startDate: string;
  expiryDate: string;
  certificateImage: string;
  schemeUrl: string;
}

export interface SiteConfig {
  name: string;
  slogan: string;
  tagline?: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
  };
  prs?: PrsMembership;
}

export interface WhyChooseItem {
  title: string;
  description: string;
  icon: string;
}

export async function getSite() {
  const site = await readContent<SiteConfig>("site");
  const defaults = siteDefaults as SiteConfig;
  return {
    ...site,
    phone: process.env.NEXT_PUBLIC_PHONE || site.phone,
    email: process.env.NEXT_PUBLIC_EMAIL || site.email,
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || site.whatsapp,
    prs: site.prs ?? defaults.prs,
  };
}

export async function getProperties(): Promise<Property[]> {
  const properties = await readContent<Property[]>("properties");
  return Array.isArray(properties) ? properties : [];
}

export async function getTestimonials() {
  return readContent<Testimonial[]>("testimonials");
}

export async function getTeam() {
  return readContent<TeamMember[]>("team");
}

export async function getAreaGuides() {
  return readContent<AreaGuide[]>("areas");
}

export async function getWhyChoose() {
  return readContent<WhyChooseItem[]>("why-choose");
}

export async function getCoverageAreas() {
  return readContent<CoverageAreasContent>("coverage-areas");
}

export async function getBlogPosts() {
  return readContent<BlogPost[]>("blog");
}

export async function getPropertyBySlug(
  slug: string
): Promise<Property | undefined> {
  const properties = await getProperties();
  return properties.find((p) => p.slug === slug);
}

export async function getSimilarProperties(
  property: Property,
  limit = 3
): Promise<Property[]> {
  const properties = await getProperties();
  return properties
    .filter((p) => p.id !== property.id && p.type === property.type)
    .slice(0, limit);
}

export async function getAreaGuide(
  slug: string
): Promise<AreaGuide | undefined> {
  const areas = await getAreaGuides();
  return areas.find((a) => a.slug === slug);
}

export async function getBlogPost(
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug);
}

export async function loadAllContent() {
  const [site, properties, testimonials, team, areaGuides, whyChoose, blogPosts] =
    await Promise.all([
      getSite(),
      getProperties(),
      getTestimonials(),
      getTeam(),
      getAreaGuides(),
      getWhyChoose(),
      getBlogPosts(),
    ]);
  return { site, properties, testimonials, team, areaGuides, whyChoose, blogPosts };
}

export type { ContentKey } from "./content-store";
