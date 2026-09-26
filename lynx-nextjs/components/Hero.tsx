"use client";

import { motion } from "framer-motion";

const stats = [
  { n: "5K–10K", l: "distance range per run" },
  { n: "3x", l: "crews meeting weekly" },
  { n: "1", l: "rule: everyone dances after" },
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-24">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4 text-sm font-medium text-magenta"
      >
        Run crews for people who don&apos;t want the night to end
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
        Lynx is a running community built around one idea: a good sweat
        deserves a good afterparty. We run, we train, we stretch it out on
        the dance floor.
      </motion.p>
      <div className="mt-9 flex flex-wrap gap-3">
        <a href="#events" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper">
          See upcoming runs
        </a>
        <a href="#flow" className="rounded-full border border-line px-6 py-3 text-sm">
          What a night looks like
        </a>
      </div>

      <div className="mt-16 grid grid-cols-1 border-y border-line sm:grid-cols-3">
        {stats.map((s, i) => (
          <div
            key={s.l}
            className={`px-6 py-7 ${i < 2 ? "sm:border-r" : ""} border-line border-t sm:border-t-0 first:border-t-0`}
          >
            <div className="font-display text-3xl font-bold text-lime">{s.n}</div>
            <div className="mt-1 text-xs text-ink-dim">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
