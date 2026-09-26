const events = [
  { date: "Oct 4", title: "City Loop Run", place: "Connaught Place start point · 5K" },
  { date: "Oct 11", title: "Sunrise 10K", place: "Lodhi Garden gate · 10K" },
  { date: "Oct 18", title: "Run & Rave — flagship night", place: "Warehouse venue, TBA · 5K + DJ set" },
];

export default function Events() {
  return (
    <section id="events" className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Upcoming events</h2>
        <p className="max-w-xs text-sm text-ink-dim">Show up in trainers, leave in whatever you dance best in.</p>
      </div>
      <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line">
        {events.map((e) => (
          <div
            key={e.title}
            className="grid grid-cols-1 items-center gap-3 bg-white px-6 py-5 sm:grid-cols-[90px_1fr_auto] sm:gap-5"
          >
            <div className="font-display text-sm text-lime">{e.date}</div>
            <div>
              <h3 className="text-base font-medium">{e.title}</h3>
              <div className="mt-0.5 text-sm text-ink-dim">{e.place}</div>
            </div>
            <a href="#signup" className="w-max rounded-full border border-line px-4 py-2 text-xs">
              Reserve spot
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
