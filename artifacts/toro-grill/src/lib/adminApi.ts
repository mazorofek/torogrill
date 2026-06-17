import type { Session } from "@supabase/supabase-js";

export type LeadType = "contact" | "event";
export type LeadStatus = "new" | "contacted" | "closed" | "canceled";

export type Lead = {
  id: string;
  type: LeadType;
  name: string;
  phone: string;
  email: string | null;
  message: string | null;
  source: string;
  eventDate: string | null;
  eventTime: string | null;
  guestsCount: number | null;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateAdminEventInput = {
  name: string;
  phone: string;
  eventDate: string;
  eventTime?: string;
  guestsCount: number;
  message?: string;
  source?: string;
};

async function adminFetch<T>(
  session: Session,
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Authorization", `Bearer ${session.access_token}`);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    throw new Error(data?.message ?? "בקשת הניהול נכשלה");
  }

  return response.json() as Promise<T>;
}

export async function fetchAdminLeads(session: Session): Promise<Lead[]> {
  const data = await adminFetch<{ leads: Lead[] }>(session, "/api/admin/leads");
  return data.leads;
}

export async function fetchAdminEvents(session: Session): Promise<Lead[]> {
  const data = await adminFetch<{ leads: Lead[] }>(session, "/api/admin/events");
  return data.leads;
}

export async function createAdminEvent(
  session: Session,
  input: CreateAdminEventInput,
): Promise<Lead> {
  const data = await adminFetch<{ lead: Lead }>(session, "/api/admin/events", {
    method: "POST",
    body: JSON.stringify(input),
  });

  return data.lead;
}

export async function updateAdminLead(
  session: Session,
  leadId: string,
  updates: Partial<
    Pick<
      Lead,
      | "name"
      | "phone"
      | "message"
      | "eventDate"
      | "eventTime"
      | "guestsCount"
      | "status"
      | "notes"
    >
  >,
): Promise<Lead> {
  const data = await adminFetch<{ lead: Lead }>(
    session,
    `/api/admin/leads/${leadId}`,
    {
      method: "PATCH",
      body: JSON.stringify(updates),
    },
  );

  return data.lead;
}
