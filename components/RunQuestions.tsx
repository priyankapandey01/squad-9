const questions = [
  {
    question: "Do I need to be a regular runner?",
    answer: "Not at all. Every pace is welcome, and the group runs an easy-paced 3K together.",
  },
  {
    question: "When is the next run?",
    answer: "We meet Sunday at 7:00 AM.",
  },
  {
    question: "Where do we meet?",
    answer: "Runs are in Noida. We share the exact venue on Friday before each run.",
  },
  {
    question: "What happens after the run?",
    answer: "Stick around for games, music, and the post-run rave.",
  },
];

export default function RunQuestions() {
  return (
    <section aria-labelledby="run-questions-title" className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-10 sm:grid-cols-[0.8fr_1.2fr] sm:gap-12 sm:py-14">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-magenta">
            Before you join
          </p>
          <h2 id="run-questions-title" className="font-display text-3xl font-bold sm:text-4xl">
            First run? You&apos;re in the right place.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-ink-dim">
            A few quick answers to help you feel ready to show up.
          </p>
        </div>

        <div>
          {questions.map(({ question, answer }) => (
            <details key={question} className="group border-b border-line py-4 first:border-t">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold marker:hidden">
                {question}
                <span aria-hidden="true" className="text-xl font-normal text-magenta transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="max-w-lg pr-8 pt-3 text-sm leading-6 text-ink-dim">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}