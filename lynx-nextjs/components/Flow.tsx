const steps = [
  {
    time: "7:00",
    title: "The run",
    body: "A paced group run through the city, splits for different levels, pacers up front and at the back so no one's left chasing a stranger's shadow.",
  },
  {
    time: "8:15",
    title: "Fitness circuit",
    body: "A short mobility and strength block to bring the heart rate back down without letting the energy drop — mats out, lights low.",
  },
  {
    time: "9:00",
    title: "The rave",
    body: "DJ set, drinks, and a dance floor for everyone who just ran a 10K and isn't ready to go home yet.",
  },
];

export default function Flow() {
  return (
    <section id="flow" className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">One night, three gears</h2>
        <p className="max-w-xs text-sm text-ink-dim">
          Every Lynx event moves through the same arc — effort, release, rhythm.
        </p>
      </div>
      <div>
        {steps.map((s) => (
          <div key={s.time} className="grid grid-cols-[70px_1fr] gap-5 border-t border-line py-7 last:border-b sm:grid-cols-[90px_1fr]">
            <div className="pt-0.5 font-display text-sm text-magenta">{s.time}</div>
            <div>
              <h3 className="text-lg font-medium">{s.title}</h3>
              <p className="mt-1.5 max-w-lg text-sm text-ink-dim">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
