import { Router, type IRouter } from "express";
import type { InsertLead, LeadStatus, LeadType } from "@workspace/db";
import { createLead, listEventLeads, listLeads, updateLead } from "../lib/leads";
import { logger } from "../lib/logger";
import { requireAdminAuth } from "../middlewares/adminAuth";

const router: IRouter = Router();

const allowedTypes = new Set<LeadType>(["contact", "event"]);
const allowedStatuses = new Set<LeadStatus>([
  "new",
  "contacted",
  "closed",
  "canceled",
]);

function getQueryString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getLeadType(value: unknown): LeadType | undefined {
  const candidate = getQueryString(value);
  return candidate && allowedTypes.has(candidate as LeadType)
    ? (candidate as LeadType)
    : undefined;
}

function getLeadStatus(value: unknown): LeadStatus | undefined {
  const candidate = getQueryString(value);
  return candidate && allowedStatuses.has(candidate as LeadStatus)
    ? (candidate as LeadStatus)
    : undefined;
}

function getBodyString(body: Record<string, unknown>, key: string): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function getBodyNumber(body: Record<string, unknown>, key: string): number | null {
  const value = body[key];
  const numberValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : Number.NaN;

  return Number.isFinite(numberValue) ? numberValue : null;
}

function parseAdminEventPayload(body: unknown): InsertLead | null {
  if (!body || typeof body !== "object") return null;

  const record = body as Record<string, unknown>;
  const name = getBodyString(record, "name");
  const phone = getBodyString(record, "phone");
  const eventDate = getBodyString(record, "eventDate");
  const eventTime = getBodyString(record, "eventTime");
  const message = getBodyString(record, "message");
  const source = getBodyString(record, "source") || "הוספה ידנית";
  const guestsCount = getBodyNumber(record, "guestsCount");

  if (!name || !phone || !eventDate || !guestsCount || guestsCount < 1) {
    return null;
  }

  return {
    type: "event",
    name,
    phone,
    eventDate,
    eventTime: eventTime || undefined,
    guestsCount,
    message: message || undefined,
    source,
  };
}

router.use("/admin", requireAdminAuth);

router.get("/admin/leads", async (req, res, next) => {
  try {
    const filters = {
      type: getLeadType(req.query["type"]),
      status: getLeadStatus(req.query["status"]),
      from: getQueryString(req.query["from"]),
      to: getQueryString(req.query["to"]),
    };
    const leads = await listLeads(filters);

    logger.info(
      {
        count: leads.length,
        filters,
      },
      "Admin leads listed",
    );

    res.json({ leads });
  } catch (error) {
    logger.error({ err: error }, "Admin leads list failed");
    next(error);
  }
});

router.get("/admin/events", async (req, res, next) => {
  try {
    const filters = {
      from: getQueryString(req.query["from"]),
      to: getQueryString(req.query["to"]),
    };
    const leads = await listEventLeads(filters);

    logger.info(
      {
        count: leads.length,
        filters,
      },
      "Admin event leads listed",
    );

    res.json({ leads });
  } catch (error) {
    logger.error({ err: error }, "Admin event leads list failed");
    next(error);
  }
});

router.post("/admin/events", async (req, res, next) => {
  try {
    const payload = parseAdminEventPayload(req.body);

    if (!payload) {
      res.status(400).json({ message: "Missing required event fields." });
      return;
    }

    const lead = await createLead(payload);

    logger.info(
      {
        leadId: lead.id,
        leadType: lead.type,
        hasEventDate: Boolean(lead.eventDate),
        hasEventTime: Boolean(lead.eventTime),
        hasGuestsCount: lead.guestsCount !== null,
      },
      "Admin event lead created",
    );

    res.status(201).json({ lead });
  } catch (error) {
    logger.error({ err: error }, "Admin event lead create failed");
    next(error);
  }
});

router.patch("/admin/leads/:id", async (req, res, next) => {
  try {
    const updates: Partial<
      Pick<
        InsertLead,
        | "name"
        | "phone"
        | "message"
        | "eventDate"
        | "eventTime"
        | "guestsCount"
        | "status"
        | "notes"
      >
    > = {};
    const body = req.body as Record<string, unknown>;

    if ("name" in body) {
      const name = getBodyString(body, "name");
      if (!name) {
        res.status(400).json({ message: "Invalid lead name." });
        return;
      }
      updates.name = name;
    }

    if ("phone" in body) {
      const phone = getBodyString(body, "phone");
      if (!phone) {
        res.status(400).json({ message: "Invalid lead phone." });
        return;
      }
      updates.phone = phone;
    }

    if ("message" in body) {
      if (typeof body["message"] !== "string") {
        res.status(400).json({ message: "Invalid lead message." });
        return;
      }
      updates.message = body["message"].trim() || null;
    }

    if ("eventDate" in body) {
      if (typeof body["eventDate"] !== "string") {
        res.status(400).json({ message: "Invalid event date." });
        return;
      }
      updates.eventDate = body["eventDate"].trim() || null;
    }

    if ("eventTime" in body) {
      if (typeof body["eventTime"] !== "string") {
        res.status(400).json({ message: "Invalid event time." });
        return;
      }
      updates.eventTime = body["eventTime"].trim() || null;
    }

    if ("guestsCount" in body) {
      const guestsCount = getBodyNumber(body, "guestsCount");
      if (!guestsCount || guestsCount < 1) {
        res.status(400).json({ message: "Invalid guests count." });
        return;
      }
      updates.guestsCount = guestsCount;
    }

    if ("status" in body) {
      const status = getLeadStatus(body["status"]);

      if (!status) {
        res.status(400).json({ message: "Invalid lead status." });
        return;
      }

      updates.status = status;
    }

    if ("notes" in body) {
      if (typeof body["notes"] !== "string") {
        res.status(400).json({ message: "Invalid lead notes." });
        return;
      }

      updates.notes = body["notes"];
    }

    if (Object.keys(updates).length === 0) {
      res.status(400).json({ message: "No supported lead updates provided." });
      return;
    }

    const lead = await updateLead(req.params.id, updates);

    if (!lead) {
      logger.warn({ leadId: req.params.id }, "Admin lead update missed");
      res.status(404).json({ message: "Lead not found." });
      return;
    }

    logger.info(
      {
        leadId: lead.id,
        updatedStatus: updates.status,
        updatedNotes: updates.notes !== undefined,
        updatedEventDate: updates.eventDate !== undefined,
        updatedEventTime: updates.eventTime !== undefined,
        updatedGuestsCount: updates.guestsCount !== undefined,
      },
      "Admin lead updated",
    );

    res.json({ lead });
  } catch (error) {
    logger.error({ err: error, leadId: req.params.id }, "Admin lead update failed");
    next(error);
  }
});

export default router;
