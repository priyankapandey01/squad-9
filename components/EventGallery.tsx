"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const photos = [
  { src: "/assets/images/IMG_0694.jpg", caption: "City loop, September crew", label: "On the route" },
  { src: "/assets/images/IMG_0571.jpg", caption: "Sunrise 10K warm-up", label: "First light" },
  { src: "/assets/images/IMG_0535.jpg", caption: "Run & Rave", label: "Night shift" },
  { src: "/assets/images/IMG_0587.jpg", caption: "Cooldown circuit", label: "Catch your breath" },
  { src: "/assets/images/IMG_0641.jpg", caption: "Flagship night, DJ set", label: "One more song" },
];

export default function EventGallery() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive((index) => (index + 1) % photos.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="gallery" className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
        <header className="mb-6 grid gap-3 border-b border-white/15 pb-5 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-6 sm:pb-6">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-lime">Squad9 / Moments in motion</p>
            <h2 className="font-display text-4xl font-bold uppercase leading-[0.9] sm:text-5xl">
              No two Sundays
              <br />
              <span className="text-magenta">look alike.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/65">
            From first light to last track, here&apos;s a look around the crew.
          </p>
        </header>

        <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/5 sm:aspect-[16/8]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={photos[active].src}
              initial={{ opacity: 0, scale: 1.015 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src={photos[active].src}
                alt={photos[active].caption}
                fill
                sizes="(max-width: 1279px) 100vw, 1280px"
                className="object-cover"
                priority={active === 0}
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-7">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase text-lime sm:text-xs">
                    {String(active + 1).padStart(2, "0")} / {photos[active].label}
                  </p>
                  <p className="font-display text-2xl font-bold uppercase leading-[0.95] text-white sm:text-4xl">
                    {photos[active].caption}
                  </p>
                </div>
                <p className="shrink-0 font-display text-xl font-bold text-white/75 sm:text-2xl">
                  {String(active + 1).padStart(2, "0")}<span className="text-lime"> / {String(photos.length).padStart(2, "0")}</span>
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div aria-hidden="true" className="mt-2 grid grid-cols-5 gap-2">
          {photos.map((photo, index) => (
            <div key={photo.src} className="h-1 bg-white/20">
              <motion.div
                className={`h-full ${index <= active ? "bg-lime" : "bg-transparent"}`}
                initial={false}
                animate={{ width: index < active ? "100%" : index === active ? "100%" : "0%" }}
                transition={{ duration: index === active ? 5 : 0.2, ease: "linear" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}