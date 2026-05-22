"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogEditor from "@/components/admin/BlogEditor";
import type { BlogPost } from "@/lib/content";

export default function EditBlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch("/api/admin/content/blog")
      .then((r) => r.json())
      .then((list: BlogPost[]) => setPost(list.find((p) => p.slug === slug) || null));
  }, [slug]);

  if (!post) return <p className="p-8">Loading...</p>;
  return <BlogEditor initial={post} />;
}
