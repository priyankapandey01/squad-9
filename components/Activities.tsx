const cards = [
  {
    tag: "Show Up First ",
    title: "We Run Together",
    body: "An easy-paced 3K through downtown, built for first-timers and regulars who just want to move together.",
  },
  {
    tag: "THEN",
    title: "Play Hard",
    body: "From fitness challenges to crazy games, the fun doesn't stop when the run ends.",
  },
  {
    tag: "FINALLY",
    title: "Rave Harder",
    body: "The best part? We turn the post-run energy into music, dancing and a full-on rave.",
  },
];

export default function Activities() {
  return (
    <section id="activities" className="border-y border-white/10 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-lime">More than miles</p>
            <h2 className="font-display text-4xl font-bold uppercase sm:text-5xl">Every pace. One squad.</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/65">
            A community that believes every pace has a place.
          </p>
        </div>
        <div className="grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {cards.map((c, index) => (
            <div key={c.title} className="py-6 sm:px-6 sm:py-2 first:sm:pl-0 last:sm:pr-0">
              <div className="mb-7 flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-magenta">{c.tag}</span>
                <span className="font-display text-4xl font-bold leading-none text-lime/80">0{index + 1}</span>
              </div>
              <h3 className="font-display text-2xl font-bold uppercase">{c.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-white/65">{c.body}</p>
            </div>
        ))}
        </div>
      </div>
    </section>
  );
}
