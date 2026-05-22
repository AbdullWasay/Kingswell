export type PropertyType = "sale" | "let";

export interface Property {
  id: string;
  slug: string;
  type: PropertyType;
  title: string;
  address: string;
  area: string;
  price: number;
  priceLabel: string;
  bedrooms: number;
  bathrooms: number;
  receptionRooms: number;
  description: string;
  features: string[];
  images: string[];
  floorplan?: string;
  epcRating?: string;
  epcImage?: string;
  lat: number;
  lng: number;
  featured?: boolean;
  status: "available" | "under-offer" | "let-agreed" | "sold";
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface AreaGuide {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  overview: string;
  schools: string[];
  transport: string[];
  lifestyle: string[];
  marketInsights: string;
  amenities: string[];
}
