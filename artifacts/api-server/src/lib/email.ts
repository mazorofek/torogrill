import { logger } from "./logger";

type EmailMessage = {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

function parseEmailRecipients(value: string): string[] {
  return value
    .split(/[;,]/)
    .map((email) => email.trim())
    .filter(Boolean);
}

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

function escapeAttribute(value: string): string {
  return escapeHtml(value);
}

export function formatPhoneForWhatsApp(phone: string): string {
  let number = phone.replace(/[^\d+]/g, "");

  if (number.startsWith("+")) {
    number = number.slice(1);
  } else if (number.startsWith("00")) {
    number = number.slice(2);
  }

  number = number.replace(/\D/g, "");

  if (number.startsWith("9720")) {
    return `972${number.slice(4)}`;
  }

  if (number.startsWith("0")) {
    return `972${number.slice(1)}`;
  }

  return number;
}

function formatPhoneForTel(phone: string): string {
  return `+${formatPhoneForWhatsApp(phone)}`;
}

export function renderLeadPhoneLink(phone: string): string {
  const telPhone = formatPhoneForTel(phone);

  return `<a href="${escapeAttribute(`tel:${telPhone}`)}" dir="ltr" style="color: #111827; font-weight: 700; text-decoration: underline;">${escapeHtml(phone)}</a>`;
}

export function renderLeadActionButtons(phone: string): string {
  const whatsappNumber = formatPhoneForWhatsApp(phone);

  return `
    <table role="presentation" dir="rtl" width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; border-collapse: collapse;">
      <tr>
        <td style="padding: 18px; border: 1px solid #e5ded3; border-radius: 10px; background: #fbf8f3; font-family: Arial, sans-serif;">
          <p style="margin: 0 0 12px; color: #111827; font-size: 16px; font-weight: 700; line-height: 1.4;">
            פעולה מהירה מול הלקוח
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
            <tr>
              <td style="padding: 0;">
                <a href="${escapeAttribute(`https://wa.me/${whatsappNumber}`)}" style="display: inline-block; min-width: 190px; padding: 13px 18px; border-radius: 6px; background: #128c7e; color: #ffffff; font-family: Arial, sans-serif; font-size: 15px; font-weight: 700; line-height: 1.2; text-align: center; text-decoration: none;">
                  פתח WhatsApp
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

export async function sendBusinessEmail(message: EmailMessage) {
  const apiKey = process.env["RESEND_API_KEY"];
  const toEmail = process.env["CONTACT_TO_EMAIL"];
  const fromEmail =
    process.env["RESEND_FROM_EMAIL"] ?? "Toro Grill <onboarding@resend.dev>";
  const recipients = toEmail ? parseEmailRecipients(toEmail) : [];

  if (!apiKey || recipients.length === 0) {
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
      to: recipients,
      reply_to: message.replyTo,
      subject: message.subject,
      text: message.text,
      html: message.html,
    }),
  });

  if (!resendResponse.ok) {
    const responseBody = await resendResponse.text();

    logger.error(
      {
        status: resendResponse.status,
        responseBody,
        recipients,
        fromEmail,
      },
      "Resend email send failed",
    );

    return { ok: false, status: "send-failed" as const };
  }

  return { ok: true, status: "sent" as const };
}
