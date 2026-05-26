import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import {
  Building2,
  FileText,
  MessageSquare,
  Users,
  MapPin,
  Settings,
  Inbox,
} from "lucide-react";
import {
  getProperties,
  getBlogPosts,
  getTestimonials,
  getTeam,
  getAreaGuides,
} from "@/lib/content";
import { getLeadCount } from "@/lib/leads-store";

const cards = [
  {
    href: "/kingswell-admin/leads",
    label: "Form Enquiries",
    icon: Inbox,
    key: "leads" as const,
  },
  {
    href: "/kingswell-admin/properties",
    label: "Properties",
    icon: Building2,
    key: "properties" as const,
  },
  {
    href: "/kingswell-admin/blog",
    label: "Blog Posts",
    icon: FileText,
    key: "blog" as const,
  },
  {
    href: "/kingswell-admin/testimonials",
    label: "Testimonials",
    icon: MessageSquare,
    key: "testimonials" as const,
  },
  { href: "/kingswell-admin/team", label: "Team", icon: Users, key: "team" as const },
  {
    href: "/kingswell-admin/areas",
    label: "Area Guides",
    icon: MapPin,
    key: "areas" as const,
  },
  {
    href: "/kingswell-admin/site",
    label: "Site Settings",
    icon: Settings,
    key: "site" as const,
  },
];

export default async function AdminDashboardPage() {
  const [properties, blog, testimonials, team, areas, leadCount] =
    await Promise.all([
      getProperties(),
      getBlogPosts(),
      getTestimonials(),
      getTeam(),
      getAreaGuides(),
      getLeadCount(),
    ]);

  const counts: Record<string, number> = {
    leads: leadCount,
    properties: properties.length,
    blog: blog.length,
    testimonials: testimonials.length,
    team: team.length,
    areas: areas.length,
    site: 1,
  };

  return (
    <AdminShell title="Dashboard">
      <p className="mb-8 text-gray-600">
        Manage all website content from one place. Changes go live after you
        save.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-sm border border-gray-200 bg-white p-6 shadow-sm transition hover:border-kingswell-gold hover:shadow-md"
            >
              <Icon className="mb-4 h-8 w-8 text-kingswell-gold transition group-hover:scale-110" />
              <h2 className="font-serif text-xl text-kingswell-green">
                {card.label}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {counts[card.key]} item{counts[card.key] !== 1 ? "s" : ""}
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-sm border border-kingswell-gold/30 bg-kingswell-green/5 p-6">
        <h3 className="font-serif text-lg text-kingswell-green">Quick tips</h3>
        <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-600">
          <li>Add properties under Properties → Add New</li>
          <li>Upload images directly in each form</li>
          <li>Mark properties as Featured to show on homepage</li>
          <li>View all form submissions under Form Enquiries</li>
          <li>Enquiries are also emailed when Resend is configured</li>
        </ul>
      </div>
    </AdminShell>
  );
}
