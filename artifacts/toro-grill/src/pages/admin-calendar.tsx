import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Edit3,
  MessageCircle,
  Phone,
  UsersRound,
} from "lucide-react";
import { AdminEventDetailsDialog } from "@/admin/AdminEventDetailsDialog";
import { AdminEventDialog } from "@/admin/AdminEventDialog";
import { AdminLayout } from "@/admin/AdminLayout";
import { useAdminAuth } from "@/admin/AdminAuthProvider";
import { Button } from "@/components/ui/button";
import { fetchAdminEvents, type Lead } from "@/lib/adminApi";
import { formatPhoneForTel, formatPhoneForWhatsApp } from "@/lib/phone";

const weekDays = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function formatMonthTitle(date: Date): string {
  return new Intl.DateTimeFormat("he-IL", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatDateOnly(value: string | null): string {
  if (!value) return "ללא תאריך";
  const [year, month, day] = value.split("-");
  return day && month && year ? `${day}.${month}.${year}` : value;
}

function getMonthGrid(month: Date): Array<Date | null> {
  const firstDay = startOfMonth(month);
  const daysInMonth = new Date(
    firstDay.getFullYear(),
    firstDay.getMonth() + 1,
    0,
  ).getDate();
  const leadingEmptyDays = firstDay.getDay();
  const cells: Array<Date | null> = [];

  for (let index = 0; index < leadingEmptyDays; index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function EventLeadItem({
  lead,
  onOpenDetails,
}: {
  lead: Lead;
  onOpenDetails: (lead: Lead) => void;
}) {
  const whatsappNumber = formatPhoneForWhatsApp(lead.phone);

  return (
    <article className="rounded-lg border border-[#eee5d9] bg-white p-4 shadow-sm">
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-[#1f1a17]">{lead.name}</h3>
          <p className="text-sm text-[#7b7066]" dir="ltr">
            {lead.phone}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-[#5f554d]">
          <UsersRound className="size-4 text-primary" />
          {lead.guestsCount ?? "-"} מוזמנים
        </div>
      </div>

      <dl className="mb-4 grid grid-cols-2 gap-3 text-sm text-[#5f554d]">
        <div>
          <dt className="text-[#8b8178]">תאריך</dt>
          <dd className="font-semibold text-[#1f1a17]">
            {formatDateOnly(lead.eventDate)}
          </dd>
        </div>
        <div>
          <dt className="text-[#8b8178]">שעה</dt>
          <dd className="font-semibold text-[#1f1a17]">
            {lead.eventTime?.slice(0, 5) ?? "-"}
          </dd>
        </div>
      </dl>

      {lead.message && (
        <p className="mb-4 whitespace-pre-wrap text-sm text-[#5f554d]">
          {lead.message}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          className="gap-2"
          onClick={() => onOpenDetails(lead)}
        >
          <Edit3 className="size-4" />
          פרטים ועריכה
        </Button>
        <Button asChild size="sm" variant="outline" className="gap-2">
          <a href={`tel:${formatPhoneForTel(lead.phone)}`} dir="ltr">
            <Phone className="size-4" />
            חיוג
          </a>
        </Button>
        <Button asChild size="sm" variant="outline" className="gap-2">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
          >
            <MessageCircle className="size-4" />
            WhatsApp
          </a>
        </Button>
      </div>
    </article>
  );
}

function MonthCalendar({
  month,
  eventsByDate,
  onOpenDetails,
}: {
  month: Date;
  eventsByDate: Map<string, Lead[]>;
  onOpenDetails: (lead: Lead) => void;
}) {
  const cells = getMonthGrid(month);
  const todayKey = getDateKey(new Date());

  return (
    <section className="rounded-lg border border-[#eee5d9] bg-white p-4 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-[#1f1a17]">
        {formatMonthTitle(month)}
      </h2>

      <div className="grid grid-cols-7 border-y border-r border-[#eee5d9] text-center text-xs font-semibold text-[#7b7066]">
        {weekDays.map((day) => (
          <div key={day} className="border-l border-[#eee5d9] bg-[#fbf7f0] py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-r border-[#eee5d9]">
        {cells.map((date, index) => {
          const key = date ? getDateKey(date) : `empty-${index}`;
          const dayEvents = date ? eventsByDate.get(key) ?? [] : [];
          const isToday = date && key === todayKey;

          return (
            <div
              key={key}
              className={`min-h-28 border-b border-l border-[#eee5d9] p-2 ${
                date ? "bg-white" : "bg-[#fbf7f0]"
              }`}
            >
              {date && (
                <>
                  <div
                    className={`mb-2 flex size-7 items-center justify-center rounded-full text-sm font-bold ${
                      isToday
                        ? "bg-primary text-white"
                        : "text-[#1f1a17]"
                    }`}
                  >
                    {date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((event) => (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => onOpenDetails(event)}
                        className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-right text-xs text-emerald-900"
                      >
                        <p className="truncate font-bold">{event.name}</p>
                        <p className="truncate">
                          {event.eventTime?.slice(0, 5) ?? "שעה פתוחה"} ·{" "}
                          {event.guestsCount ?? "-"} מוזמנים
                        </p>
                      </button>
                    ))}
                    {dayEvents.length > 3 && (
                      <p className="text-xs font-semibold text-[#7b7066]">
                        +{dayEvents.length - 3} נוספים
                      </p>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function AdminCalendarPage() {
  const { session } = useAdminAuth();
  const [monthCursor, setMonthCursor] = useState(() => startOfMonth(new Date()));
  const [selectedEvent, setSelectedEvent] = useState<Lead | null>(null);
  const eventsQuery = useQuery({
    queryKey: ["admin", "events"],
    queryFn: () => fetchAdminEvents(session!),
    enabled: Boolean(session),
  });

  const events = eventsQuery.data ?? [];
  const eventsByDate = useMemo(() => {
    const map = new Map<string, Lead[]>();

    for (const event of events) {
      if (!event.eventDate) continue;
      map.set(event.eventDate, [...(map.get(event.eventDate) ?? []), event]);
    }

    return map;
  }, [events]);

  const visibleMonths = useMemo(
    () => [monthCursor, addMonths(monthCursor, 1), addMonths(monthCursor, 2)],
    [monthCursor],
  );

  const visibleMonthKeys = new Set(
    visibleMonths.map((month) => `${month.getFullYear()}-${month.getMonth()}`),
  );
  const visibleEvents = events.filter((event) => {
    if (!event.eventDate) return false;
    const [year, month] = event.eventDate.split("-").map(Number);
    return visibleMonthKeys.has(`${year}-${month - 1}`);
  });

  return (
    <AdminLayout title="יומן אירועים">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <CalendarDays className="size-6 text-primary" />
          <div>
            <p className="text-2xl font-semibold text-[#1f1a17]">
              {events.length} אירועים ביומן
            </p>
            <p className="text-sm text-[#7b7066]">
              מוצגים שלושה חודשים: {formatMonthTitle(monthCursor)} עד{" "}
              {formatMonthTitle(addMonths(monthCursor, 2))}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => setMonthCursor((current) => addMonths(current, -1))}
          >
            <ChevronRight className="size-4" />
            חודש קודם
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setMonthCursor(startOfMonth(new Date()))}
          >
            היום
          </Button>
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={() => setMonthCursor((current) => addMonths(current, 1))}
          >
            חודש הבא
            <ChevronLeft className="size-4" />
          </Button>
          <AdminEventDialog />
        </div>
      </div>

      {eventsQuery.isLoading && (
        <p className="rounded-lg border border-[#eee5d9] bg-white p-4 text-[#7b7066] shadow-sm">
          טוען אירועים...
        </p>
      )}

      {eventsQuery.isError && (
        <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-[#1f1a17]">
          <p>טעינת האירועים נכשלה</p>
          {eventsQuery.error instanceof Error && (
            <p className="mt-2 text-sm text-[#7b7066]" dir="ltr">
              {eventsQuery.error.message}
            </p>
          )}
        </div>
      )}

      {!eventsQuery.isLoading && (
        <>
          <div className="space-y-5">
            {visibleMonths.map((month) => (
              <MonthCalendar
                key={`${month.getFullYear()}-${month.getMonth()}`}
                month={month}
                eventsByDate={eventsByDate}
                onOpenDetails={setSelectedEvent}
              />
            ))}
          </div>

          <section className="mt-6">
            <div className="mb-3 flex items-center justify-between border-b border-[#e6dfd4] pb-2">
              <h2 className="text-xl font-semibold text-[#1f1a17]">
                אירועים בטווח המוצג
              </h2>
              <span className="text-sm text-[#7b7066]">
                {visibleEvents.length} אירועים
              </span>
            </div>

            {visibleEvents.length === 0 ? (
              <p className="rounded-lg border border-[#eee5d9] bg-white p-4 text-[#7b7066] shadow-sm">
                אין אירועים בטווח המוצג.
              </p>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {visibleEvents.map((lead) => (
                  <EventLeadItem
                    key={lead.id}
                    lead={lead}
                    onOpenDetails={setSelectedEvent}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
      <AdminEventDetailsDialog
        lead={selectedEvent}
        open={Boolean(selectedEvent)}
        onOpenChange={(open) => {
          if (!open) setSelectedEvent(null);
        }}
      />
    </AdminLayout>
  );
}
