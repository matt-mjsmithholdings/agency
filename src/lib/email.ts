// Confirmation emails, rendered as table-based HTML with inline styles (what email clients
// reliably support) plus a plain-text fallback. Colours match globals.css.

const SITE = "https://www.cadvero.com";
const INK = "#0b0b0c";
const PAPER = "#f2efe9";
const MUTED = "#6f6a63";
const LINE = "#e3dfd7";
const SIGNAL = "#ff4d2e";
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export type ConfirmationEmail = {
  /** Shown in inbox previews and as the big heading. */
  heading: string;
  name: string;
  intro: string;
  /** What they sent, as label/value pairs. Empty values are shown as "—". */
  details: [label: string, value: string][];
};

function escape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Escapes user text and keeps their line breaks. */
function paragraphs(value: string) {
  return escape(value).replace(/\r?\n/g, "<br>");
}

export function renderConfirmation({ heading, name, intro, details }: ConfirmationEmail) {
  const rows = details
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:14px 0;border-top:1px solid ${LINE};font-family:${SANS};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED};vertical-align:top;width:120px;">${escape(label)}</td>
          <td style="padding:14px 0;border-top:1px solid ${LINE};font-family:${SANS};font-size:15px;line-height:1.6;color:${INK};vertical-align:top;">${value ? paragraphs(value) : "—"}</td>
        </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${escape(heading)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};">
<div style="display:none;max-height:0;overflow:hidden;">${escape(intro)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
  <tr>
    <td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
        <tr>
          <td style="background:${INK};padding:24px 32px;">
            <a href="${SITE}" style="text-decoration:none;">
              <img src="${SITE}/logo-mark.png" width="36" height="36" alt="" style="display:inline-block;vertical-align:middle;border:0;">
              <span style="display:inline-block;vertical-align:middle;margin-left:12px;font-family:${SERIF};font-size:24px;color:${PAPER};">Cadvero</span>
            </a>
          </td>
        </tr>
        <tr>
          <td style="background:#ffffff;padding:40px 32px 32px;">
            <p style="margin:0 0 8px;font-family:${SANS};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${SIGNAL};">Received</p>
            <h1 style="margin:0 0 24px;font-family:${SERIF};font-size:32px;line-height:1.15;font-weight:normal;color:${INK};">${escape(heading)}</h1>
            <p style="margin:0 0 16px;font-family:${SANS};font-size:16px;line-height:1.6;color:${INK};">Hi ${escape(name)},</p>
            <p style="margin:0 0 32px;font-family:${SANS};font-size:16px;line-height:1.6;color:${INK};">${escape(intro)}</p>
            <p style="margin:0 0 8px;font-family:${SANS};font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED};">What you sent us</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid ${LINE};">${rows}
            </table>
            <p style="margin:32px 0 0;font-family:${SANS};font-size:16px;line-height:1.6;color:${INK};">Speak soon,<br>The Cadvero team</p>
          </td>
        </tr>
        <tr>
          <td style="padding:24px 32px;font-family:${SANS};font-size:12px;line-height:1.6;color:${MUTED};">
            <a href="${SITE}" style="color:${MUTED};">cadvero.com</a><br>
            Cadvero is owned by MJ Smith Holdings, a private company focused on building and stewarding enduring value. Company number 16119280.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = [
    `Hi ${name},`,
    "",
    intro,
    "",
    "What you sent us:",
    "",
    ...details.map(([label, value]) => `${label}: ${value || "—"}`),
    "",
    "Speak soon,",
    "The Cadvero team",
    "",
    "—",
    "cadvero.com",
    "Cadvero is owned by MJ Smith Holdings. Company number 16119280.",
  ].join("\n");

  return { html, text };
}
