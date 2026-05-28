import Image from "next/image";
import Link from "next/link";
import { getEventIcon } from "@/lib/eventIcons";
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
  const Icon = getEventIcon(event.slug);

  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_-22px_rgba(26,10,94,0.5)]"
    >
      {/* Cover: real photo under Hoogah brand wash */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image}
          alt=""
          fill
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 400px"
          className="object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/70 via-navy/25 to-magenta/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent" />

        <span className="absolute left-4 top-4 rounded-full bg-cream/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy shadow-sm">
          {event.category}
        </span>
        <span className="absolute right-4 top-4 flex flex-col items-center rounded-xl bg-cream/95 px-3 py-1.5 leading-none shadow-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-magenta">
            {month}
          </span>
          <span className="font-display text-lg font-bold text-navy">{day}</span>
        </span>
        <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cream/15 text-cream ring-1 ring-cream/30 backdrop-blur-md">
          <Icon className="h-5 w-5" strokeWidth={2} />
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
        <p className="mt-2 line-clamp-2 text-sm text-navy/70">{event.tagline}</p>

        <div className="mt-5 flex items-center justify-between border-t border-navy/10 pt-4">
          <span className="text-sm font-semibold text-navy">
            {priceLabel(event.price)}
          </span>
          <span
            className={`flex items-center gap-1.5 text-xs font-medium ${
              almostFull ? "text-magenta" : "text-navy/50"
            }`}
          >
            {almostFull && left > 0 && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-magenta" />
            )}
            {left > 0 ? `${left} spots left` : "Waitlist"}
          </span>
        </div>
      </div>
    </Link>
  );
}
