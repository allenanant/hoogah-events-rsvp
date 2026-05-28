import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex max-w-xl flex-col items-center px-5 py-28 text-center">
        <span className="text-5xl">🤷</span>
        <h1 className="mt-6 font-display text-3xl font-bold text-navy">
          That event slipped away
        </h1>
        <p className="mt-3 text-navy/65">
          The event you're looking for isn't here. Check out what's coming up
          instead.
        </p>
        <Link
          href="/"
          className="mt-7 rounded-full bg-magenta px-6 py-3 text-sm font-semibold text-cream transition-transform hover:scale-[1.02]"
        >
          See upcoming events
        </Link>
      </main>
      <Footer />
    </>
  );
}
