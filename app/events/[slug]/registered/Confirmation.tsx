"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { getEvent, formatDateParts } from "@/lib/events";

export default function Confirmation() {
  const params = useParams<{ slug: string }>();
  const search = useSearchParams();
  const event = getEvent(params.slug);
  const name = search.get("name")?.trim();

  if (!event) {
    return (
      <main className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold text-navy">
          Event not found
        </h1>
        <Link href="/" className="mt-4 inline-block text-magenta underline">
          Back to events
        </Link>
      </main>
    );
  }

  const { fullDate, time } = formatDateParts(event.startISO);
  const firstName = name ? name.split(" ")[0] : null;

  return (
    <main className="mx-auto max-w-2xl px-5 py-12 sm:py-16">
      {/* Success */}
      <div className="animate-pop-in flex flex-col items-center text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-lime text-3xl shadow-sm">
          ✓
        </div>
        <span className="mt-6 text-xs font-semibold uppercase tracking-wider text-magenta">
          You're registered
        </span>
        <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
          {firstName ? `See you there, ${firstName}.` : "See you there."}
        </h1>
        <p className="mt-3 max-w-md text-navy/70">
          Your seat for <strong className="text-navy">{event.title}</strong> is
          locked in. Here's everything you need.
        </p>
      </div>

      {/* Event summary */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-navy/10 bg-white shadow-sm">
        <div className="relative flex items-center gap-4 overflow-hidden px-6 py-6">
          <Image
            src={event.image}
            alt=""
            fill
            sizes="(max-width:768px) 100vw, 640px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/55 to-magenta/75" />
          <span className="relative text-4xl drop-shadow">{event.glyph}</span>
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-wider text-cream/80">
              {event.category}
            </p>
            <h2 className="font-display text-lg font-bold text-cream">
              {event.title}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-3">
          <Fact label="Date" value={fullDate} />
          <Fact label="Time" value={`${time} ${event.tz}`} />
          <Fact label="Where" value={event.format} />
        </div>
      </div>

      {/* What happens next */}
      <div className="mt-6 rounded-3xl border border-navy/10 bg-cream p-6">
        <h3 className="font-display text-lg font-bold text-navy">
          What happens next
        </h3>
        <ul className="mt-4 space-y-4">
          <Step
            icon="📧"
            title="Confirmation email on its way"
            body="A confirmation with the event details just landed in your inbox."
          />
          <Step
            icon="⏰"
            title="Join link 30 minutes before"
            body="We email and text you the link to join 30 minutes before the event starts — so it's impossible to miss."
          />
          <Step
            icon="🔗"
            title="It'll also show up right here"
            body="Bookmark this page. The live join link unlocks below when the room is about to open."
          />
        </ul>
      </div>

      {/* Join link placeholder */}
      <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-navy/20 bg-white px-6 py-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 text-xl">
          🔒
        </span>
        <p className="mt-3 font-semibold text-navy">Join link locked</p>
        <p className="mt-1 max-w-sm text-sm text-navy/60">
          Your link to the virtual room appears here 30 minutes before{" "}
          {time} {event.tz}. We'll also send it to your email and phone.
        </p>
        <button
          disabled
          className="mt-5 cursor-not-allowed rounded-full bg-navy/15 px-6 py-3 text-sm font-semibold text-navy/50"
        >
          Join room — opens 30 min before
        </button>
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-full bg-navy px-6 py-3 text-sm font-semibold text-cream transition-transform hover:scale-[1.02]"
        >
          Browse more events
        </Link>
        <Link
          href={`/events/${event.slug}`}
          className="rounded-full border border-navy/15 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:bg-white"
        >
          View event details
        </Link>
      </div>
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-navy/45">{label}</p>
      <p className="mt-0.5 font-medium text-navy">{value}</p>
    </div>
  );
}

function Step({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lg shadow-sm">
        {icon}
      </span>
      <div>
        <p className="font-semibold text-navy">{title}</p>
        <p className="text-sm text-navy/65">{body}</p>
      </div>
    </li>
  );
}
