const cards = [
  {
    tag: "SUNDAY ",
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
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Pick your pace, pick your crew</h2>
        <p className="max-w-xs text-sm text-ink-dim">Different formats for different kinds of tired.</p>
      </div>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="bg-white p-6">
            <span className="mb-3 block text-xs font-medium text-lime">{c.tag}</span>
            <h3 className="text-lg font-medium">{c.title}</h3>
            <p className="mt-2 text-sm text-ink-dim">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
