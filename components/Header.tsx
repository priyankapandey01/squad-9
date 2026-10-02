
export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <a href="/" className="flex items-center gap-2 sm:gap-3">
          <span className="font-display text-xl font-bold leading-none sm:text-2xl">
            SQUAD9<span className="text-magenta">.</span>
          </span>
          <span className="border-l border-line pl-2 text-[9px] font-semibold uppercase leading-tight text-ink-dim sm:pl-3 sm:text-[10px]">
            Run club
            <br />
            Noida, India
          </span>
        </a>
        <nav className="hidden gap-7 text-xs font-semibold uppercase text-ink-dim sm:flex">
          <a href="#activities" className="transition-colors hover:text-ink">The club</a>
          <a href="#events" className="transition-colors hover:text-ink">Runs</a>
          <a href="#gallery" className="transition-colors hover:text-ink">Field notes</a>
        </nav>
        <a
          href="/book"
          className="bg-ink px-3 py-2 text-[11px] font-bold uppercase text-paper transition-colors hover:bg-magenta sm:px-4 sm:text-xs"
        >
          Join a run
        </a>
      </div>
    </header>
  );
}