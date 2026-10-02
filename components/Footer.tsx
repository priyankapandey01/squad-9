import { ArrowUpRight } from "lucide-react";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaThreads,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

const socials: { name: string; icon: IconType; href?: string }[] = [
  { name: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/squad9_community/" },
  { name: "Facebook", icon: FaFacebookF },
  { name: "WhatsApp", icon: FaWhatsapp },
  { name: "YouTube", icon: FaYoutube },
  { name: "TikTok", icon: FaTiktok },
  { name: "X", icon: FaXTwitter },
  { name: "Threads", icon: FaThreads },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-lime bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-[1fr_auto] sm:items-end sm:py-14">
        <div>
          <p className="mb-4 text-xs font-semibold uppercase text-magenta">
            Noida / Run club / Every pace
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.92] sm:text-5xl">
            First run&apos;s on us.
            <br />
            <span className="text-lime">Bring your shoes.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-paper/70">
            Meet the crew for an easy-paced 3K. Stay for the games, music, and good company.
          </p>
          <a
            href="/book"
            className="mt-6 inline-flex items-center gap-2 bg-paper px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-lime"
          >
            Join the next run
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center gap-4 border-l-2 border-magenta pl-4 sm:mb-1">
          <span className="font-display text-5xl font-bold leading-none text-lime">07</span>
          <div className="text-xs font-semibold uppercase">
            <p>Sunday</p>
            <p className="mt-1 text-paper/60">Noida / India</p>
          </div>
        </div>
      </div>

      <div className="border-y border-white/15 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl divide-y divide-white/15 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="py-4 sm:py-5 sm:pr-6">
            <p className="text-[10px] font-bold uppercase text-lime">When</p>
            <p className="mt-1 font-display text-lg font-bold uppercase">Sunday / 7:00 AM</p>
          </div>
          <div className="py-4 sm:px-6 sm:py-5">
            <p className="text-[10px] font-bold uppercase text-magenta">Where</p>
            <p className="mt-1 font-display text-lg font-bold uppercase">Noida / Venue Friday</p>
          </div>
          <div className="py-4 sm:py-5 sm:pl-6">
            <p className="text-[10px] font-bold uppercase text-lime">The run</p>
            <p className="mt-1 font-display text-lg font-bold uppercase">Easy-paced / 3K</p>
          </div>
        </div>
      </div>

      <div className="border-b border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-7">
          <div>
            <p className="text-xs font-bold uppercase text-lime">Follow the crew</p>
            <p className="mt-1 text-xs text-paper/60">Stories, meet-up updates, and more from Squad9.</p>
          </div>
          <nav aria-label="Social media" className="flex flex-wrap gap-2">
            {socials.map(({ name, icon: Icon, href }) => href ? (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Squad9 on ${name} (opens in a new tab)`}
                title={name}
                className="grid h-10 w-10 place-items-center border border-lime/50 bg-lime text-ink transition-colors hover:border-lime hover:bg-white"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
              </a>
            ) : (
              <span
                key={name}
                aria-label={`${name} link coming soon`}
                title={`${name} / link coming soon`}
                className="grid h-10 w-10 place-items-center border border-white/20 text-paper/45"
              >
                <Icon aria-hidden="true" className="h-4 w-4" />
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-5 text-xs text-paper/65">
          <a href="/" className="font-display text-lg font-bold text-paper">
            SQUAD9<span className="text-lime">.</span>
          </a>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#flow" className="transition-colors hover:text-lime">What to Expect</a>
            <a href="#events" className="transition-colors hover:text-lime">Events</a>
            <a href="#gallery" className="transition-colors hover:text-lime">Gallery</a>
          </nav>
          <p>&copy; 2026 Squad9. A Lynx company.</p>
        </div>
      </div>
    </footer>
  );
}