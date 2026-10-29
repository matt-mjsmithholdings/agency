import { cacheLife } from "next/cache";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link href="/" className="font-serif text-xl">
          Cadvero
        </Link>
        <div className="grid gap-2 sm:max-w-xl sm:text-right">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">
            © <CurrentYear /> Cadvero. Exclusive representation for up-and-coming talent.
          </p>
          <p className="text-xs leading-relaxed text-muted">
            Cadvero is owned by MJ Smith Holdings, a private company focused on building and
            stewarding enduring value. Company number 16119280.
          </p>
        </div>
      </div>
    </footer>
  );
}

async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
