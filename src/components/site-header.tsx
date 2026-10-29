"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const nav = [
  ["What we do", "/#what-we-do"],
  ["Approach", "/#approach"],
  ["Join", "/talent"],
  ["Contact", "/#contact"],
] as const;

const linkClass =
  "font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-8">
        <Link href="/" onClick={close} className="flex items-center gap-3 font-serif text-2xl tracking-tight">
          <Image src="/logo-mark.png" alt="" width={32} height={32} priority className="rounded-sm" />
          Cadvero
        </Link>
        <nav aria-label="Main" className="hidden gap-8 md:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className={linkClass}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/talent#join"
            onClick={close}
            className="border border-line px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:border-signal"
          >
            Apply
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
            className="px-2 py-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-foreground md:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-line/60 md:hidden">
          <ul className="mx-auto grid max-w-7xl px-4 py-2">
            {nav.map(([label, href]) => (
              <li key={href}>
                <Link href={href} onClick={close} className={`block py-3 ${linkClass}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
