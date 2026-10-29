"use server";

import { Resend } from "resend";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const ENQUIRY_LABELS: Record<string, string> = {
  brand: "Brand / agency",
  casting: "Casting director / producer",
  music: "Label / promoter / booker",
  other: "Other",
};

const APPLICANT_LABELS: Record<string, string> = {
  influencer: "Influencer / creator",
  actor: "Actor",
  musician: "Musician",
  presenter: "Presenter",
  other: "Other",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

/** Bots fill in every field, including the hidden "website" one people never see. */
function isBot(formData: FormData) {
  return field(formData, "website") !== "";
}

/**
 * Emails a confirmation (with a copy of what they sent) to the person who filled in the form,
 * BCCing the team. Just logs when Resend isn't configured (e.g. local dev).
 */
async function deliver(to: string, subject: string, lines: string[]): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  const bcc = process.env.ENQUIRY_BCC_EMAIL;
  const replyTo = process.env.ENQUIRY_REPLY_TO_EMAIL;
  const text = lines.join("\n");

  if (!apiKey || !from || !bcc) {
    console.log(`[${subject}] to ${to}\n${text}`);
    return true;
  }

  const { error } = await new Resend(apiKey).emails.send({
    from,
    to,
    bcc,
    replyTo: replyTo || undefined,
    subject,
    text,
  });
  if (error) {
    console.error("[forms] Resend failed", error);
    return false;
  }
  return true;
}

export async function submitEnquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = field(formData, "name");
  const email = field(formData, "email");
  const type = field(formData, "type");
  const message = field(formData, "message");

  if (isBot(formData)) return { status: "success", message: "Thank you." };
  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in every field." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }
  if (message.length > 5000) {
    return { status: "error", message: "Please keep your message under 5,000 characters." };
  }

  const label = ENQUIRY_LABELS[type] ?? "Other";
  const sent = await deliver(email, "We've received your enquiry — Cadvero", [
    `Hi ${name},`,
    "",
    "Thanks for getting in touch with Cadvero. Someone from the team will reply to you personally.",
    "",
    "For reference, here's what you sent:",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Type: ${label}`,
    "",
    message,
  ]);
  if (!sent) {
    return {
      status: "error",
      message: "Something went wrong sending your enquiry. Please email us directly.",
    };
  }

  return {
    status: "success",
    message: "Thank you. Someone from Cadvero will be in touch personally.",
  };
}

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = field(formData, "name");
  const email = field(formData, "email");
  const kind = field(formData, "kind");
  const link = field(formData, "link");
  const about = field(formData, "about");

  if (isBot(formData)) return { status: "success", message: "Thank you." };
  if (!name || !email) {
    return { status: "error", message: "We just need your name and email." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }
  if (link.length > 500) {
    return { status: "error", message: "Please keep \"Show us your work\" under 500 characters." };
  }
  if (about.length > 2000) {
    return { status: "error", message: "Please keep it under 2,000 characters." };
  }

  const label = APPLICANT_LABELS[kind] ?? "Other";
  const sent = await deliver(email, "We've received your application — Cadvero", [
    `Hi ${name},`,
    "",
    "Thanks for applying to Cadvero. We review every application ourselves and will reply to you personally, whatever the answer.",
    "",
    "For reference, here's what you sent:",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `I am: ${label}`,
    `Work: ${link || "—"}`,
    "",
    about || "(no message)",
  ]);
  if (!sent) {
    return {
      status: "error",
      message: "Something went wrong sending your application. Please email us directly.",
    };
  }

  return {
    status: "success",
    message: "We watch, listen to and read every application, and we'll reply personally either way.",
  };
}
