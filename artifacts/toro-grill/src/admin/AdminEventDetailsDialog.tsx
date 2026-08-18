import { type FormEvent, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
  Phone,
  Save,
  Send,
  UsersRound,
} from "lucide-react";
import { useAdminAuth } from "@/admin/AdminAuthProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Lead, type LeadStatus, updateAdminLead } from "@/lib/adminApi";
import { formatPhoneForTel, getWhatsAppHref } from "@/lib/phone";

type EventEditForm = {
  name: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  guestsCount: string;
  status: LeadStatus;
  message: string;
  notes: string;
};

const statusLabels: Record<LeadStatus, string> = {
  new: "חדש",
  contacted: "נוצר קשר",
  closed: "נסגר",
  canceled: "בוטל",
};

const statusOptions = Object.entries(statusLabels) as [LeadStatus, string][];

function getInitialForm(lead: Lead): EventEditForm {
  return {
    name: lead.name,
    phone: lead.phone,
    eventDate: lead.eventDate ?? "",
    eventTime: lead.eventTime?.slice(0, 5) ?? "",
    guestsCount: String(lead.guestsCount ?? 1),
    status: lead.status,
    message: lead.message ?? "",
    notes: lead.notes,
  };
}

function formatDateOnly(value: string | null): string {
  if (!value) return "ללא תאריך";
  const [year, month, day] = value.split("-");
  return day && month && year ? `${day}.${month}.${year}` : value;
}

function buildWhatsAppTemplates(form: EventEditForm) {
  const date = formatDateOnly(form.eventDate || null);
  const time = form.eventTime ? ` בשעה ${form.eventTime}` : "";
  const guests = form.guestsCount ? ` עבור ${form.guestsCount} מוזמנים` : "";

  return [
    {
      label: "בירור פרטים",
      text: `שלום ${form.name}, מדברים מטורו גריל לגבי האירוע בתאריך ${date}. נשמח לאשר שעה וכמות מוזמנים.`,
    },
    {
      label: "אישור אירוע",
      text: `שלום ${form.name}, האירוע בטורו גריל אושר לתאריך ${date}${time}${guests}. נשמח לראותכם!`,
    },
    {
      label: "בקשת שיחה",
      text: `שלום ${form.name}, מדברים מטורו גריל. נשמח לשוחח קצרות כדי לסגור את פרטי האירוע.`,
    },
  ];
}

export function AdminEventDetailsDialog({
  lead,
  open,
  onOpenChange,
}: {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { session } = useAdminAuth();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<EventEditForm | null>(
    lead ? getInitialForm(lead) : null,
  );
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(lead ? getInitialForm(lead) : null);
    setError("");
  }, [lead]);

  const updateMutation = useMutation({
    mutationFn: () => {
      if (!lead || !form) throw new Error("לא נבחר אירוע");

      return updateAdminLead(session!, lead.id, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        eventDate: form.eventDate || null,
        eventTime: form.eventTime || null,
        guestsCount: Number(form.guestsCount),
        status: form.status,
        message: form.message.trim() || null,
        notes: form.notes,
      });
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin"] });
      setError("");
      onOpenChange(false);
    },
    onError: (nextError) => {
      setError(
        nextError instanceof Error ? nextError.message : "עדכון האירוע נכשל",
      );
    },
  });

  const updateField = (field: keyof EventEditForm, value: string) => {
    setForm((current) => (current ? { ...current, [field]: value } : current));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form) return;
    if (!form.name.trim() || !form.phone.trim() || !form.eventDate) {
      setError("שם, טלפון ותאריך אירוע הם שדות חובה.");
      return;
    }

    if (
      !Number.isFinite(Number(form.guestsCount)) ||
      Number(form.guestsCount) < 1
    ) {
      setError("מספר מוזמנים חייב להיות 1 ומעלה.");
      return;
    }

    updateMutation.mutate();
  };

  const whatsappTemplates = form ? buildWhatsAppTemplates(form) : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="max-h-[92vh] max-w-3xl overflow-y-auto border-[#eee5d9] bg-white text-[#1f1a17]"
      >
        <DialogHeader className="text-right">
          <DialogTitle>פרטי אירוע</DialogTitle>
          <DialogDescription>
            צפייה בפרטי האירוע ועדכון שעה, כמות מוזמנים, סטטוס והערות.
          </DialogDescription>
        </DialogHeader>

        {!lead || !form ? (
          <p className="text-sm text-[#7b7066]">לא נבחר אירוע.</p>
        ) : (
          <>
            <div className="grid gap-3 rounded-lg border border-[#eee5d9] bg-[#fbf7f0] p-4 text-sm md:grid-cols-5">
              <div>
                <p className="text-[#8b8178]">לקוח</p>
                <p className="font-bold text-[#1f1a17]">{lead.name}</p>
              </div>
              <div>
                <p className="text-[#8b8178]">תאריך</p>
                <p className="font-bold text-[#1f1a17]">
                  {formatDateOnly(lead.eventDate)}
                </p>
              </div>
              <div>
                <p className="text-[#8b8178]">שעה</p>
                <p className="font-bold text-[#1f1a17]">
                  {lead.eventTime?.slice(0, 5) ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-[#8b8178]">מוזמנים</p>
                <p className="flex items-center gap-1 font-bold text-[#1f1a17]">
                  <UsersRound className="size-4 text-primary" />
                  {lead.guestsCount ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-[#8b8178]">מקור</p>
                <p className="font-bold text-[#1f1a17]">{lead.source}</p>
              </div>
            </div>

            <div className="grid gap-2 md:grid-cols-2">
              <Button asChild className="h-11 gap-2 bg-emerald-600 text-white">
                <a
                  href={getWhatsAppHref(form.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="ltr"
                >
                  <MessageCircle className="size-4" />
                  שליחת WhatsApp
                </a>
              </Button>
              <Button asChild variant="secondary" className="h-11 gap-2">
                <a href={`tel:${formatPhoneForTel(lead.phone)}`} dir="ltr">
                  <Phone className="size-4" />
                  התקשר ללקוח
                </a>
              </Button>
            </div>

            <section className="rounded-lg border border-emerald-100 bg-emerald-50/70 p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-emerald-950">
                    הודעות מוכנות
                  </h3>
                  <p className="text-xs text-emerald-800">
                    נפתח ב-WhatsApp עם טקסט שאפשר לערוך לפני שליחה.
                  </p>
                </div>
                <Send className="size-5 text-emerald-700" />
              </div>

              <div className="grid gap-2 md:grid-cols-3">
                {whatsappTemplates.map((template) => (
                  <Button
                    key={template.label}
                    asChild
                    type="button"
                    variant="outline"
                    className="h-auto min-h-11 justify-center whitespace-normal border-emerald-200 bg-white px-3 py-2 text-emerald-950"
                  >
                    <a
                      href={getWhatsAppHref(form.phone, template.text)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {template.label}
                    </a>
                  </Button>
                ))}
              </div>
            </section>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="rounded-lg border border-[#eee5d9] bg-white p-3">
                <p className="mb-2 text-sm font-medium text-[#5f554d]">
                  שינוי סטטוס מהיר
                </p>
                <div className="grid gap-2 sm:grid-cols-4">
                  {statusOptions.map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => updateField("status", value)}
                      className={`flex h-10 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold transition-colors ${
                        form.status === value
                          ? "border-primary bg-primary text-white"
                          : "border-[#e6dfd4] bg-[#fbf7f0] text-[#5f554d] hover:bg-white"
                      }`}
                    >
                      {form.status === value && (
                        <CheckCircle2 className="size-4" />
                      )}
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5f554d]">
                    שם לקוח
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    required
                    className="h-11 w-full rounded-md border border-[#e6dfd4] bg-white px-3 text-[#1f1a17] outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5f554d]">
                    טלפון
                  </span>
                  <input
                    value={form.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    required
                    inputMode="tel"
                    dir="ltr"
                    className="h-11 w-full rounded-md border border-[#e6dfd4] bg-white px-3 text-left text-[#1f1a17] outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5f554d]">
                    תאריך אירוע
                  </span>
                  <input
                    value={form.eventDate}
                    onChange={(event) =>
                      updateField("eventDate", event.target.value)
                    }
                    required
                    type="date"
                    className="h-11 w-full rounded-md border border-[#e6dfd4] bg-white px-3 text-[#1f1a17] outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5f554d]">
                    שעת הגעה
                  </span>
                  <input
                    value={form.eventTime}
                    onChange={(event) =>
                      updateField("eventTime", event.target.value)
                    }
                    type="time"
                    className="h-11 w-full rounded-md border border-[#e6dfd4] bg-white px-3 text-[#1f1a17] outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5f554d]">
                    מספר מוזמנים
                  </span>
                  <input
                    value={form.guestsCount}
                    onChange={(event) =>
                      updateField("guestsCount", event.target.value)
                    }
                    required
                    type="number"
                    min="1"
                    className="h-11 w-full rounded-md border border-[#e6dfd4] bg-white px-3 text-[#1f1a17] outline-none focus:border-primary"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#5f554d]">
                    סטטוס
                  </span>
                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateField("status", event.target.value as LeadStatus)
                    }
                    className="h-11 w-full rounded-md border border-[#e6dfd4] bg-white px-3 text-[#1f1a17] outline-none focus:border-primary"
                  >
                    {statusOptions.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#5f554d]">
                  הערות לקוח / פרטי האירוע
                </span>
                <textarea
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  rows={3}
                  className="w-full resize-y rounded-md border border-[#e6dfd4] bg-white px-3 py-2 text-[#1f1a17] outline-none focus:border-primary"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#5f554d]">
                  הערות פנימיות לצוות
                </span>
                <textarea
                  value={form.notes}
                  onChange={(event) => updateField("notes", event.target.value)}
                  rows={3}
                  className="w-full resize-y rounded-md border border-[#e6dfd4] bg-white px-3 py-2 text-[#1f1a17] outline-none focus:border-primary"
                />
              </label>

              <div className="min-h-6 text-sm" aria-live="polite">
                {error && <p className="text-primary">{error}</p>}
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  סגור
                </Button>
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="gap-2"
                >
                  {updateMutation.isPending ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  שמירת שינויים
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
