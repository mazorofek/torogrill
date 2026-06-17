import { type FormEvent, type ReactNode, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CalendarPlus, LoaderCircle } from "lucide-react";
import { useAdminAuth } from "@/admin/AdminAuthProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createAdminEvent } from "@/lib/adminApi";

type EventForm = {
  name: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  guestsCount: string;
  message: string;
};

const initialForm: EventForm = {
  name: "",
  phone: "",
  eventDate: "",
  eventTime: "",
  guestsCount: "10",
  message: "",
};

export function AdminEventDialog({ trigger }: { trigger?: ReactNode }) {
  const { session } = useAdminAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<EventForm>(initialForm);
  const [error, setError] = useState("");

  const createMutation = useMutation({
    mutationFn: () =>
      createAdminEvent(session!, {
        name: form.name.trim(),
        phone: form.phone.trim(),
        eventDate: form.eventDate,
        eventTime: form.eventTime || undefined,
        guestsCount: Number(form.guestsCount),
        message: form.message.trim() || undefined,
        source: "הוספה ידנית",
      }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin"] });
      setForm(initialForm);
      setError("");
      setOpen(false);
    },
    onError: (nextError) => {
      setError(
        nextError instanceof Error ? nextError.message : "שמירת האירוע נכשלה",
      );
    },
  });

  const updateField = (field: keyof EventForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.phone.trim() || !form.eventDate) {
      setError("שם, טלפון ותאריך אירוע הם שדות חובה.");
      return;
    }

    if (!Number.isFinite(Number(form.guestsCount)) || Number(form.guestsCount) < 1) {
      setError("מספר מוזמנים חייב להיות 1 ומעלה.");
      return;
    }

    createMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button type="button" className="gap-2">
            <CalendarPlus className="size-4" />
            אירוע חדש
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        dir="rtl"
        className="max-w-xl border-[#eee5d9] bg-white text-[#1f1a17]"
      >
        <DialogHeader className="text-right">
          <DialogTitle>הוספת אירוע חדש</DialogTitle>
          <DialogDescription>
            האירוע יתווסף ליומן ויופיע גם ברשימת הלידים.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#5f554d]">
                שם לקוח
              </span>
              <input
                value={form.name}
                onChange={(event) => updateField("name", event.target.value)}
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
                onChange={(event) => updateField("phone", event.target.value)}
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
                onChange={(event) => updateField("eventDate", event.target.value)}
                required
                type="date"
                className="h-11 w-full rounded-md border border-[#e6dfd4] bg-white px-3 text-[#1f1a17] outline-none focus:border-primary"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-[#5f554d]">
                שעה
              </span>
              <input
                value={form.eventTime}
                onChange={(event) => updateField("eventTime", event.target.value)}
                type="time"
                className="h-11 w-full rounded-md border border-[#e6dfd4] bg-white px-3 text-[#1f1a17] outline-none focus:border-primary"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-medium text-[#5f554d]">
                מספר מוזמנים
              </span>
              <input
                value={form.guestsCount}
                onChange={(event) => updateField("guestsCount", event.target.value)}
                required
                type="number"
                min="1"
                className="h-11 w-full rounded-md border border-[#e6dfd4] bg-white px-3 text-[#1f1a17] outline-none focus:border-primary"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#5f554d]">
              הערות
            </span>
            <textarea
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              rows={4}
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
              onClick={() => setOpen(false)}
            >
              ביטול
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending}
              className="gap-2"
            >
              {createMutation.isPending && (
                <LoaderCircle className="size-4 animate-spin" />
              )}
              שמירת אירוע
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
