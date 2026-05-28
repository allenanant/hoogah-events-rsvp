"use client";

import { useState } from "react";
import {
  HoogahEvent,
  formatDateParts,
  priceLabel,
  spotsLeft,
} from "@/lib/events";
import RegisterModal from "./RegisterModal";
import { Calendar, Clock, Timer, type LucideIcon } from "lucide-react";

export default function RegisterPanel({ event }: { event: HoogahEvent }) {
  const [open, setOpen] = useState(false);
  const { fullDate, time } = formatDateParts(event.startISO);
  const left = spotsLeft(event);
  const pct = Math.min(100, Math.round((event.registered / event.capacity) * 100));

  return (
    <>
      <div className="lg:sticky lg:top-24">
        <div className="rounded-3xl border border-navy/10 bg-white p-6 shadow-sm">
          <div className="flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-navy">
              {priceLabel(event.price)}
            </span>
            <span className="rounded-full bg-lime/30 px-3 py-1 text-xs font-semibold text-navy">
              {event.format}
            </span>
          </div>

          <dl className="mt-6 space-y-4 text-sm">
            <Row icon={Calendar} label="Date" value={fullDate} />
            <Row icon={Clock} label="Time" value={`${time} ${event.tz}`} />
            <Row
              icon={Timer}
              label="Duration"
              value={`${event.durationMins} minutes`}
            />
          </dl>

          {/* Capacity */}
          <div className="mt-6">
            <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
              <span className="text-navy/60">{event.registered} registered</span>
              <span className={left <= 10 ? "text-magenta" : "text-navy/50"}>
                {left > 0 ? `${left} spots left` : "Full — join waitlist"}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-navy/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-magenta to-navy"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="mt-6 w-full rounded-full bg-magenta px-6 py-3.5 text-base font-semibold text-cream shadow-sm transition-all hover:bg-magenta-600 hover:scale-[1.01]"
          >
            {left > 0 ? "Register now" : "Join the waitlist"}
          </button>

          <p className="mt-3 text-center text-xs text-navy/45">
            Free to cancel anytime. Join link sent 30 min before.
          </p>
        </div>

        {/* Reassurance card */}
        <div className="mt-4 rounded-3xl border border-navy/10 bg-navy p-5 text-cream">
          <p className="text-sm font-semibold">How Hoogah matches you</p>
          <p className="mt-1.5 text-sm text-cream/70">
            Answer a couple of quick questions after you register. We pair you
            with the right people and hand you AI icebreakers before the room
            opens.
          </p>
        </div>
      </div>

      <RegisterModal event={event} open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-magenta" />
      <div>
        <dt className="text-xs uppercase tracking-wide text-navy/45">{label}</dt>
        <dd className="font-medium text-navy">{value}</dd>
      </div>
    </div>
  );
}
