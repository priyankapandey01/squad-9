"use client";

import { type FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

type Review = {
  id: string;
  name: string;
  rating: number;
  review: string;
  created_at: string;
};

export default function ClubReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let mounted = true;
    fetch("/api/reviews", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "Could not load reviews.");
        if (mounted) setReviews(result.reviews);
      })
      .catch((loadError: unknown) => {
        if (mounted) setError(loadError instanceof Error ? loadError.message : "Could not load reviews.");
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, review }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not submit your review.");
      setReviews((current) => [result.review, ...current]);
      setActiveIndex(0);
      setName("");
      setReview("");
      setRating(5);
      setSuccess("Thanks. Your review is now live.");
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Could not submit your review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const moveCarousel = (direction: number) => {
    setActiveIndex((current) => (current + direction + reviews.length) % reviews.length);
  };
  const activeReview = reviews[activeIndex];

  return (
    <section aria-labelledby="club-reviews-title" className="border-t border-white/15 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-6 sm:py-8">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div className="min-w-0">
            <header className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase text-lime">Squad voices / Real reviews</p>
                <h2 id="club-reviews-title" className="font-display text-2xl font-bold uppercase sm:text-3xl">The crew speaks.</h2>
              </div>
              <p className="text-[10px] font-bold uppercase text-white/50">{reviews.length} reviews</p>
            </header>

            <div className="border-l-2 border-magenta pl-4 sm:pl-5">
              {isLoading ? (
                <p className="py-3 text-sm text-white/60">Loading reviews...</p>
              ) : activeReview ? (
                <AnimatePresence mode="wait">
                  <motion.figure key={activeReview.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
                    <div aria-label={`${activeReview.rating} out of 5 stars`} className="mb-1 flex gap-0.5 text-lime">
                      {Array.from({ length: 5 }, (_, index) => <Star key={index} aria-hidden="true" className={`h-3.5 w-3.5 ${index < activeReview.rating ? "fill-current" : "opacity-30"}`} />)}
                    </div>
                    <blockquote className="line-clamp-2 font-display text-lg font-bold uppercase leading-tight sm:text-xl">“{activeReview.review}”</blockquote>
                    <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold uppercase text-white/60">
                      <span className="text-white">{activeReview.name}</span>
                      <time dateTime={activeReview.created_at}>{new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(activeReview.created_at))}</time>
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              ) : (
                <p className="py-3 text-sm text-white/65">{error || "No reviews yet. Be the first to share your run."}</p>
              )}

              {reviews.length > 1 && (
                <div className="mt-3 flex items-center gap-2">
                  <button type="button" aria-label="Previous review" onClick={() => moveCarousel(-1)} className="grid h-8 w-8 place-items-center border border-white/25 text-white transition-colors hover:border-lime hover:bg-lime hover:text-ink"><ChevronLeft aria-hidden="true" className="h-4 w-4" /></button>
                  <span className="text-[10px] font-bold uppercase text-white/50">{String(activeIndex + 1).padStart(2, "0")} / {String(reviews.length).padStart(2, "0")}</span>
                  <button type="button" aria-label="Next review" onClick={() => moveCarousel(1)} className="grid h-8 w-8 place-items-center border border-white/25 text-white transition-colors hover:border-lime hover:bg-lime hover:text-ink"><ChevronRight aria-hidden="true" className="h-4 w-4" /></button>
                </div>
              )}
            </div>
          </div>

          <details className="group border-t border-white/15 pt-4 lg:w-64 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xs font-bold uppercase text-lime marker:hidden">
              Write a review <span aria-hidden="true" className="font-display text-xl leading-none transition-transform group-open:rotate-45">+</span>
            </summary>
            <form id="review-form" onSubmit={submitReview} className="pt-4">
              <label htmlFor="review-name" className="block text-[10px] font-bold uppercase text-white/70">Your name</label>
              <input id="review-name" value={name} onChange={(event) => setName(event.target.value)} required minLength={2} maxLength={60} autoComplete="name" className="mt-1 h-10 w-full border border-white/20 bg-white/5 px-3 text-sm text-white outline-none focus:border-lime" placeholder="Name" />

              <fieldset className="mt-3">
                <legend className="text-[10px] font-bold uppercase text-white/70">Your rating</legend>
                <div className="mt-1 flex gap-1">
                  {Array.from({ length: 5 }, (_, index) => {
                    const value = index + 1;
                    return <button key={value} type="button" aria-label={`${value} star${value === 1 ? "" : "s"}`} aria-pressed={rating === value} onClick={() => setRating(value)} className="grid h-8 w-8 place-items-center text-lime focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><Star aria-hidden="true" className={`h-4 w-4 ${value <= rating ? "fill-current" : ""}`} /></button>;
                  })}
                </div>
              </fieldset>

              <label htmlFor="review-text" className="mt-3 block text-[10px] font-bold uppercase text-white/70">Your review</label>
              <textarea id="review-text" value={review} onChange={(event) => setReview(event.target.value)} required minLength={10} maxLength={600} rows={3} className="mt-1 w-full resize-y border border-white/20 bg-white/5 p-3 text-sm leading-5 text-white outline-none focus:border-lime" placeholder="What stood out?" />
              <p className="mt-1 text-right text-[10px] text-white/50">{review.length} / 600</p>

              <button type="submit" disabled={isSubmitting} className="mt-3 w-full bg-lime px-4 py-3 text-xs font-bold uppercase text-ink transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-60">
                {isSubmitting ? "Submitting..." : "Submit review"}
              </button>
              <p aria-live="polite" className={`mt-2 min-h-4 text-[10px] ${error ? "text-magenta" : "text-white/60"}`}>{error || success}</p>
            </form>
          </details>
        </div>
      </div>
    </section>
  );
}