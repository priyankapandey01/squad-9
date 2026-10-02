import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const posts = [
  {
    url: "https://www.instagram.com/reel/DdgBhBISbA5/",
    image: "/assets/images/IMG_0694.jpg",
    caption: "The crew before the first mile",
  },
  {
    url: "https://www.instagram.com/reel/DdZDJb4yMKY/",
    image: "/assets/images/IMG_0535.jpg",
    caption: "When the run turns into a rave",
  },
];

export default function InstagramComments() {
  return (
    <>
      <section id="comments" className="border-y border-white/10 bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-[0.7fr_1.3fr] sm:items-start sm:gap-12 sm:py-16">
          <div className="sm:sticky sm:top-28">
            <p className="mb-3 text-xs font-bold uppercase text-lime">Squad voices / Instagram</p>
            <h2 className="font-display text-5xl font-bold uppercase leading-[0.88] sm:text-6xl">
              The crew
              <br />
              <span className="text-magenta">has the floor.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
              Run-day moments, straight from the people who showed up.
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-white/20 pt-4">
              <span className="font-display text-3xl font-bold leading-none text-lime">
                {String(posts.length).padStart(2, "0")}
              </span>
              <span className="text-[10px] font-bold uppercase leading-4 text-white/60">
                crew clips
                <br />
                from Instagram
              </span>
            </div>
          </div>

          <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">
            {posts.map((post, index) => (
              <a
                key={post.url}
                href={post.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Watch Instagram reel: ${post.caption} (opens in a new tab)`}
                className="group relative block aspect-[4/5] w-[min(78vw,326px)] flex-shrink-0 snap-start overflow-hidden border border-white/15 bg-white/5 sm:w-[360px]"
              >
                <Image
                  src={post.image}
                  alt={post.caption}
                  fill
                  sizes="(max-width: 640px) 78vw, 360px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />
                <div className="absolute inset-x-0 top-0 p-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-lime">
                    Crew clip / {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
                    {post.caption}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase text-lime">
                    Watch reel <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-b border-white/10 bg-ink text-white">
        <Image
          src="/assets/images/IMG_0641.jpg"
          alt="Squad9 runners celebrating together after an event"
          fill
          sizes="100vw"
          className="-z-20 object-cover object-center"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink/75" />
        <div className="mx-auto grid min-h-[360px] max-w-7xl gap-8 px-6 py-12 sm:grid-cols-[1fr_auto] sm:items-end sm:py-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-lime">Next up: you</p>
            <h2 className="max-w-2xl font-display text-4xl font-bold uppercase leading-[0.9] sm:text-6xl">
              Your clip could be <span className="text-lime">next.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/75 sm:text-base">
              Show up for the run, stay for the rave, and bring your people along.
            </p>
          </div>
          <a
            href="#events"
            className="inline-flex w-fit items-center gap-3 bg-lime px-5 py-3 text-xs font-bold uppercase text-ink transition-colors hover:bg-white"
          >
            Find your next run <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>
      </section>
    </>
  );
}