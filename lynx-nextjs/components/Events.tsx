"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const events = [
  {
    date: "Oct 5",
    title: "Sunday Run + Rave",
    place: "Venue drops Friday - Noida - 3km",
    poster: "https://picsum.photos/seed/squad9-poster-1/600/800",
  },
  {
    date: "Oct 12",
    title: "Sunday Run + Rave",
    place: "Venue drops Friday - Noida - 3km",
    poster: "https://picsum.photos/seed/squad9-poster-2/600/800",
  },
  {
    date: "Oct 19",
    title: "Sunday Run + Rave",
    place: "Venue drops Friday - Noida - 3km",
    poster: "https://picsum.photos/seed/squad9-poster-3/600/800",
  },
];

export default function Events() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    trackRef.current?.scrollBy({ left: dir * 260, behavior: "smooth" });
  };

  return (
    <section id="events" className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Upcoming Sundays</h2>
          <p className="mt-2 max-w-xs text-sm text-ink-dim">Show up in trainers, leave in whatever you dance best in.</p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="h-9 w-9 rounded-full border border-line text-ink-dim hover:text-ink"
          >
            &larr;
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="h-9 w-9 rounded-full border border-line text-ink-dim hover:text-ink"
          >
            &rarr;
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-2 sm:mx-0 sm:px-0"
      >
        {events.map((e, i) => (
          <motion.div
            key={e.date}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="w-[220px] flex-shrink-0 snap-center overflow-hidden rounded-2xl border border-line bg-white shadow-sm sm:w-[240px]"
          >
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={e.poster}
                alt={e.title}
                fill
                sizes="240px"
                className="object-cover"
              />
              <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-display text-xs font-semibold text-ink">
                {e.date}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium">{e.title}</h3>
              <p className="mt-1 text-xs text-ink-dim">{e.place}</p>
              
                href="/book"
                className="mt-3 block rounded-full bg-ink px-4 py-2 text-center text-xs font-semibold text-paper"
              >
                Book your spot
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}