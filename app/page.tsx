import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import { getUpcomingEvents } from "@/lib/events";

export default function Home() {
  const events = getUpcomingEvents();

  return (
    <>
      <Nav />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-cream to-white" />
          <div className="mx-auto max-w-6xl px-5 pb-10 pt-16 sm:px-8 sm:pt-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-navy/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-magenta">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              Hoogah live events
            </span>

            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-tight text-navy sm:text-6xl">
              Rooms worth
              <br />
              showing up for.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-navy/70">
              Live, intentional virtual events where Hoogah matches you with the
              right people before you even arrive. Reserve a seat below — the
              join link lands in your inbox 30 minutes before.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-navy/60">
              <span className="flex items-center gap-2">
                <span className="text-lg">🎯</span> Curated matches
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg">💬</span> AI icebreakers
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg">📍</span> 100% virtual
              </span>
            </div>
          </div>
        </section>

        {/* Events grid */}
        <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-navy">
              Upcoming events
            </h2>
            <span className="text-sm text-navy/50">
              {events.length} happening soon
            </span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <div
                key={event.slug}
                className="animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
