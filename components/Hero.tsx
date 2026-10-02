"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Timer } from "lucide-react";
import { events } from "@/lib/events";

function getNextRunCountdown() {
  const now = new Date();
  const event = events.find(({ startsAt }) => new Date(startsAt).getTime() > now.getTime());
  if (!event) return null;
  const target = new Date(event.startsAt);

  return {
    target,
    seconds: Math.ceil((target.getTime() - now.getTime()) / 1000),
  };
}

export default function Hero() {
  const [countdown, setCountdown] = useState<ReturnType<typeof getNextRunCountdown> | null>(null);

  useEffect(() => {
    const updateCountdown = () => setCountdown(getNextRunCountdown());
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const remainingSeconds = countdown?.seconds ?? 0;
  const timeUnits = [
    { label: "Days", shortLabel: "D", value: Math.floor(remainingSeconds / 86400) },
    { label: "Hours", shortLabel: "H", value: Math.floor((remainingSeconds % 86400) / 3600) },
    { label: "Minutes", shortLabel: "Min", value: Math.floor((remainingSeconds % 3600) / 60) },
    { label: "Seconds", shortLabel: "Sec", value: remainingSeconds % 60 },
  ];

  return (
    <section className="pb-0 sm:pb-8 lg:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-live="off"
        aria-label={countdown ? `Next run ${countdown.target.toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "Asia/Kolkata" })} at 7 AM` : "No upcoming run scheduled"}
        className="w-full bg-ink text-white"
      >
        <div className="mx-auto flex min-h-10 max-w-7xl flex-wrap items-center justify-between gap-x-1 gap-y-0 px-3 py-1 sm:gap-x-3 sm:px-0">
        <div className="flex items-center gap-1.5 text-xs sm:gap-2 sm:text-sm">
          <Timer aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-lime sm:h-4 sm:w-4" />
          <span className="font-bold uppercase text-lime">Next run</span>
          <span className="font-display text-sm font-semibold text-white sm:text-lg">
            {countdown
              ? `${new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "Asia/Kolkata" }).format(countdown.target)} · 7am`
              : "No upcoming run scheduled"}
          </span>
        </div>
        {countdown && (
          <div className="grid w-[140px] flex-shrink-0 grid-cols-4 text-center sm:w-auto">
            {timeUnits.map(({ label, shortLabel, value }) => (
              <div key={label} className="min-w-7 border-l border-white/25 px-1 sm:min-w-8 sm:px-1.5">
                <div className="font-display text-base font-bold tabular-nums leading-4 text-white sm:text-xl sm:leading-5">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="text-[8px] font-semibold uppercase leading-3 text-white/70 sm:text-[9px]">
                  <span className="sm:hidden">{shortLabel}</span>
                  <span className="hidden sm:inline">{label}</span>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </motion.div>
      <div className="relative isolate flex min-h-[480px] items-end overflow-hidden bg-ink sm:min-h-[680px] lg:min-h-[560px]">
        <div aria-hidden="true" className="absolute inset-y-0 left-1/2 z-0 w-full max-w-7xl -translate-x-1/2">
          <Image
            src="/assets/images/IMG_0571.jpg"
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover object-[center_58%]"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="relative z-20 mx-auto w-full max-w-7xl px-6 py-8 text-white sm:py-16"
        >
          <p className="mb-3 flex items-center gap-3 text-xs font-bold uppercase text-lime sm:mb-4 sm:text-sm">
            <span aria-hidden="true" className="h-px w-8 bg-magenta" />
            Noida / Run club / All paces
          </p>
          <h1 className="font-display text-left text-3xl font-bold uppercase leading-[0.92] sm:text-8xl sm:leading-[0.82] lg:text-8xl">
            Run hard.
            <br />
            <span className="text-lime">Move together.</span>
          </h1>
          <div className="mt-5 flex flex-col gap-4 sm:mt-7 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <div>
              <p className="max-w-md text-left text-sm leading-6 text-white/85 sm:text-lg sm:leading-7">
                Good miles, good people, and a reason to stay after the finish.
              </p>
              <div className="mt-4 flex flex-wrap justify-start gap-3 sm:mt-6">
                <a href="#events" className="bg-lime px-4 py-2.5 text-xs font-bold uppercase text-ink transition-colors hover:bg-white sm:px-5 sm:py-3 sm:text-sm">
                  Find your next run
                </a>
                <a href="#activities" className="border border-white/60 px-4 py-2.5 text-xs font-bold uppercase text-white transition-colors hover:border-lime hover:text-lime sm:px-5 sm:py-3 sm:text-sm">
                  Meet the club
                </a>
              </div>
            </div>
            <p className="ml-auto w-fit self-end border-r-2 border-magenta pr-3 text-right text-[10px] font-semibold uppercase leading-4 text-magenta sm:pr-4 sm:text-[11px]">
              <span className="text-magenta">Run / Connect</span>
              <br />
              <span className="text-magenta">Rave / Repeat</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}