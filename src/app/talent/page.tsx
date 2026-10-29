import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationForm } from "@/components/application-form";
import { COMMISSION_FREE_DAYS } from "@/data/talent";

export const metadata: Metadata = {
  title: "Talent",
  description: `Join Cadvero — representation for up-and-coming influencers, actors, musicians and presenters. Apply in a minute: no commission for your first ${COMMISSION_FREE_DAYS} days.`,
};

const steps = [
  ["Apply", "Takes a minute. Your name and email are all we need — add a link if you have one."],
  ["We talk", "We review every application ourselves and reply personally, whatever the answer."],
  ["Start working", `Everything booked in your first ${COMMISSION_FREE_DAYS} days is yours, in full.`],
] as const;

export default function TalentPage() {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-8 sm:pt-28">
        <p className="font-mono text-xs uppercase tracking-widest text-signal">Talent</p>
        <h1 className="mt-4 max-w-4xl font-serif text-6xl leading-[0.95] tracking-tight sm:text-8xl">
          Start something <em className="text-signal">here</em>.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          We represent influencers, actors, musicians and presenters at the start of their careers. A
          deliberately small roster, so every client gets our full attention.
        </p>
        <a
          href="#join"
          className="mt-10 inline-block bg-signal px-8 py-4 font-mono text-sm uppercase tracking-widest text-background transition-opacity hover:opacity-90"
        >
          Apply now
        </a>
      </section>

      {/* Join */}
      <section id="join" className="scroll-mt-20 border-y border-line bg-surface">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-8 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
              <span className="on-air inline-block size-2 rounded-full bg-signal" />
              Now accepting applications
            </p>
            <p className="mt-8 font-serif text-7xl leading-none text-signal sm:text-8xl">0%</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
              commission for your first {COMMISSION_FREE_DAYS} days.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-muted">
              We don&apos;t take a cut of anything we book for you in your first{" "}
              {COMMISSION_FREE_DAYS} days with us. We&apos;d rather earn it.
            </p>
            <ol className="mt-12">
              {steps.map(([title, body], i) => (
                <li key={title} className="flex gap-6 border-t border-line py-5 last:border-b">
                  <span className="font-mono text-xs text-signal">0{i + 1}</span>
                  <div>
                    <p className="font-serif text-2xl">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ApplicationForm />
          </div>
        </div>
      </section>

      {/* Roster */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8">
        <div className="border border-line p-10 sm:p-16">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
            <span className="inline-block size-2 rounded-full bg-signal" />
            Private roster
          </p>
          <p className="mt-6 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
            Our roster is private.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            We don&apos;t publish who we represent. It&apos;s shared directly with brands,
            casting directors, producers, labels and promoters on request.
          </p>
          <Link
            href="/#contact"
            className="mt-10 inline-block border border-line px-8 py-4 font-mono text-sm uppercase tracking-widest transition-colors hover:border-foreground"
          >
            Request the roster
          </Link>
        </div>
      </section>
    </main>
  );
}
