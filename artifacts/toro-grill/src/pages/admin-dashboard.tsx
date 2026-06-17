import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  MessageCircle,
  Phone,
  UsersRound,
} from "lucide-react";
import { AdminEventDetailsDialog } from "@/admin/AdminEventDetailsDialog";
import { AdminEventDialog } from "@/admin/AdminEventDialog";
import { AdminLayout } from "@/admin/AdminLayout";
import { useAdminAuth } from "@/admin/AdminAuthProvider";
import { Button } from "@/components/ui/button";
import { fetchAdminLeads, type Lead } from "@/lib/adminApi";
import { formatPhoneForTel, formatPhoneForWhatsApp } from "@/lib/phone";

const statusLabels: Record<Lead["status"], string> = {
  new: "חדש",
  contacted: "נוצר קשר",
  closed: "נסגר",
  canceled: "בוטל",
};

const typeLabels: Record<Lead["type"], string> = {
  contact: "פנייה כללית",
  event: "אירוע",
};

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addDays(date: Date, days: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);
  return nextDate;
}

function formatShortDate(dateKey: string | null): string {
  if (!dateKey) return "-";
  const [year, month, day] = dateKey.split("-");
  return day && month && year ? `${day}.${month}` : dateKey;
}

function formatCreatedAt(value: string): string {
  return new Intl.DateTimeFormat("he-IL", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  }).format(new Date(value));
}

function formatEventTime(value: string | null): string {
  return value?.slice(0, 5) ?? "שעה פתוחה";
}

function isDateInMonth(dateKey: string | null, date: Date): boolean {
  if (!dateKey) return false;
  const [year, month] = dateKey.split("-").map(Number);
  return year === date.getFullYear() && month === date.getMonth() + 1;
}

function StatCard({
  label,
  value,
  helper,
  icon: Icon,
  tone,
}: {
  label: string;
  value: number;
  helper: string;
  icon: typeof UsersRound;
  tone: "green" | "gold" | "blue" | "purple";
}) {
  const tones = {
    green: "bg-emerald-50 text-emerald-700",
    gold: "bg-amber-50 text-amber-700",
    blue: "bg-sky-50 text-sky-700",
    purple: "bg-violet-50 text-violet-700",
  };

  return (
    <article className="flex items-center justify-between rounded-lg border border-[#eee5d9] bg-white p-5 shadow-sm">
      <div className={`flex size-12 items-center justify-center rounded-full ${tones[tone]}`}>
        <Icon className="size-5" />
      </div>
      <div className="text-left">
        <p className="text-3xl font-bold text-[#1f1a17]">{value}</p>
        <p className="text-sm font-semibold text-[#3b332d]">{label}</p>
        <p className="text-xs text-[#8b8178]">{helper}</p>
      </div>
    </article>
  );
}

function RecentLeadList({
  leads,
  selectedLeadId,
  onSelectLead,
}: {
  leads: Lead[];
  selectedLeadId?: string;
  onSelectLead: (lead: Lead) => void;
}) {
  return (
    <section className="rounded-lg border border-[#eee5d9] bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-[#1f1a17]">פניות חדשות</h3>
        <span className="text-sm text-emerald-700">הצג הכל</span>
      </div>

      <div className="space-y-3">
        {leads.length === 0 && (
          <p className="rounded-md bg-[#f8f4ee] p-4 text-sm text-[#7b7066]">
            אין פניות להצגה.
          </p>
        )}

        {leads.slice(0, 6).map((lead) => (
          <button
            key={lead.id}
            type="button"
            onClick={() => onSelectLead(lead)}
            className={`w-full rounded-md border p-3 text-right transition-colors ${
              selectedLeadId === lead.id
                ? "border-emerald-300 bg-emerald-50"
                : "border-[#f0e8dd] bg-white hover:bg-[#fbf7f0]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-[#1f1a17]">{lead.name}</p>
                <p className="text-xs text-[#7b7066]">
                  {typeLabels[lead.type]} ·{" "}
                  {lead.type === "event"
                    ? `${formatEventTime(lead.eventTime)} · ${
                        lead.guestsCount ?? "-"
                      } מוזמנים`
                    : "פנייה כללית"}
                </p>
                <p className="mt-1 text-xs text-[#9b9188]">
                  {formatShortDate(lead.eventDate)} · {formatCreatedAt(lead.createdAt)}
                </p>
              </div>
              <span className="rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600">
                {statusLabels[lead.status]}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function WeekCalendar({
  events,
  selectedLeadId,
  onSelectLead,
  onOpenEventDetails,
}: {
  events: Lead[];
  selectedLeadId?: string;
  onSelectLead: (lead: Lead) => void;
  onOpenEventDetails: (lead: Lead) => void;
}) {
  const days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, index) => addDays(today, index));
  }, []);

  return (
    <section className="rounded-lg border border-[#eee5d9] bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="font-bold text-[#1f1a17]">יומן אירועים</h3>
          <p className="text-sm text-[#7b7066]">שבוע קרוב לפי תאריך אירוע</p>
        </div>
        <AdminEventDialog
          trigger={
            <Button type="button" size="sm" variant="outline" className="gap-2 self-start">
              אירוע חדש
            </Button>
          }
        />
      </div>

      <div className="grid min-h-[28rem] grid-cols-1 overflow-hidden rounded-md border border-[#eee5d9] md:grid-cols-7">
        {days.map((day) => {
          const key = getDateKey(day);
          const dayEvents = events.filter((event) => event.eventDate === key);

          return (
            <div key={key} className="min-h-32 border-b border-[#eee5d9] p-3 md:border-b-0 md:border-l">
              <div className="mb-3 text-center">
                <p className="text-xs font-semibold text-[#7b7066]">
                  {new Intl.DateTimeFormat("he-IL", { weekday: "short" }).format(day)}
                </p>
                <p className="text-sm font-bold text-[#1f1a17]">{formatShortDate(key)}</p>
              </div>

              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => {
                      onSelectLead(event);
                      onOpenEventDetails(event);
                    }}
                    className={`w-full rounded-md border p-2 text-right text-xs transition-colors ${
                      selectedLeadId === event.id
                        ? "border-emerald-400 bg-emerald-50"
                        : "border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100"
                    }`}
                  >
                    <p className="font-bold text-emerald-900">{event.name}</p>
                    <p className="text-emerald-800">
                      {formatEventTime(event.eventTime)} ·{" "}
                      {event.guestsCount ?? "-"} מוזמנים
                    </p>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LeadDetails({
  lead,
  onOpenEventDetails,
}: {
  lead: Lead | null;
  onOpenEventDetails: (lead: Lead) => void;
}) {
  if (!lead) {
    return (
      <aside className="rounded-lg border border-[#eee5d9] bg-white p-5 shadow-sm">
        <h3 className="font-bold text-[#1f1a17]">פרטי הפנייה</h3>
        <p className="mt-4 text-sm text-[#7b7066]">בחר פנייה מהרשימה או מהיומן.</p>
      </aside>
    );
  }

  const whatsappNumber = formatPhoneForWhatsApp(lead.phone);

  return (
    <aside className="rounded-lg border border-[#eee5d9] bg-white p-5 shadow-sm">
      <div className="mb-5 text-center">
        <span className="rounded-full bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-600">
          {statusLabels[lead.status]}
        </span>
        <h3 className="mt-3 text-xl font-bold text-[#1f1a17]">{lead.name}</h3>
        <p className="text-sm text-[#7b7066]">{typeLabels[lead.type]}</p>
      </div>

      <div className="space-y-3 border-y border-[#eee5d9] py-4 text-sm">
        <p className="flex items-center justify-between gap-3">
          <span className="text-[#7b7066]">טלפון</span>
          <span dir="ltr" className="font-semibold text-[#1f1a17]">
            {lead.phone}
          </span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="text-[#7b7066]">מקור</span>
          <span className="font-semibold text-[#1f1a17]">{lead.source}</span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="text-[#7b7066]">תאריך אירוע</span>
          <span className="font-semibold text-[#1f1a17]">
            {formatShortDate(lead.eventDate)}
          </span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="text-[#7b7066]">שעת הגעה</span>
          <span className="font-semibold text-[#1f1a17]">
            {lead.type === "event" ? formatEventTime(lead.eventTime) : "-"}
          </span>
        </p>
        <p className="flex items-center justify-between gap-3">
          <span className="text-[#7b7066]">מוזמנים</span>
          <span className="font-semibold text-[#1f1a17]">
            {lead.guestsCount ?? "-"}
          </span>
        </p>
      </div>

      {lead.message && (
        <div className="border-b border-[#eee5d9] py-4">
          <p className="mb-2 text-sm font-semibold text-[#1f1a17]">הערות לקוח</p>
          <p className="whitespace-pre-wrap text-sm leading-6 text-[#5f554d]">
            {lead.message}
          </p>
        </div>
      )}

      <div className="mt-5 space-y-2">
        {lead.type === "event" && (
          <Button
            type="button"
            className="h-11 w-full"
            onClick={() => onOpenEventDetails(lead)}
          >
            פרטים ועריכה
          </Button>
        )}
        <Button asChild className="h-11 w-full gap-2 bg-emerald-600 text-white">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
          >
            <MessageCircle className="size-4" />
            פתח WhatsApp
          </a>
        </Button>
        <Button asChild variant="secondary" className="h-11 w-full gap-2">
          <a href={`tel:${formatPhoneForTel(lead.phone)}`} dir="ltr">
            <Phone className="size-4" />
            התקשר ללקוח
          </a>
        </Button>
      </div>
    </aside>
  );
}

export default function AdminDashboardPage() {
  const { session } = useAdminAuth();
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [editingEvent, setEditingEvent] = useState<Lead | null>(null);
  const leadsQuery = useQuery({
    queryKey: ["admin", "leads"],
    queryFn: () => fetchAdminLeads(session!),
    enabled: Boolean(session),
  });

  const leads = leadsQuery.data ?? [];
  const events = leads.filter((lead) => lead.type === "event");
  const todayKey = getDateKey(new Date());
  const weekKeys = new Set(
    Array.from({ length: 7 }, (_, index) => getDateKey(addDays(new Date(), index))),
  );
  const selectedLead =
    leads.find((lead) => lead.id === selectedLeadId) ?? leads[0] ?? null;

  const stats = {
    newLeads: leads.filter((lead) => lead.status === "new").length,
    todayEvents: events.filter((lead) => lead.eventDate === todayKey).length,
    weekEvents: events.filter((lead) => lead.eventDate && weekKeys.has(lead.eventDate))
      .length,
    monthEvents: events.filter((lead) => isDateInMonth(lead.eventDate, new Date()))
      .length,
  };

  return (
    <AdminLayout title="סקירה כללית">
      {leadsQuery.isError && (
        <div className="mb-5 rounded-lg border border-rose-200 bg-rose-50 p-4 text-rose-900">
          <p>טעינת הדשבורד נכשלה</p>
          {leadsQuery.error instanceof Error && (
            <p className="mt-2 text-sm" dir="ltr">
              {leadsQuery.error.message}
            </p>
          )}
        </div>
      )}

      <div className="mb-5 grid gap-4 md:grid-cols-4">
        <StatCard
          label="פניות חדשות"
          value={stats.newLeads}
          helper="ממתינות לטיפול"
          icon={MessageCircle}
          tone="green"
        />
        <StatCard
          label="אירועים היום"
          value={stats.todayEvents}
          helper={formatShortDate(todayKey)}
          icon={CalendarDays}
          tone="gold"
        />
        <StatCard
          label="אירועים השבוע"
          value={stats.weekEvents}
          helper="7 ימים קרובים"
          icon={CalendarDays}
          tone="purple"
        />
        <StatCard
          label="אירועים החודש"
          value={stats.monthEvents}
          helper="לפי תאריך אירוע"
          icon={UsersRound}
          tone="blue"
        />
      </div>

      {leadsQuery.isLoading ? (
        <p className="rounded-lg border border-[#eee5d9] bg-white p-5 text-[#7b7066]">
          טוען דשבורד...
        </p>
      ) : (
        <div className="grid gap-5 xl:grid-cols-[18rem_minmax(0,1fr)_18rem]">
          <RecentLeadList
            leads={leads}
            selectedLeadId={selectedLead?.id}
            onSelectLead={(lead) => setSelectedLeadId(lead.id)}
          />
          <WeekCalendar
            events={events}
            selectedLeadId={selectedLead?.id}
            onSelectLead={(lead) => setSelectedLeadId(lead.id)}
            onOpenEventDetails={setEditingEvent}
          />
          <LeadDetails
            lead={selectedLead}
            onOpenEventDetails={setEditingEvent}
          />
        </div>
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
