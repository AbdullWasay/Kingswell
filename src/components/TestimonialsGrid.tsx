"use client";

import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { useMemo, useRef, useState } from "react";

const AVATAR_COLORS = [
  "bg-[#5c6bc0] text-white",
  "bg-[#7e57c2] text-white",
  "bg-[#26a69a] text-white",
  "bg-[#78909c] text-white",
  "bg-[#8d6e63] text-white",
  "bg-[#455a64] text-white",
];

function avatarColor(name: string) {
  const code = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

function formatReviewDate(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (days < 1) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) === 1 ? "" : "s"} ago`;
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} month${months === 1 ? "" : "s"} ago`;
  }
  return date.toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ review }: { review: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const shouldClamp = !expanded && review.text.length > 420;

  const containerClass = expanded
    ? "flex h-auto flex-col rounded-sm border border-gray-200/80 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
    : "flex h-[340px] flex-col rounded-sm border border-gray-200/80 bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:h-[360px] sm:p-6";

  return (
    <article className={containerClass}>
      <header className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${avatarColor(
            review.name
          )}`}
          aria-hidden
        >
          {initials(review.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-kingswell-green">
            {review.name}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <div
              className="flex gap-0.5"
              aria-label={`${review.rating} out of 5 stars`}
            >
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-kingswell-gold text-kingswell-gold"
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              {formatReviewDate(review.date)}
            </span>
            {review.isNew && (
              <span className="rounded-sm border border-gray-300 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gray-600">
                New
              </span>
            )}
          </div>
        </div>
      </header>

      <blockquote className="mt-4 flex-1 overflow-hidden">
        <p
          className={`text-sm leading-relaxed text-gray-700 sm:text-[15px] ${
            shouldClamp ? "line-clamp-7" : ""
          }`}
        >
          &ldquo;{review.text}&rdquo;
        </p>
      </blockquote>

      {review.text.length > 420 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 self-start text-xs font-semibold uppercase tracking-[0.18em] text-kingswell-green hover:text-kingswell-gold"
        >
          {expanded ? "Show less" : "Read full review"}
        </button>
      )}

      {review.source === "google" && (
        <footer className="mt-4 border-t border-gray-100 pt-3">
          <p className="text-[11px] uppercase tracking-wider text-gray-400">
            Posted on Google
          </p>
        </footer>
      )}
    </article>
  );
}

export default function TestimonialsGrid({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLUListElement | null>(null);

  const safeTestimonials = useMemo(
    () => testimonials ?? [],
    [testimonials]
  );

  if (safeTestimonials.length === 0) return null;

  const handleArrow = (direction: "prev" | "next") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;

    setActive((current) => {
      const nextIndex =
        direction === "next"
          ? (current + 1) % safeTestimonials.length
          : (current - 1 + safeTestimonials.length) % safeTestimonials.length;

      const target = container.children[nextIndex] as HTMLElement | undefined;
      if (target) {
        const left = target.offsetLeft - container.offsetLeft;
        container.scrollTo({ left, behavior: "smooth" });
      }

      return nextIndex;
    });
  };

  return (
    <section className="section-padding mx-auto max-w-7xl">
      <div className="mb-8 text-center md:mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-kingswell-gold">
          Client feedback
        </p>
        <div className="gold-divider my-4" />
        <h2 className="heading-section">What our clients say</h2>
        <div className="mt-3 flex items-center justify-center gap-2 text-sm text-gray-500">
          <span className="inline-flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-kingswell-gold text-kingswell-gold"
              />
            ))}
          </span>
          <span>Google Reviews</span>
        </div>
      </div>

      {/* Horizontal carousel (all breakpoints) */}
      <div>
        <div className="flex items-center justify-between pb-3 text-xs uppercase tracking-[0.18em] text-gray-400">
          <span>
            {active + 1} / {safeTestimonials.length}
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => handleArrow("prev")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-gray-300 bg-white text-gray-600 transition hover:border-kingswell-gold hover:text-kingswell-green"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handleArrow("next")}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-gray-300 bg-white text-gray-600 transition hover:border-kingswell-gold hover:text-kingswell-green"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <ul
          ref={scrollRef}
          className="review-carousel flex snap-x snap-mandatory gap-4 pb-2"
        >
          {safeTestimonials.map((review, index) => (
            <li
              key={review.id}
              data-review-card
              className="snap-center shrink-0 basis-[85%] sm:basis-[55%] lg:basis-[32%]"
            >
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>

    </section>
  );
}
