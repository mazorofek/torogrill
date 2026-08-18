import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Edit3, MessageCircle, Phone, Save, Search } from "lucide-react";
import { AdminEventDetailsDialog } from "@/admin/AdminEventDetailsDialog";
import { AdminLayout } from "@/admin/AdminLayout";
import { useAdminAuth } from "@/admin/AdminAuthProvider";
import { Button } from "@/components/ui/button";
import {
  fetchAdminLeads,
  type Lead,
  type LeadStatus,
  type LeadType,
  updateAdminLead,
} from "@/lib/adminApi";
import { formatPhoneForTel, getWhatsAppHref } from "@/lib/phone";

const statusLabels: Record<LeadStatus, string> = {
  new: "חדש",
  contacted: "נוצר קשר",
  closed: "נסגר",
  canceled: "בוטל",
};

const typeLabels: Record<Lead["type"], string> = {
  contact: "פנייה",
  event: "אירוע",
};

const statusOptions = Object.entries(statusLabels) as [LeadStatus, string][];

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("he-IL", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatDateOnly(value: string | null): string {
  if (!value) return "-";
  const [year, month, day] = value.split("-");
  return day && month && year ? `${day}.${month}.${year}` : value;
}

function LeadControls({
  lead,
  onUpdate,
  isSaving,
  onOpenEventDetails,
}: {
  lead: Lead;
  onUpdate: (
    leadId: string,
    updates: Partial<Pick<Lead, "status" | "notes">>,
  ) => void;
  isSaving: boolean;
  onOpenEventDetails?: (lead: Lead) => void;
}) {
  const [notes, setNotes] = useState(lead.notes);

  useEffect(() => {
    setNotes(lead.notes);
  }, [lead.notes]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {lead.type === "event" && onOpenEventDetails && (
          <Button
            type="button"
            size="sm"
            className="gap-2"
            onClick={() => onOpenEventDetails(lead)}
          >
            <Edit3 className="size-4" />
            עריכת אירוע
          </Button>
        )}
        <Button asChild size="sm" variant="outline" className="gap-2">
          <a href={`tel:${formatPhoneForTel(lead.phone)}`} dir="ltr">
            <Phone className="size-4" />
            חיוג
          </a>
        </Button>
        <Button asChild size="sm" variant="outline" className="gap-2">
          <a
            href={getWhatsAppHref(lead.phone)}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </Button>
      </div>

      <select
        value={lead.status}
        onChange={(event) =>
          onUpdate(lead.id, { status: event.target.value as LeadStatus })
        }
        className="h-10 rounded-md border border-[#e6dfd4] bg-white px-3 text-sm text-[#1f1a17] outline-none focus:border-primary"
      >
        {statusOptions.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <textarea
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
        rows={3}
        placeholder="הערות פנימיות"
        className="min-h-20 resize-y rounded-md border border-[#e6dfd4] bg-white px-3 py-2 text-sm text-[#1f1a17] outline-none placeholder:text-[#9b9188] focus:border-primary"
      />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        disabled={isSaving || notes === lead.notes}
        className="gap-2 self-start"
        onClick={() => onUpdate(lead.id, { notes })}
      >
        <Save className="size-4" />
        שמירת הערות
      </Button>
    </div>
  );
}

function LeadCard({
  lead,
  onUpdate,
  isSaving,
  onOpenEventDetails,
}: {
  lead: Lead;
  onUpdate: (
    leadId: string,
    updates: Partial<Pick<Lead, "status" | "notes">>,
  ) => void;
  isSaving: boolean;
  onOpenEventDetails: (lead: Lead) => void;
}) {
  return (
    <article className="rounded-lg border border-[#eee5d9] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[#1f1a17]">{lead.name}</h2>
          <p className="text-sm text-[#7b7066]" dir="ltr">
            {lead.phone}
          </p>
        </div>
        <span className="rounded-full border border-primary/25 bg-primary/10 px-2 py-1 text-xs font-semibold text-primary">
          {typeLabels[lead.type]}
        </span>
      </div>

      <dl className="mb-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-[#8b8178]">מקור</dt>
          <dd className="text-[#1f1a17]">{lead.source}</dd>
        </div>
        <div>
          <dt className="text-[#8b8178]">סטטוס</dt>
          <dd className="text-[#1f1a17]">{statusLabels[lead.status]}</dd>
        </div>
        <div>
          <dt className="text-[#8b8178]">תאריך אירוע</dt>
          <dd className="text-[#1f1a17]">{formatDateOnly(lead.eventDate)}</dd>
        </div>
        <div>
          <dt className="text-[#8b8178]">מוזמנים</dt>
          <dd className="text-[#1f1a17]">{lead.guestsCount ?? "-"}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-[#8b8178]">נוצר</dt>
          <dd className="text-[#1f1a17]">{formatDateTime(lead.createdAt)}</dd>
        </div>
      </dl>

      {lead.message && (
        <p className="mb-4 whitespace-pre-wrap border-t border-[#eee5d9] pt-3 text-sm text-[#5f554d]">
          {lead.message}
        </p>
      )}

      <LeadControls
        lead={lead}
        onUpdate={onUpdate}
        isSaving={isSaving}
        onOpenEventDetails={onOpenEventDetails}
      />
    </article>
  );
}

export default function AdminLeadsPage() {
  const { session } = useAdminAuth();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [typeFilter, setTypeFilter] = useState<LeadType | "all">("all");
  const [editingEvent, setEditingEvent] = useState<Lead | null>(null);
  const leadsQuery = useQuery({
    queryKey: ["admin", "leads"],
    queryFn: () => fetchAdminLeads(session!),
    enabled: Boolean(session),
  });

  const updateMutation = useMutation({
    mutationFn: ({
      leadId,
      updates,
    }: {
      leadId: string;
      updates: Partial<Pick<Lead, "status" | "notes">>;
    }) => updateAdminLead(session!, leadId, updates),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin"] });
    },
  });

  const onUpdate = (
    leadId: string,
    updates: Partial<Pick<Lead, "status" | "notes">>,
  ) => {
    updateMutation.mutate({ leadId, updates });
  };

  const leads = leadsQuery.data ?? [];
  const filteredLeads = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return leads.filter((lead) => {
      const matchesStatus =
        statusFilter === "all" || lead.status === statusFilter;
      const matchesType = typeFilter === "all" || lead.type === typeFilter;
      const matchesSearch =
        !search ||
        [lead.name, lead.phone, lead.source, lead.message ?? "", lead.notes]
          .join(" ")
          .toLowerCase()
          .includes(search);

      return matchesStatus && matchesType && matchesSearch;
    });
  }, [leads, searchTerm, statusFilter, typeFilter]);

  return (
    <AdminLayout title="ניהול לידים">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-[#7b7066]">כל הפניות שהגיעו מהאתר</p>
          <p className="text-2xl font-semibold text-[#1f1a17]">
            {filteredLeads.length} מתוך {leads.length} לידים
          </p>
        </div>
        {updateMutation.isError && (
          <p className="text-sm text-primary">
            {updateMutation.error instanceof Error
              ? updateMutation.error.message
              : "העדכון נכשל"}
          </p>
        )}
      </div>

      {leadsQuery.isLoading && (
        <p className="rounded-lg border border-[#eee5d9] bg-white p-4 text-[#7b7066] shadow-sm">
          טוען לידים...
        </p>
      )}

      {leadsQuery.isError && (
        <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-[#1f1a17]">
          <p>טעינת הלידים נכשלה</p>
          {leadsQuery.error instanceof Error && (
            <p className="mt-2 text-sm text-[#7b7066]" dir="ltr">
              {leadsQuery.error.message}
            </p>
          )}
        </div>
      )}

      {!leadsQuery.isLoading && leads.length === 0 && (
        <p className="rounded-lg border border-[#eee5d9] bg-white p-4 text-[#7b7066] shadow-sm">
          אין לידים להצגה.
        </p>
      )}

      {leads.length > 0 && (
        <>
          <section className="mb-4 grid gap-3 rounded-lg border border-[#eee5d9] bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_12rem_12rem]">
            <label className="relative block">
              <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[#8b8178]" />
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="חיפוש לפי שם, טלפון, מקור או הערה"
                className="h-11 w-full rounded-md border border-[#e6dfd4] bg-white pr-9 pl-3 text-sm text-[#1f1a17] outline-none placeholder:text-[#9b9188] focus:border-primary"
              />
            </label>

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value as LeadType | "all")
              }
              className="h-11 rounded-md border border-[#e6dfd4] bg-white px-3 text-sm text-[#1f1a17] outline-none focus:border-primary"
            >
              <option value="all">כל הסוגים</option>
              <option value="event">אירועים</option>
              <option value="contact">פניות כלליות</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as LeadStatus | "all")
              }
              className="h-11 rounded-md border border-[#e6dfd4] bg-white px-3 text-sm text-[#1f1a17] outline-none focus:border-primary"
            >
              <option value="all">כל הסטטוסים</option>
              {statusOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </section>

          {filteredLeads.length === 0 && (
            <p className="rounded-lg border border-[#eee5d9] bg-white p-4 text-[#7b7066] shadow-sm">
              אין לידים שמתאימים לסינון הנוכחי.
            </p>
          )}

          {filteredLeads.length > 0 && (
            <>
              <div className="hidden overflow-x-auto rounded-lg border border-[#eee5d9] bg-white shadow-sm md:block">
                <table className="w-full min-w-[1100px] text-right text-sm">
                  <thead className="bg-[#fbf7f0] text-[#7b7066]">
                    <tr>
                      <th className="p-3 font-medium">שם</th>
                      <th className="p-3 font-medium">טלפון</th>
                      <th className="p-3 font-medium">מקור</th>
                      <th className="p-3 font-medium">סוג</th>
                      <th className="p-3 font-medium">אירוע</th>
                      <th className="p-3 font-medium">מוזמנים</th>
                      <th className="p-3 font-medium">סטטוס ופעולות</th>
                      <th className="p-3 font-medium">נוצר</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        className="border-t border-[#eee5d9] align-top"
                      >
                        <td className="p-3 font-semibold text-[#1f1a17]">
                          {lead.name}
                        </td>
                        <td className="p-3 text-[#1f1a17]" dir="ltr">
                          {lead.phone}
                        </td>
                        <td className="p-3 text-[#5f554d]">{lead.source}</td>
                        <td className="p-3 text-[#5f554d]">
                          {typeLabels[lead.type]}
                        </td>
                        <td className="p-3 text-[#5f554d]">
                          {formatDateOnly(lead.eventDate)}
                        </td>
                        <td className="p-3 text-[#5f554d]">
                          {lead.guestsCount ?? "-"}
                        </td>
                        <td className="w-72 p-3">
                          <LeadControls
                            lead={lead}
                            onUpdate={onUpdate}
                            isSaving={updateMutation.isPending}
                            onOpenEventDetails={setEditingEvent}
                          />
                        </td>
                        <td className="p-3 text-[#5f554d]">
                          {formatDateTime(lead.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid gap-4 md:hidden">
                {filteredLeads.map((lead) => (
                  <LeadCard
                    key={lead.id}
                    lead={lead}
                    onUpdate={onUpdate}
                    isSaving={updateMutation.isPending}
                    onOpenEventDetails={setEditingEvent}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
      <AdminEventDetailsDialog
        lead={editingEvent}
        open={Boolean(editingEvent)}
        onOpenChange={(open) => {
          if (!open) setEditingEvent(null);
        }}
      />
    </AdminLayout>
  );
}
