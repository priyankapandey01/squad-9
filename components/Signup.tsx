export default function Signup() {
  return (
    <section id="signup" className="mx-auto max-w-5xl px-6 py-4">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Sign up for the next one</h2>
        <p className="max-w-xs text-sm text-ink-dim">Fill the form below to lock in your spot.</p>
      </div>
      <div className="overflow-hidden rounded-2xl border border-line bg-white">
        <div className="border-b border-line px-6 py-4 text-sm text-ink-dim">
          <strong className="text-ink">Swap this in:</strong> replace the iframe{" "}
          <code>src</code> below with your own Google Form&apos;s embed link
          (Form → Send → embed <code>&lt;&gt;</code> icon → copy the src URL).
        </div>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSeyUCWCMxHW9BDa22Owo3O0UYYjCpXkjzUAfQ4m18x0N2kB_Q/viewform?usp=send_form&pli=1&authuser=0"
          title="Lynx event signup form"
          className="h-[900px] w-full overflow-hidden"
        >
          Loading…
        </iframe>
      </div>
    </section>
  );
}
