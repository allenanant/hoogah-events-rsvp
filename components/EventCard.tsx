import Link from "next/link";
import {
  HoogahEvent,
  formatDateParts,
  priceLabel,
  spotsLeft,
} from "@/lib/events";

export default function EventCard({ event }: { event: HoogahEvent }) {
  const { weekday, month, day, time } = formatDateParts(event.startISO);
  const left = spotsLeft(event);
  const almostFull = left <= 10;

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Cover */}
      <div
        className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${event.cover}`}
      >
        <span className="text-5xl drop-shadow-sm">{event.glyph}</span>
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy">
          {event.category}
        </span>
        <span className="absolute right-4 top-4 flex flex-col items-center rounded-xl bg-cream/95 px-3 py-1.5 leading-none shadow-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-magenta">
            {month}
          </span>
          <span className="font-display text-lg font-bold text-navy">{day}</span>
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-medium text-navy/60">
          <span>
            {weekday}, {time} {event.tz}
          </span>
          <span className="text-navy/30">·</span>
          <span>{event.format}</span>
        </div>

        <h3 className="font-display text-lg font-bold leading-snug text-navy transition-colors group-hover:text-magenta">
          {event.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-navy/70">
          {event.tagline}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-navy/10 pt-4">
          <span className="text-sm font-semibold text-navy">
            {priceLabel(event.price)}
          </span>
          <span
            className={`text-xs font-medium ${
              almostFull ? "text-magenta" : "text-navy/50"
            }`}
          >
            {left > 0 ? `${left} spots left` : "Waitlist"}
          </span>
        </div>
      </div>
    </Link>
  );
}
