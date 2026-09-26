const events = [
  { date: "Oct 5", title: "Sunday Run + Rave", place: "Venue drops Friday - Noida - 3km" },
  { date: "Oct 12", title: "Sunday Run + Rave", place: "Venue drops Friday - Noida - 3km" },
  { date: "Oct 19", title: "Sunday Run + Rave", place: "Venue drops Friday - Noida - 3km" },
];

export default function Events() {
  return (
    <section id="events" className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Upcoming Sundays</h2>
        <p className="max-w-xs text-sm text-ink-dim">Show up in trainers, leave in whatever you dance best in.</p>
      </div>
      <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line">
        {events.map((e) => (
          <div
            key={e.date}
            className="grid grid-cols-1 items-center gap-3 bg-white px-6 py-5 sm:grid-cols-[90px_1fr_auto] sm:gap-5"
          >
            <div className="font-display text-sm text-lime">{e.date}</div>
            <div>
              <h3 className="text-base font-medium">{e.title}</h3>
              <div className="mt-0.5 text-sm text-ink-dim">{e.place}</div>
            </div>
            <a href="/book" className="w-max rounded-full border border-line px-4 py-2 text-xs">
              Reserve spot
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}