"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { HoogahEvent, formatDateParts, priceLabel } from "@/lib/events";

type Props = {
  event: HoogahEvent;
  open: boolean;
  onClose: () => void;
};

type Errors = Partial<Record<"name" | "email" | "phone", string>>;

export default function RegisterModal({ event, open, onClose }: Props) {
  const router = useRouter();
  const { fullDate, time } = formatDateParts(event.startISO);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);

  // Lock body scroll while open + close on Escape
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  function validate(): boolean {
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Enter a valid email address.";
    if (phone.replace(/\D/g, "").length < 8)
      next.phone = "Enter a valid phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    // Prototype: persist locally instead of hitting a backend.
    try {
      const record = {
        event: event.slug,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        at: new Date().toISOString(),
      };
      const key = "hoogah_registrations";
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      existing.push(record);
      localStorage.setItem(key, JSON.stringify(existing));
      localStorage.setItem(`hoogah_reg_${event.slug}`, JSON.stringify(record));
    } catch {
      // ignore storage errors in prototype
    }

    const params = new URLSearchParams({ name: name.trim() });
    router.push(`/events/${event.slug}/registered?${params.toString()}`);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-navy/40 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="animate-pop-in scroll-slim flex max-h-[92vh] w-full max-w-md flex-col overflow-y-auto rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative border-b border-navy/10 px-6 pb-5 pt-6">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-navy/50 transition-colors hover:bg-navy/5 hover:text-navy"
          >
            ✕
          </button>
          <p className="text-xs font-semibold uppercase tracking-wider text-magenta">
            Reserve your seat
          </p>
          <h2 className="mt-1 font-display text-xl font-bold leading-snug text-navy">
            {event.title}
          </h2>
          <p className="mt-2 text-sm text-navy/60">
            {fullDate} · {time} {event.tz}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-6">
          <Field
            label="Full name"
            value={name}
            onChange={setName}
            placeholder="Khushi Yadav"
            error={errors.name}
            autoFocus
          />
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@email.com"
            error={errors.email}
          />
          <Field
            label="Phone number"
            type="tel"
            value={phone}
            onChange={setPhone}
            placeholder="+91 98765 43210"
            error={errors.phone}
            hint="We text the join link 30 minutes before."
          />

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-magenta px-6 py-3.5 text-base font-semibold text-cream shadow-sm transition-all hover:bg-magenta-600 disabled:opacity-70"
          >
            {submitting
              ? "Reserving…"
              : `Confirm registration · ${priceLabel(event.price)}`}
          </button>

          <p className="text-center text-xs text-navy/45">
            No spam. Just your join link and a reminder.
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  hint,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  hint?: string;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-navy">
        {label}
      </span>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-magenta focus:ring-2 focus:ring-magenta/20 ${
          error ? "border-magenta" : "border-navy/15"
        }`}
      />
      {error ? (
        <span className="mt-1 block text-xs font-medium text-magenta">
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-navy/45">{hint}</span>
      ) : null}
    </label>
  );
}
