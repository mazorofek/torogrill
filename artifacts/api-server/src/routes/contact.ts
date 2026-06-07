import { Router, type IRouter } from "express";
import {
  escapeHtml,
  getStringField,
  renderLeadActionButtons,
  renderLeadPhoneLink,
  sendBusinessEmail,
} from "../lib/email";
import { getSubmissionSourceLabel } from "../lib/attribution";
import { formSubmissionRateLimit } from "../middlewares/rateLimit";

const router: IRouter = Router();

type ContactPayload = {
  name: string;
  phone: string;
  message: string;
};

function parseContactPayload(body: unknown): ContactPayload | null {
  const name = getStringField(body, "name");
  const phone = getStringField(body, "phone");
  const message = getStringField(body, "message");

  if (!name || !phone || !message) return null;

  return {
    name,
    phone,
    message,
  };
}

router.post("/contact", formSubmissionRateLimit, async (req, res, next) => {
  try {
    const payload = parseContactPayload(req.body);
    const source = getSubmissionSourceLabel(req.body);

    if (!payload) {
      res.status(400).json({ message: "Missing required contact fields." });
      return;
    }

    const subject = `פנייה חדשה מאתר Toro Grill - ${payload.name}`;
    const text = [
      `שם: ${payload.name}`,
      `טלפון: ${payload.phone}`,
      `מקור הגעה: ${source}`,
      "",
      payload.message,
    ].join("\n");

    const html = `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>פנייה חדשה מאתר Toro Grill</h2>
        <p><strong>שם:</strong> ${escapeHtml(payload.name)}</p>
        <p><strong>טלפון:</strong> ${renderLeadPhoneLink(payload.phone)}</p>
        ${renderLeadActionButtons(payload.phone)}
        <p><strong>מקור הגעה:</strong> ${escapeHtml(source)}</p>
        <p><strong>הודעה:</strong></p>
        <p>${escapeHtml(payload.message).replaceAll("\n", "<br />")}</p>
      </div>
    `;

    const emailResult = await sendBusinessEmail({
      subject,
      text,
      html,
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
