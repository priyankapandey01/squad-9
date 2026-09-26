"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-8 sm:pt-24">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-sm font-medium text-magenta"
      >
        For those who crave more than just a run.
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-5xl font-bold leading-[1.02] sm:text-7xl"
      >
        Run hard.
        <br />
        Move loose.
        <br />
        <span className="text-lime">Rave later.</span>
      </motion.h1>
            <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 max-w-md text-lg text-ink-dim"
      >
        Squad9 creates fun, inclusive running experiences that bring people
        together - day runs, night events, and everything in between.
      </motion.p>
      
      <div className="mt-9 flex flex-wrap gap-3">
        <a href="#events" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper">
          See upcoming runs
        </a>
        <a href="#flow" className="rounded-full border border-line px-6 py-3 text-sm">
          What running rave looks like
        </a>
      </div>
    </section>
  );
}