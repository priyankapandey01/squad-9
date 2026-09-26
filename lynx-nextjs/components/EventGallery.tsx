"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// Placeholder photos — swap each `src` for a real photo from your events,
// e.g. "/events/run-1.jpg" once you drop real files into /public/events.
const photos = [
  { src: "https://picsum.photos/seed/lynx-run-1/1200/800", caption: "City Loop Run, September crew" },
  { src: "https://picsum.photos/seed/lynx-run-2/1200/800", caption: "Sunrise 10K warm-up" },
  { src: "https://picsum.photos/seed/lynx-rave-1/1200/800", caption: "Run & Rave, dance floor" },
  { src: "https://picsum.photos/seed/lynx-run-3/1200/800", caption: "Cooldown circuit" },
  { src: "https://picsum.photos/seed/lynx-rave-2/1200/800", caption: "Flagship night, DJ set" },
];

export default function EventGallery() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % photos.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="gallery" className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">From the last few runs</h2>
        <p className="max-w-xs text-sm text-ink-dim">A look at what shows up on the group chat after.</p>
      </div>

      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-line sm:aspect-[16/9]">
        <AnimatePresence mode="wait">
          <motion.div
            key={photos[active].src}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={photos[active].src}
              alt={photos[active].caption}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              className="object-cover"
              priority={active === 0}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
              <p className="text-sm text-white">{photos[active].caption}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex gap-2">
        {photos.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1}`}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i === active ? "bg-ink" : "bg-line"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
