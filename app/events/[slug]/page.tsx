import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RegisterPanel from "@/components/RegisterPanel";
import { events, getEvent, formatDateParts } from "@/lib/events";

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
              <div className="absolute inset-0 bg-gradient-to-br from-navy/85 via-navy/45 to-magenta/70" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent" />
              <span className="relative text-7xl drop-shadow-lg">
                {event.glyph}
              </span>
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
              <Meta icon="📅" value={`${weekday}, ${fullDate}`} />
              <Meta icon="🕖" value={`${time} ${event.tz}`} />
              <Meta icon="⏱️" value={`${event.durationMins} min`} />
              <Meta icon="📍" value={event.format} />
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
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lime text-[11px] font-bold text-navy">
                      ✓
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </Section>

            {/* Agenda */}
            <Section title="Run of show">
              <ol className="relative border-l border-navy/15 pl-6">
                {event.agenda.map((a, i) => (
                  <li key={i} className="relative pb-5 last:pb-0">
                    <span className="absolute -left-[27px] top-1 flex h-3 w-3 items-center justify-center rounded-full border-2 border-magenta bg-cream" />
                    <span className="font-display text-sm font-bold text-magenta">
                      {a.time}
                    </span>
                    <p className="text-[15px] text-navy/80">{a.label}</p>
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

function Meta({ icon, value }: { icon: string; value: string }) {
  return (
    <span className="flex items-center gap-2 text-navy/75">
      <span>{icon}</span>
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
