
export default function Header() {
  return (
    
    <header className="sticky top-0 z-10 border-b border-line bg-paper/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="font-display text-xl font-bold">
          SQUAD9<span className="text-lime">.</span>
        </div>
        <nav className="hidden gap-7 text-sm text-ink-dim sm:flex">
          <a href="#flow" className="hover:text-ink">What to Expect</a>
          <a href="#events" className="hover:text-ink">Events</a>
          <a href="#gallery" className="hover:text-ink">Gallery</a>
        </nav>
        <a
          href="/book"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-paper"
        >
          Join a run
        </a>
      
      </div>
    </header>
  );
}