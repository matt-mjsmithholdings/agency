import { Resend } from "resend";

// Applicants are remembered as contacts in this Resend segment, so each email address only
// ever gets one application confirmation. Needs a Resend API key with full access; with a
// sending-only key every check fails open (the application is still sent).
const SEGMENT_NAME = "Cadvero applicants";

let segmentId: Promise<string | null> | undefined;

function client() {
  const apiKey = process.env.RESEND_API_KEY;
  return apiKey ? new Resend(apiKey) : null;
}

/** Finds the applicants segment, creating it the first time. Cached per server instance. */
function applicantsSegment(resend: Resend): Promise<string | null> {
  segmentId ??= (async () => {
    const { data, error } = await resend.segments.list();
    if (error) throw error;
    const existing = data.data.find((s) => s.name === SEGMENT_NAME);
    if (existing) return existing.id;

    const created = await resend.segments.create({ name: SEGMENT_NAME });
    if (created.error) throw created.error;
    return created.data.id;
  })().catch((error) => {
    console.error("[applicants] couldn't load segment", error);
    segmentId = undefined; // retry on the next request
    return null;
  });
  return segmentId;
}

/** True only when we know for sure this email has applied before. Never throws. */
export async function hasApplied(email: string): Promise<boolean> {
  const resend = client();
  if (!resend) return false;
  const id = await applicantsSegment(resend);
  if (!id) return false;

  try {
    // Errors here usually just mean "no such contact yet".
    const { data } = await resend.contacts.segments.list({ email: email.toLowerCase() });
    return data?.data.some((s) => s.id === id) ?? false;
  } catch (error) {
    console.error("[applicants] couldn't check applicant", error);
    return false;
  }
}

/** Records the applicant so they aren't sent another confirmation. Never throws. */
export async function rememberApplicant(email: string, name: string): Promise<void> {
  const resend = client();
  if (!resend) return;
  const id = await applicantsSegment(resend);
  if (!id) return;

  const address = email.toLowerCase();
  try {
    // Marked unsubscribed: applying isn't consent to marketing broadcasts.
    const created = await resend.contacts.create({
      email: address,
      firstName: name,
      unsubscribed: true,
      segments: [{ id }],
    });
    if (!created.error) return;

    // The contact probably exists already; just add them to the segment.
    const added = await resend.contacts.segments.add({ email: address, segmentId: id });
    if (added.error) console.error("[applicants] couldn't record applicant", added.error);
  } catch (error) {
    console.error("[applicants] couldn't record applicant", error);
  }
}
