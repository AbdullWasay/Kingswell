import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPost } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const blogPosts = await getBlogPosts();
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <section className="relative flex min-h-[40vh] items-end">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-kingswell-green to-transparent" />
        <div className="relative z-10 w-full p-8 text-white md:p-16">
          <Link href="/blog" className="text-sm text-kingswell-gold hover:underline">
            ← Back to blog
          </Link>
          <h1 className="mt-4 font-serif text-3xl md:text-5xl">{post.title}</h1>
          <p className="mt-2 text-sm text-white/70">
            {post.author} ·{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      <article className="section-padding mx-auto max-w-3xl">
        {post.body.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="mb-6 leading-relaxed text-gray-600">
            {paragraph}
          </p>
        ))}
      </article>
    </>
  );
}
