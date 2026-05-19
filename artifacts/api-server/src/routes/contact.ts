import { Router, type IRouter } from "express";

const router: IRouter = Router();

type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  message: string;
};

function getStringField(body: unknown, field: string): string {
  if (!body || typeof body !== "object") return "";

  const value = (body as Record<string, unknown>)[field];
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function parseContactPayload(body: unknown): ContactPayload | null {
  const name = getStringField(body, "name");
  const phone = getStringField(body, "phone");
  const email = getStringField(body, "email");
  const message = getStringField(body, "message");

  if (!name || !phone || !message) return null;

  return {
    name,
    phone,
    email: email || undefined,
    message,
  };
}

router.post("/contact", async (req, res, next) => {
  try {
    const payload = parseContactPayload(req.body);

    if (!payload) {
      res.status(400).json({ message: "Missing required contact fields." });
      return;
    }

    const apiKey = process.env["RESEND_API_KEY"];
    const toEmail = process.env["CONTACT_TO_EMAIL"];
    const fromEmail =
      process.env["RESEND_FROM_EMAIL"] ?? "Toro Grill <onboarding@resend.dev>";

    if (!apiKey || !toEmail) {
      res.status(500).json({ message: "Contact email is not configured." });
      return;
    }

    const subject = `פנייה חדשה מאתר Toro Grill - ${payload.name}`;
    const text = [
      `שם: ${payload.name}`,
      `טלפון: ${payload.phone}`,
      `אימייל: ${payload.email ?? "לא נמסר"}`,
      "",
      payload.message,
    ].join("\n");

    const html = `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>פנייה חדשה מאתר Toro Grill</h2>
        <p><strong>שם:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>טלפון:</strong> ${escapeHtml(payload.phone)}</p>
        <p><strong>אימייל:</strong> ${escapeHtml(payload.email ?? "לא נמסר")}</p>
        <p><strong>הודעה:</strong></p>
        <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
      </div>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: payload.email,
        subject,
        text,
        html,
      }),
    });

    if (!resendResponse.ok) {
      res.status(502).json({ message: "Failed to send contact email." });
      return;
    }

    res.status(202).json({ message: "Contact email sent." });
  } catch (error) {
    next(error);
  }
});

export default router;
