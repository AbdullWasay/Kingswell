import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/seo";
import { getBlogPosts } from "@/lib/data";

export const metadata = createMetadata({
  title: "Property Insights & Blog",
  description:
    "Property market insights, area guides and expert advice from Kingswell Estate Agents.",
  path: "/blog",
});

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const sorted = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <>
      <section className="bg-kingswell-green py-20 text-center text-white">
        <h1 className="font-serif text-4xl md:text-6xl">Property Insights</h1>
        <p className="mt-4 text-white/70">Expert advice from your local agents</p>
      </section>

      <section className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2">
          {sorted.map((post) => (
            <article
              key={post.slug}
              className="group overflow-hidden rounded-sm bg-white shadow-md transition hover:shadow-xl"
            >
              <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/9]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
              <div className="p-6">
                <time className="text-xs uppercase tracking-wider text-kingswell-gold">
                  {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="mt-2 font-serif text-xl text-kingswell-green transition hover:text-kingswell-gold">
                    {post.title}
                  </h2>
                </Link>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-block text-sm font-semibold uppercase tracking-wider text-kingswell-gold"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
