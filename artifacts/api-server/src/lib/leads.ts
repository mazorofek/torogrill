import { and, asc, desc, eq, gte, lte, type SQL } from "drizzle-orm";
import type { InsertLead, Lead, LeadStatus, LeadType } from "@workspace/db";
import { logger } from "./logger";

type DbModule = typeof import("@workspace/db");

let dbModulePromise: Promise<DbModule> | null = null;
let loggedDbConfig = false;

type LeadFilters = {
  type?: LeadType;
  status?: LeadStatus;
  from?: string;
  to?: string;
};

type LeadUpdate = Partial<
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
>;

function getDatabaseLogContext() {
  const databaseUrl = process.env["DATABASE_URL"];

  if (!databaseUrl) {
    return { hasDatabaseUrl: false };
  }

  try {
    const parsed = new URL(databaseUrl);
    return {
      hasDatabaseUrl: true,
      databaseProtocol: parsed.protocol.replace(":", ""),
      databaseHost: parsed.host,
      databaseName: parsed.pathname.replace(/^\/+/, "") || undefined,
    };
  } catch {
    return {
      hasDatabaseUrl: true,
      databaseUrlParseable: false,
    };
  }
}

function getDbModule(): Promise<DbModule> {
  if (!process.env["DATABASE_URL"]) {
    throw new Error("DATABASE_URL is required for lead database operations.");
  }

  if (!loggedDbConfig) {
    logger.info(getDatabaseLogContext(), "Lead database configuration detected");
    loggedDbConfig = true;
  }

  dbModulePromise ??= import("@workspace/db");
  return dbModulePromise;
}

export async function createLead(input: InsertLead): Promise<Lead> {
  const { db, leadsTable } = await getDbModule();
  const [lead] = await db.insert(leadsTable).values(input).returning();

  if (!lead) {
    throw new Error("Lead insert did not return a row.");
  }

  return lead;
}

export async function tryCreateLead(input: InsertLead): Promise<Lead | null> {
  try {
    const lead = await createLead(input);

    logger.info(
      {
        leadId: lead.id,
        leadType: lead.type,
        hasEventDate: Boolean(lead.eventDate),
        hasGuestsCount: lead.guestsCount !== null,
      },
      "Lead persisted",
    );

    return lead;
  } catch (error) {
    logger.error(
      { err: error, leadType: input.type, ...getDatabaseLogContext() },
      "Lead persistence failed",
    );
    return null;
  }
}

export async function listLeads(filters: LeadFilters = {}): Promise<Lead[]> {
  const { db, leadsTable } = await getDbModule();
  const conditions: SQL<unknown>[] = [];

  if (filters.type) conditions.push(eq(leadsTable.type, filters.type));
  if (filters.status) conditions.push(eq(leadsTable.status, filters.status));
  if (filters.from) conditions.push(gte(leadsTable.createdAt, new Date(filters.from)));
  if (filters.to) conditions.push(lte(leadsTable.createdAt, new Date(filters.to)));

  let query = db.select().from(leadsTable).$dynamic();
  const where = conditions.length > 0 ? and(...conditions) : undefined;

  if (where) {
    query = query.where(where);
  }

  return query.orderBy(desc(leadsTable.createdAt)).limit(200);
}

export async function listEventLeads(filters: Pick<LeadFilters, "from" | "to"> = {}) {
  const { db, leadsTable } = await getDbModule();
  const conditions: SQL<unknown>[] = [eq(leadsTable.type, "event")];

  if (filters.from) conditions.push(gte(leadsTable.eventDate, filters.from));
  if (filters.to) conditions.push(lte(leadsTable.eventDate, filters.to));

  return db
    .select()
    .from(leadsTable)
    .where(and(...conditions))
    .orderBy(asc(leadsTable.eventDate), desc(leadsTable.createdAt))
    .limit(200);
}

export async function updateLead(id: string, update: LeadUpdate): Promise<Lead | null> {
  const { db, leadsTable } = await getDbModule();
  const [lead] = await db
    .update(leadsTable)
    .set({
      ...update,
      updatedAt: new Date(),
    })
    .where(eq(leadsTable.id, id))
    .returning();

  return lead ?? null;
}
