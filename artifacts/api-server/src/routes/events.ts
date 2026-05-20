import { Router, type IRouter } from "express";
import { escapeHtml, getStringField, sendBusinessEmail } from "../lib/email";
import { formSubmissionRateLimit } from "../middlewares/rateLimit";

const router: IRouter = Router();

type EventPayload = {
  fullName: string;
  phone: string;
  date: string;
  guests: number;
  notes?: string;
};

function parseEventPayload(body: unknown): EventPayload | null {
  const fullName = getStringField(body, "fullName");
  const phone = getStringField(body, "phone");
  const date = getStringField(body, "date");
  const notes = getStringField(body, "notes");
  const guestsValue =
    body && typeof body === "object"
      ? (body as Record<string, unknown>)["guests"]
      : undefined;
  const guests =
    typeof guestsValue === "number"
      ? guestsValue
      : typeof guestsValue === "string"
        ? Number(guestsValue)
        : Number.NaN;

  if (!fullName || !phone || !date || Number.isNaN(guests) || guests < 1) {
    return null;
  }

  return {
    fullName,
    phone,
    date,
    guests,
    notes: notes || undefined,
  };
}

router.post("/events", formSubmissionRateLimit, async (req, res, next) => {
  try {
    const payload = parseEventPayload(req.body);

    if (!payload) {
      res.status(400).json({ message: "Missing required event fields." });
      return;
    }

    const subject = `פניית אירוע חדשה מאתר Toro Grill - ${payload.fullName}`;
    const text = [
      `שם מלא: ${payload.fullName}`,
      `טלפון: ${payload.phone}`,
      `תאריך האירוע: ${payload.date}`,
      `מספר מוזמנים: ${payload.guests}`,
      `הערות: ${payload.notes ?? "לא נמסרו"}`,
    ].join("\n");

    const html = `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>פניית אירוע חדשה מאתר Toro Grill</h2>
        <p><strong>שם מלא:</strong> ${escapeHtml(payload.fullName)}</p>
        <p><strong>טלפון:</strong> ${escapeHtml(payload.phone)}</p>
        <p><strong>תאריך האירוע:</strong> ${escapeHtml(payload.date)}</p>
        <p><strong>מספר מוזמנים:</strong> ${payload.guests}</p>
        <p><strong>הערות:</strong></p>
        <p>${escapeHtml(payload.notes ?? "לא נמסרו").replaceAll("\n", "<br />")}</p>
      </div>
    `;

    const emailResult = await sendBusinessEmail({
      subject,
      text,
      html,
    });

    if (emailResult.status === "missing-config") {
      res.status(500).json({ message: "Event email is not configured." });
      return;
    }

    if (!emailResult.ok) {
      res.status(502).json({ message: "Failed to send event email." });
      return;
    }

    res.status(202).json({ message: "Event email sent." });
  } catch (error) {
    next(error);
  }
});

export default router;
