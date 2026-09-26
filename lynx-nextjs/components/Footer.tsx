export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-5">
        <h2 className="max-w-md font-display text-2xl font-bold sm:text-3xl">
          First run&apos;s on us. Bring shoes, we&apos;ll bring the rest.
        </h2>
        <a href="#signup" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper">
          Join the next run
        </a>
      </div>
      <div className="mx-auto mt-10 flex max-w-5xl flex-wrap items-center justify-between gap-4 text-xs text-ink-dim">
        <div className="flex gap-5">
          <a href="#flow">How it works</a>
          <a href="#events">Events</a>
          <a href="#gallery">Gallery</a>
          <a href="#signup">Sign up</a>
        </div>
        <div>© 2026 Lynx Run Club</div>
      </div>
    </footer>
  );
}
