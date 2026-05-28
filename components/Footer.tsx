export default function Footer() {
  return (
    <footer className="mt-24 border-t border-navy/10 bg-cream">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-lime font-display text-base font-bold">
            h
          </span>
          <span className="font-display text-lg font-bold text-navy">
            hoogah
          </span>
        </div>
        <p className="max-w-md text-sm text-navy/60">
          Hoogah pairs the right people in every room. Reserve a seat and get
          matched before you even arrive.
        </p>
        <p className="text-xs text-navy/40">
          © {new Date().getFullYear()} Hoogah. Prototype.
        </p>
      </div>
    </footer>
  );
}
