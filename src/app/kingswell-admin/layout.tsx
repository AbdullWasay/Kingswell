export const metadata = {
  title: "Kingswell Admin",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen font-sans antialiased">{children}</div>;
}
