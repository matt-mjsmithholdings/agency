import Link from "next/link";
import { EnquiryForm } from "@/components/enquiry-form";
import { COMMISSION_FREE_DAYS } from "@/data/talent";

const channels = [
  "TikTok",
  "Instagram",
  "YouTube",
  "Brand partnerships",
  "Film",
  "Television",
  "Music",
  "Live",
  "Theatre",
  "Streaming",
];

const disciplines = [
  {
    title: "Social",
    lede: "Influencers and creators — audiences built online, turned into careers that last beyond any one platform.",
    points: [
      "Brand partnerships negotiated on long-term value",
      "Platform strategy across TikTok, Instagram and YouTube",
      "TV, presenting and hosting opportunities",
    ],
  },
  {
    title: "Screen",
    lede: "Film, television, streaming and commercials — roles chosen for where they lead.",
    points: [
      "Auditions through direct relationships with casting",
      "Contracts, billing and rights",
      "Showreel, headshots and Spotlight",
    ],
  },
  {
    title: "Stage",
    lede: "Fringe to West End. The work that builds a performer, and the reputation that follows.",
    points: [
      "New writing through to major revivals",
      "Workshops, readings and development",
      "Voice, audiobook and radio drama",
    ],
  },
  {
    title: "Music",
    lede: "Artists, bands and songwriters — from first release to first headline show.",
    points: [
      "Live bookings, support slots and festivals",
      "Sync placements across film, TV and ads",
      "Release planning and label conversations",
    ],
  },
];

const principles = [
  {
    title: "Small by design",
    body: "We keep our roster deliberately small. Every client is someone we put forward personally.",
  },
  {
    title: "Early, on purpose",
    body: "We look for people at the start of their careers — influencers, actors, musicians and presenters with something about them — and build from there.",
  },
  {
    title: "Long-term by default",
    body: "We turn down work that pays today and costs tomorrow. A career is built on the right moves in the right order.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-8 sm:pt-32">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
          <span className="on-air inline-block size-2 rounded-full bg-signal" />
          Exclusive representation — Up-and-coming talent
        </p>
        <h1 className="mt-8 max-w-5xl font-serif text-6xl leading-[0.95] tracking-tight sm:text-8xl lg:text-9xl">
          Talent on the <em className="text-signal">way up</em>.
        </h1>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          Cadvero represents a select roster of up-and-coming influencers, actors, musicians and
          presenters — across social, screen, stage and music.
        </p>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/talent#join"
            className="bg-signal px-8 py-4 font-mono text-sm uppercase tracking-widest text-background transition-opacity hover:opacity-90"
          >
            Join the roster
          </Link>
          <a
            href="#what-we-do"
            className="border border-line px-8 py-4 font-mono text-sm uppercase tracking-widest transition-colors hover:border-foreground"
          >
            What we do
          </a>
        </div>
        <p className="mt-6 text-sm text-muted">
          No commission for your first {COMMISSION_FREE_DAYS} days.
        </p>
      </section>

      {/* Channel marquee */}
      <div className="overflow-hidden border-y border-line py-6" aria-hidden>
        <div className="marquee flex w-max gap-12 whitespace-nowrap">
          {[...channels, ...channels].map((c, i) => (
            <span key={i} className="flex items-center gap-12 font-serif text-3xl text-muted">
              {c}
              <span className="size-1.5 rounded-full bg-signal" />
            </span>
          ))}
        </div>
      </div>

      {/* What we do */}
      <section id="what-we-do" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">01 — What we do</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">
            One agent, <em>every</em> stage of the journey.
          </h2>
          <div className="mt-16 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((d, i) => (
              <article key={d.title} className="flex flex-col bg-background p-8">
                <p className="font-mono text-xs text-signal">0{i + 1}</p>
                <h3 className="mt-3 font-serif text-4xl">{d.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{d.lede}</p>
                <ul className="mt-8 grid gap-3 border-t border-line pt-6 text-sm">
                  {d.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-signal" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="scroll-mt-20 border-b border-line bg-surface">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-signal">02 — Approach</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">
            Fewer clients. <em>More</em> of everything that matters.
          </h2>
          <div className="mt-16 grid gap-px bg-line md:grid-cols-3">
            {principles.map((p) => (
              <article key={p.title} className="bg-surface py-8 md:px-8 md:first:pl-0">
                <h3 className="font-serif text-3xl">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Join banner */}
      <section className="border-b border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-signal">03 — Join</p>
            <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-tight sm:text-6xl">
              <span className="text-signal">0%</span> commission for your first{" "}
              {COMMISSION_FREE_DAYS} days.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Applying takes a minute. If we take you on, everything we book for you in your first{" "}
              {COMMISSION_FREE_DAYS} days is yours, in full.
            </p>
          </div>
          <Link
            href="/talent#join"
            className="shrink-0 self-start bg-signal px-8 py-4 font-mono text-sm uppercase tracking-widest text-background transition-opacity hover:opacity-90 lg:self-auto"
          >
            Apply now
          </Link>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-24 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-widest text-signal">04 — Contact</p>
            <h2 className="mt-4 font-serif text-5xl sm:text-6xl">Work with our talent.</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Brands, casting directors, producers, labels and promoters — every enquiry is read by
              a person.
            </p>
            <p className="mt-4 max-w-md text-muted">
              Looking for representation?{" "}
              <Link
                href="/talent#join"
                className="text-foreground underline decoration-line underline-offset-4 transition-colors hover:decoration-signal"
              >
                Apply here
              </Link>
              .
            </p>
            <a
              href="mailto:hello@cadvero.com"
              className="mt-8 inline-block font-serif text-2xl underline decoration-line underline-offset-8 transition-colors hover:decoration-signal"
            >
              hello@cadvero.com
            </a>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </main>
  );
}
