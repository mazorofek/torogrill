type EmailMessage = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function getStringField(body: unknown, field: string): string {
  if (!body || typeof body !== "object") return "";

  const value = (body as Record<string, unknown>)[field];
  return typeof value === "string" ? value.trim() : "";
}

export async function sendBusinessEmail(message: EmailMessage) {
  const apiKey = process.env["RESEND_API_KEY"];
  const toEmail = process.env["CONTACT_TO_EMAIL"];
  const fromEmail =
    process.env["RESEND_FROM_EMAIL"] ?? "Toro Grill <onboarding@resend.dev>";

  if (!apiKey || !toEmail) {
    return { ok: false, status: "missing-config" as const };
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
  });

  if (!resendResponse.ok) {
    return { ok: false, status: "send-failed" as const };
  }

  return { ok: true, status: "sent" as const };
}
