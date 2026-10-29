"use client";

import { useActionState } from "react";
import { submitEnquiry, type FormState } from "@/app/actions";
import { Choices, Field, Honeypot, Received, SubmitRow, fieldClass } from "@/components/form-parts";

const initialState: FormState = { status: "idle" };

const types = [
  ["brand", "A brand or agency"],
  ["casting", "Casting or production"],
  ["music", "Label, promoter or booker"],
  ["other", "Something else"],
] as const;

export function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

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

      <Choices legend="I'm from" name="type" options={types} />

      <Field label="Message">
        <textarea name="message" required rows={4} maxLength={5000} className={`${fieldClass} resize-none`} />
      </Field>

      <SubmitRow
        pending={pending}
        idleLabel="Send enquiry"
        pendingLabel="Sending…"
        error={state.status === "error" ? state.message : undefined}
      />
    </form>
  );
}
