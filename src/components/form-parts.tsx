import type { ReactNode } from "react";

export const fieldClass =
  "w-full border-b border-line bg-transparent py-3 text-lg text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-signal";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="grid gap-1">
      <span className="flex items-baseline justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted">
        {label}
        {hint && <span className="normal-case tracking-normal text-muted/70">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

/** Hidden from people; bots that fill it in are quietly ignored by the server action. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

/** A row of radio buttons styled as chips. The first option is selected by default. */
export function Choices({
  legend,
  name,
  options,
}: {
  legend: string;
  name: string;
  options: readonly (readonly [value: string, label: string])[];
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{legend}</legend>
      <div className="flex flex-wrap gap-3">
        {options.map(([value, label], i) => (
          <label key={value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={value}
              defaultChecked={i === 0}
              className="peer sr-only"
            />
            <span className="inline-block border border-line px-4 py-2 text-sm text-muted transition-colors peer-checked:border-signal peer-checked:text-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-signal hover:text-foreground">
              {label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function SubmitRow({
  pending,
  idleLabel,
  pendingLabel,
  error,
}: {
  pending: boolean;
  idleLabel: string;
  pendingLabel: string;
  error?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <button
        type="submit"
        disabled={pending}
        className="bg-signal px-8 py-4 font-mono text-sm uppercase tracking-widest text-background transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? pendingLabel : idleLabel}
      </button>
      {error && (
        <p role="alert" className="text-sm text-signal">
          {error}
        </p>
      )}
    </div>
  );
}

export function Received({ message }: { message?: string }) {
  return (
    <div className="border border-line bg-surface p-8" role="status">
      <p className="font-serif text-3xl">Received.</p>
      <p className="mt-3 text-muted">{message}</p>
    </div>
  );
}
