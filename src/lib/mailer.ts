import nodemailer from "nodemailer";

/**
 * Outbound email for the contact and newsletter forms. Configured entirely from
 * env (SMTP_HOST/PORT/SECURE/USER/PASS, EMAIL_FROM, CONTACT_TO). When SMTP_HOST is
 * unset the forms report that email is unavailable instead of silently succeeding.
 */
export function isMailConfigured(): boolean {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function transport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE) === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 15_000,
  });
}

const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

export async function sendMail(opts: {
  subject: string;
  replyTo?: string;
  rows: Array<[label: string, value: string | undefined]>;
}): Promise<void> {
  const to = process.env.CONTACT_TO || "aadhyainfotech02@gmail.com";
  const from = process.env.EMAIL_FROM || `Aadhya Infotech Website <${process.env.SMTP_USER}>`;
  const lines = opts.rows.filter(([, v]) => v && String(v).trim());
  const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html =
    `<table style="font:14px/1.5 system-ui,sans-serif;border-collapse:collapse">` +
    lines
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 12px 4px 0;color:#555;vertical-align:top"><b>${escapeHtml(k)}</b></td>` +
          `<td style="padding:4px 0;white-space:pre-wrap">${escapeHtml(String(v))}</td></tr>`,
      )
      .join("") +
    `</table>`;
  await transport().sendMail({ to, from, replyTo: opts.replyTo, subject: opts.subject, text, html });
}
