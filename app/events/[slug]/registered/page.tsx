import { Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { events } from "@/lib/events";
import Confirmation from "./Confirmation";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default function RegisteredPage() {
  return (
    <>
      <Nav />
      <Suspense
        fallback={
          <div className="py-24 text-center text-navy/50">Loading…</div>
        }
      >
        <Confirmation />
      </Suspense>
      <Footer />
    </>
  );
}
