"use client";

import { useActionState } from "react";
import { submitApplication, type FormState } from "@/app/actions";
import { Choices, Field, Honeypot, Received, SubmitRow, fieldClass } from "@/components/form-parts";

const initialState: FormState = { status: "idle" };

const kinds = [
  ["influencer", "Influencer / creator"],
  ["actor", "Actor"],
  ["musician", "Musician"],
  ["presenter", "Presenter"],
  ["other", "Something else"],
] as const;

export function ApplicationForm() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);

  if (state.status === "success") return <Received message={state.message} />;

  return (
    <form action={formAction} className="relative grid gap-8">
      <Honeypot />
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Name">
          <input name="name" required autoComplete="name" className={fieldClass} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </Field>
      </div>

      <Choices legend="I'm a" name="kind" options={kinds} />

      <Field label="Show us your work" hint="Optional">
        <textarea
          name="link"
          rows={2}
          maxLength={500}
          placeholder="Links or a few words — TikTok, Instagram, YouTube, showreel, Spotify…"
          className={`${fieldClass} resize-none`}
        />
      </Field>

      <Field label="Anything we should know" hint="Optional">
        <textarea name="about" rows={3} maxLength={2000} className={`${fieldClass} resize-none`} />
      </Field>

      <SubmitRow
        pending={pending}
        idleLabel="Apply now"
        pendingLabel="Sending…"
        error={state.status === "error" ? state.message : undefined}
      />
    </form>
  );
}
