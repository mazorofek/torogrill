import { sql } from "drizzle-orm";
import {
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const leadTypeEnum = pgEnum("lead_type", ["contact", "event"]);
export const leadStatusEnum = pgEnum("lead_status", [
  "new",
  "contacted",
  "closed",
  "canceled",
]);

export const leadsTable = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    type: leadTypeEnum("type").notNull(),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    message: text("message"),
    source: text("source").notNull().default("ישיר / לא ידוע"),
    eventDate: date("event_date"),
    eventTime: time("event_time"),
    guestsCount: integer("guests_count"),
    status: leadStatusEnum("status").notNull().default("new"),
    notes: text("notes").notNull().default(""),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("leads_created_at_idx").on(table.createdAt.desc()),
    index("leads_status_idx").on(table.status),
    index("leads_event_date_idx")
      .on(table.eventDate)
      .where(sql`${table.type} = 'event'`),
  ],
);

export type Lead = typeof leadsTable.$inferSelect;
export type InsertLead = typeof leadsTable.$inferInsert;
export type LeadType = (typeof leadTypeEnum.enumValues)[number];
export type LeadStatus = (typeof leadStatusEnum.enumValues)[number];
