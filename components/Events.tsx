"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { events } from "@/lib/events";

export default function Events() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = () => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const stride = card.getBoundingClientRect().width + gap;
    setActiveIndex(Math.min(events.length - 1, Math.max(0, Math.round(track.scrollLeft / stride))));
  };

  const formatIndex = (index: number) => String(index + 1).padStart(2, "0");

  return (
    <section id="events" className="border-y border-white/10 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-line pb-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
        >
          <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase text-lime">
            <span aria-hidden="true" className="h-2 w-2 bg-lime" /> Squad9 / Noida / Run calendar
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-[0.88] sm:text-7xl">
            Run the city.
            <br />
            <span className="text-lime">Own Sunday.</span>
          </h2>
          <p className="mt-3 max-w-md text-sm text-paper/70 sm:text-base">
            Pick a date. Meet your people. Stay for the afterparty.
          </p>
        </motion.div>
        <div className="flex items-center gap-2 border border-white/15 bg-white/5 px-2 py-1.5 text-paper sm:gap-3 sm:px-3 sm:py-2">
          <div aria-live="polite" className="flex items-baseline gap-1 font-display font-bold tabular-nums">
            <span className="text-2xl leading-none text-lime">{formatIndex(activeIndex)}</span>
            <span className="text-sm text-paper/55">/ {formatIndex(events.length)}</span>
          </div>
          <div aria-hidden="true" className="h-0.5 w-10 bg-white/20 sm:w-14">
            <motion.div
              className="h-full bg-lime"
              animate={{ width: `${((activeIndex + 1) / events.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            />
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        id="upcoming-runs-track"
        onScroll={updateActiveIndex}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-3 sm:mx-0 sm:gap-5 sm:px-0"
      >
        {events.map((e, i) => (
          <motion.div
            key={e.startsAt}
            initial={{ opacity: 0, x: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: "spring", stiffness: 280, damping: 24, delay: i * 0.045 }}
            className="w-[58vw] min-w-[190px] max-w-[220px] flex-shrink-0 snap-start overflow-hidden border border-white/15 bg-white/5 sm:w-[240px] sm:max-w-none"
          >
            <div className="group relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={e.poster}
                alt={e.title}
                fill
                sizes="240px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3 bg-lime px-3 py-1 font-display text-sm font-bold uppercase text-ink">
                {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(e.startsAt))}
              </div>
            </div>
            <div className="bg-[#252a25] p-4">
              <h3 className="text-sm font-medium">{e.title}</h3>
              <p className="mt-1 text-xs text-paper/65">{e.place}</p>
              <a
                href="/book"
                className="mt-3 block bg-lime px-4 py-2.5 text-center text-xs font-bold uppercase text-ink transition-colors hover:bg-white"
              >
                Book your spot
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}