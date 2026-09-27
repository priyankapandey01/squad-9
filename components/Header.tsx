"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

// Calculates time remaining until next Sunday 00:00:00
function getNextSundayTarget(): Date {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;

  const target = new Date(now);
  target.setDate(now.getDate() + daysUntilSunday);
  target.setHours(0, 0, 0, 0);

  return target;
}

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [forceLive, setForceLive] = useState(false); // Can be toggled or set as needed
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLive: false,
  });

  useEffect(() => {
    setMounted(true);
    const targetDate = getNextSundayTarget();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds, isLive: false });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Main SQUAD9 Header */}
      <div className="border-b border-line bg-paper/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="font-display text-xl font-bold">
            SQUAD9<span className="text-lime">.</span>
          </div>
          <nav className="hidden gap-7 text-sm text-ink-dim sm:flex">
            <a href="#flow" className="hover:text-ink">
              What to Expect
            </a>
            <a href="#events" className="hover:text-ink">
              Events
            </a>
            <a href="#gallery" className="hover:text-ink">
              Gallery
            </a>
          </nav>
          <a
            href="/book"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper"
          >
            Join a run
          </a>
        </div>
      </div>

      {/* Countdown Banner */}
      <div className="border-b border-[#262626] bg-[#141414]/90 backdrop-blur text-white px-6 py-2.5">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 text-xs font-mono">
          {/* Status Label */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  timeLeft.isLive || forceLive ? "bg-lime-400" : "bg-lime-400"
                }`}
              />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400" />
            </span>
            <span className="font-semibold text-white tracking-wide uppercase">
              {timeLeft.isLive || forceLive ? "NEXT RUN:" : "NEXT SUNDAY RUN:"}
            </span>
          </div>

          {/* Countdown timer / Event Live state */}
          {!mounted ? (
            /* SSR Fallback Placeholder */
            <div className="text-[#a3a3a3]">Loading countdown...</div>
          ) : timeLeft.isLive || forceLive ? (
            <div className="flex items-center gap-2 font-bold text-lime-400 tracking-wider animate-pulse">
              <Radio className="w-4 h-4 text-lime-400" />
              <span>EVENT IS LIVE</span>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="bg-[#262626] border border-[#333] px-2 py-1 rounded font-bold text-white text-xs">
                  {String(timeLeft.days).padStart(2, "0")}
                </span>
                <span className="text-[#737373] text-[10px] font-sans">D</span>
              </div>

              <span className="text-[#404040] font-bold">:</span>

              <div className="flex items-center gap-1.5">
                <span className="bg-[#262626] border border-[#333] px-2 py-1 rounded font-bold text-white text-xs">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-[#737373] text-[10px] font-sans">H</span>
              </div>

              <span className="text-[#404040] font-bold">:</span>

              <div className="flex items-center gap-1.5">
                <span className="bg-[#262626] border border-[#333] px-2 py-1 rounded font-bold text-white text-xs">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-[#737373] text-[10px] font-sans">M</span>
              </div>

              <span className="text-[#404040] font-bold">:</span>

              <div className="flex items-center gap-1.5">
                <span className="bg-[#262626] border border-[#333] text-lime-400 px-2 py-1 rounded font-bold text-xs border-lime-400/30 bg-lime-400/10">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-[#737373] text-[10px] font-sans">S</span>
              </div>
            </div>
          )}

          {/* Quick Action Link */}
          <a
            href="#events"
            className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#a3a3a3] hover:text-white transition underline underline-offset-4 decoration-[#404040]"
          >
            View details
          </a>
        </div>
      </div>
    </header>
  );
}