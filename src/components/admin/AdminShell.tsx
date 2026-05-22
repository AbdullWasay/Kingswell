"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  Building2,
  FileText,
  MessageSquare,
  Users,
  MapPin,
  Star,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const nav = [
  { href: "/kingswell-admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/kingswell-admin/site", label: "Site Settings", icon: Settings },
  { href: "/kingswell-admin/properties", label: "Properties", icon: Building2 },
  { href: "/kingswell-admin/blog", label: "Blog", icon: FileText },
  { href: "/kingswell-admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/kingswell-admin/team", label: "Team", icon: Users },
  { href: "/kingswell-admin/areas", label: "Area Guides", icon: MapPin },
  { href: "/kingswell-admin/why-choose", label: "Why Choose", icon: Star },
];

export default function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/kingswell-admin");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-kingswell-green text-white">
        <div className="border-b border-kingswell-gold/20 p-6">
          <p className="font-serif text-lg text-kingswell-gold">Kingswell</p>
          <p className="text-xs uppercase tracking-wider text-white/60">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-kingswell-gold/20 text-kingswell-gold"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-kingswell-gold/20 p-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-sm px-3 py-2 text-sm text-white/70 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View Website
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1">
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl text-kingswell-green">
              {title || "Admin"}
            </h1>
            <Home className="h-5 w-5 text-kingswell-gold" />
          </div>
        </header>
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
