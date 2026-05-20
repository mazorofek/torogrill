import { Router, type IRouter } from "express";
import { escapeHtml, getStringField, sendBusinessEmail } from "../lib/email";
import { formSubmissionRateLimit } from "../middlewares/rateLimit";

const router: IRouter = Router();

type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  message: string;
};

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

router.post("/contact", formSubmissionRateLimit, async (req, res, next) => {
  try {
    const payload = parseContactPayload(req.body);

    if (!payload) {
      res.status(400).json({ message: "Missing required contact fields." });
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

    const emailResult = await sendBusinessEmail({
      subject,
      text,
      html,
      replyTo: payload.email,
    });

    if (emailResult.status === "missing-config") {
      res.status(500).json({ message: "Contact email is not configured." });
      return;
    }

    if (!emailResult.ok) {
      res.status(502).json({ message: "Failed to send contact email." });
      return;
    }

    res.status(202).json({ message: "Contact email sent." });
  } catch (error) {
    next(error);
  }
});

export default router;
