import Image from "next/image";
import { Calendar, Clock, Timer, Video, Check, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RegisterPanel from "@/components/RegisterPanel";
import { events, getEvent, formatDateParts } from "@/lib/events";
import { getEventIcon } from "@/lib/eventIcons";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return { title: "Event not found — Hoogah Events" };
  return {
    title: `${event.title} — Hoogah Events`,
    description: event.tagline,
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const { weekday, fullDate, time } = formatDateParts(event.startISO);
  const Icon = getEventIcon(event.slug);

  return (
    <>
      <Nav />

      <main className="mx-auto max-w-6xl px-5 pb-16 pt-8 sm:px-8">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-navy/60 transition-colors hover:text-magenta"
        >
          <span aria-hidden>←</span> All events
        </Link>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* LEFT: content */}
          <article className="lg:col-span-2">
            {/* Cover: photo under brand wash */}
            <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-3xl sm:h-80">
              <Image
                src={event.image}
                alt=""
                fill
                priority
                sizes="(max-width:1024px) 100vw, 760px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-navy/70 via-navy/30 to-magenta/55" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/45 via-transparent to-transparent" />
              <Icon
                className="relative h-16 w-16 text-cream drop-shadow-lg"
                strokeWidth={1.5}
              />
              <span className="absolute left-5 top-5 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy shadow-sm">
                {event.category}
              </span>
            </div>

            <h1 className="mt-7 font-display text-3xl font-bold leading-tight tracking-tight text-navy sm:text-4xl">
              {event.title}
            </h1>
            <p className="mt-3 text-lg text-navy/70">{event.tagline}</p>

            {/* Meta row */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 rounded-2xl border border-navy/10 bg-white px-5 py-4 text-sm">
              <Meta icon={Calendar} value={`${weekday}, ${fullDate}`} />
              <Meta icon={Clock} value={`${time} ${event.tz}`} />
              <Meta icon={Timer} value={`${event.durationMins} min`} />
              <Meta icon={Video} value={event.format} />
            </div>

            {/* About */}
            <Section title="About this event">
              <div className="space-y-4 text-[15px] leading-relaxed text-navy/80">
                {event.about.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Section>

            {/* Takeaways */}
            <Section title="What you'll walk away with">
              <ul className="space-y-3">
                {event.takeaways.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 text-[15px] text-navy/80">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-navy">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Agenda */}
            <Section title="Run of show">
              <ol>
                {event.agenda.map((a, i) => (
                  <li key={i} className="flex gap-4 pb-6 last:pb-0">
                    {/* rail: dot stays centered on the connector line */}
                    <div className="relative flex w-3 shrink-0 justify-center">
                      {i < event.agenda.length - 1 && (
                        <span className="absolute left-1/2 top-1.5 -bottom-6 w-px -translate-x-1/2 bg-navy/15" />
                      )}
                      <span className="relative z-10 mt-1 h-3 w-3 rounded-full border-2 border-magenta bg-cream" />
                    </div>
                    <div className="flex-1">
                      <span className="font-display text-sm font-bold text-magenta">
                        {a.time}
                      </span>
                      <p className="text-[15px] text-navy/80">{a.label}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Section>

            {/* Note */}
            <div className="mt-10 rounded-2xl bg-navy/5 px-5 py-4 text-sm text-navy/70">
              This is a virtual event. Once you register, the join link is
              emailed and texted to you 30 minutes before the start time, and it
              also appears on your confirmation page.
            </div>
          </article>

          {/* RIGHT: sticky register */}
          <aside className="lg:col-span-1">
            <RegisterPanel event={event} />
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

function Meta({ icon: Icon, value }: { icon: LucideIcon; value: string }) {
  return (
    <span className="flex items-center gap-2 text-navy/75">
      <Icon className="h-4 w-4 text-magenta" />
      <span className="font-medium">{value}</span>
    </span>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-4 font-display text-xl font-bold text-navy">{title}</h2>
      {children}
    </section>
  );
}
