import Link from "next/link";

export default function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-navy/10 bg-cream/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-lime font-display text-lg font-bold leading-none">
            h
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-navy">
            hoogah
          </span>
          <span className="ml-1 hidden rounded-full bg-magenta/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-magenta sm:inline">
            Events
          </span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-navy/70">
          <Link
            href="/"
            className="hidden transition-colors hover:text-navy sm:inline"
          >
            Upcoming
          </Link>
          <a
            href="https://hoogah.co"
            className="hidden transition-colors hover:text-navy sm:inline"
          >
            About Hoogah
          </a>
          <Link
            href="/"
            className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-cream transition-transform hover:scale-[1.03]"
          >
            Browse events
          </Link>
        </nav>
      </div>
    </header>
  );
}
