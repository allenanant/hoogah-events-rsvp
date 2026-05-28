export type Host = {
  name: string;
  role: string;
  bio: string;
  initials: string;
};

export type HoogahEvent = {
  slug: string;
  title: string;
  tagline: string;
  /** Long-form description, split into paragraphs. */
  about: string[];
  /** What attendees walk away with. */
  takeaways: string[];
  /** Rough run of show. */
  agenda: { time: string; label: string }[];
  /** ISO start datetime. */
  startISO: string;
  durationMins: number;
  /** Display timezone label, e.g. "IST". */
  tz: string;
  format: string;
  category: string;
  price: number; // 0 = free
  capacity: number;
  registered: number;
  /** Tailwind gradient classes for the cover. */
  cover: string;
  /** Accent emoji used on the cover. */
  glyph: string;
};

export const events: HoogahEvent[] = [
  {
    slug: "founders-night-build-in-public",
    title: "Founders Night: Building in Public",
    tagline:
      "An honest room of early founders trading what actually moved the needle this month.",
    about: [
      "Most founder events are a wall of polished highlight reels. This one is not. Founders Night is a small, curated virtual room where eight to twelve early-stage founders show up to talk about the messy middle — the launches that flopped, the channel that finally clicked, the hire they got wrong.",
      "Hoogah matches you with two or three people in the room who are close enough to your stage to be useful and different enough to teach you something. You get AI-generated icebreakers before you arrive, so the first five minutes are not awkward small talk.",
      "Come with one real problem you are stuck on. Leave with names, not just notes.",
    ],
    takeaways: [
      "Two to three intro-quality matches you can keep talking to after the call",
      "A live teardown of one bottleneck from your own business",
      "Tactics that worked for founders one step ahead of you",
    ],
    agenda: [
      { time: "0:00", label: "Welcome + how the matching works" },
      { time: "0:10", label: "Round of one-line founder intros" },
      { time: "0:25", label: "Breakout rooms with your matches" },
      { time: "0:50", label: "Open floor: wins, fails, asks" },
      { time: "1:10", label: "Wrap + warm intros exchanged" },
    ],
    startISO: "2026-06-04T19:00:00+05:30",
    durationMins: 75,
    tz: "IST",
    format: "Virtual · Zoom",
    category: "Networking",
    price: 0,
    capacity: 40,
    registered: 27,
    cover: "from-[#1a0a5e] via-[#3a1f8f] to-[#a8198b]",
    glyph: "🌃",
  },
  {
    slug: "the-cold-outreach-room",
    title: "The Cold Outreach Room",
    tagline:
      "A working session on writing first messages people actually reply to.",
    about: [
      "Cold outreach is the highest-leverage skill nobody teaches properly. This is a hands-on virtual workshop where you rewrite your own outreach live, get reactions from the room, and watch real reply rates climb.",
      "We pair you with someone selling to a similar audience so the feedback is sharp. You will leave with three rewritten openers and a simple framework you can reuse for any campaign.",
    ],
    takeaways: [
      "Three rewritten cold openers tuned to your audience",
      "A reusable framework for first-line personalization",
      "A peer accountability partner from the room",
    ],
    agenda: [
      { time: "0:00", label: "The anatomy of a reply-worthy first line" },
      { time: "0:15", label: "Paired teardown of your current message" },
      { time: "0:40", label: "Rewrite sprint" },
      { time: "1:00", label: "Share + vote on the strongest openers" },
    ],
    startISO: "2026-06-09T18:30:00+05:30",
    durationMins: 75,
    tz: "IST",
    format: "Virtual · Zoom",
    category: "Workshop",
    price: 10,
    capacity: 30,
    registered: 19,
    cover: "from-[#a8198b] via-[#c026a0] to-[#1a0a5e]",
    glyph: "✉️",
  },
  {
    slug: "women-in-growth-mixer",
    title: "Women in Growth Mixer",
    tagline:
      "Operators, marketers and founders matched for real conversations, not business cards.",
    about: [
      "A relaxed virtual mixer for women working in growth, marketing and product. No panel, no slides — just a well-matched room.",
      "Hoogah pairs you by what you are working on and what you want to learn, then drops you into small breakouts. Bring a glass of whatever you like and a question worth asking.",
    ],
    takeaways: [
      "Three curated breakout conversations",
      "A short list of people worth following up with",
      "A sense of who in the industry is solving what you are solving",
    ],
    agenda: [
      { time: "0:00", label: "Warm welcome + room vibe" },
      { time: "0:10", label: "First breakout" },
      { time: "0:30", label: "Reshuffle + second breakout" },
      { time: "0:55", label: "Whole-room open mic" },
    ],
    startISO: "2026-06-12T20:00:00+05:30",
    durationMins: 70,
    tz: "IST",
    format: "Virtual · Zoom",
    category: "Networking",
    price: 0,
    capacity: 50,
    registered: 41,
    cover: "from-[#2a1a7a] via-[#a8198b] to-[#c8ff00]",
    glyph: "🥂",
  },
  {
    slug: "ai-tools-show-and-tell",
    title: "AI Tools Show & Tell",
    tagline:
      "Five people, five screens, five tools that quietly changed how they work.",
    about: [
      "A fast, practical session where five attendees demo one AI tool or workflow they actually use every day. No theory, no hype — just real screens and real results.",
      "Between demos, Hoogah matches you with someone using AI in a similar way so you can swap setups. You leave with a running list of tools worth trying tomorrow.",
    ],
    takeaways: [
      "Five field-tested AI workflows you can copy",
      "A matched peer to compare stacks with",
      "A shared doc of every tool mentioned in the room",
    ],
    agenda: [
      { time: "0:00", label: "Intro + format" },
      { time: "0:05", label: "Five lightning demos" },
      { time: "0:40", label: "Matched breakouts: swap your stack" },
      { time: "1:00", label: "Group Q&A" },
    ],
    startISO: "2026-06-17T19:30:00+05:30",
    durationMins: 75,
    tz: "IST",
    format: "Virtual · Zoom",
    category: "Show & Tell",
    price: 10,
    capacity: 35,
    registered: 12,
    cover: "from-[#1a0a5e] via-[#5b2bc2] to-[#a8198b]",
    glyph: "🤖",
  },
  {
    slug: "first-90-days-new-role",
    title: "Your First 90 Days in a New Role",
    tagline:
      "For anyone just starting, about to start, or rethinking how they show up.",
    about: [
      "Starting somewhere new is equal parts exciting and disorienting. This room brings together people in their first ninety days — and a few who just crossed it — to compare notes on landing well.",
      "Hoogah matches you with someone at a similar stage or in a similar function. The conversation is structured enough to be useful and loose enough to be honest.",
    ],
    takeaways: [
      "A simple 30-60-90 framing you can adapt",
      "Honest answers from people one step ahead",
      "A peer to check in with at the 30-day mark",
    ],
    agenda: [
      { time: "0:00", label: "Welcome + why the first 90 matter" },
      { time: "0:10", label: "Matched breakouts" },
      { time: "0:40", label: "Common traps, shared fixes" },
      { time: "1:00", label: "Wrap + accountability pairs" },
    ],
    startISO: "2026-06-23T18:00:00+05:30",
    durationMins: 70,
    tz: "IST",
    format: "Virtual · Zoom",
    category: "Networking",
    price: 0,
    capacity: 45,
    registered: 8,
    cover: "from-[#a8198b] via-[#7a1f9c] to-[#1a0a5e]",
    glyph: "🚀",
  },
  {
    slug: "portfolio-and-pricing-clinic",
    title: "Freelancer Portfolio & Pricing Clinic",
    tagline:
      "Bring your portfolio and your rates. Leave with both sharper.",
    about: [
      "A working clinic for freelancers and independents. Show the room your portfolio or your pricing page, get fast, specific reactions, and rework it on the spot.",
      "Hoogah pairs you with someone in an adjacent craft so feedback is fresh, not echo-chamber. Expect to raise a rate by the end.",
    ],
    takeaways: [
      "Specific edits to your portfolio's first impression",
      "A second opinion on whether you are underpriced",
      "A peer reviewer for future work",
    ],
    agenda: [
      { time: "0:00", label: "What a strong first impression looks like" },
      { time: "0:15", label: "Paired portfolio reviews" },
      { time: "0:40", label: "Pricing gut-check round" },
      { time: "1:00", label: "Share the best reframes" },
    ],
    startISO: "2026-06-27T17:30:00+05:30",
    durationMins: 75,
    tz: "IST",
    format: "Virtual · Zoom",
    category: "Clinic",
    price: 10,
    capacity: 30,
    registered: 22,
    cover: "from-[#2a1a7a] via-[#a8198b] to-[#d83bb8]",
    glyph: "🎨",
  },
];

export function getUpcomingEvents(): HoogahEvent[] {
  return [...events].sort(
    (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime()
  );
}

export function getEvent(slug: string): HoogahEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function spotsLeft(e: HoogahEvent): number {
  return Math.max(0, e.capacity - e.registered);
}

export function formatDateParts(iso: string) {
  const d = new Date(iso);
  const weekday = d.toLocaleDateString("en-US", {
    weekday: "short",
    timeZone: "Asia/Kolkata",
  });
  const month = d.toLocaleDateString("en-US", {
    month: "short",
    timeZone: "Asia/Kolkata",
  });
  const day = d.toLocaleDateString("en-US", {
    day: "numeric",
    timeZone: "Asia/Kolkata",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
  const fullDate = d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  return { weekday, month, day, time, fullDate };
}

export function priceLabel(price: number): string {
  return price === 0 ? "Free" : `$${price}`;
}
