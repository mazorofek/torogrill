import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useI18n } from "@/i18n/I18nProvider";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormValues = {
  fullName: string;
  phone: string;
  date: string;
  guests: number;
  notes?: string;
};

export function EventsSection() {
  const { dir, t } = useI18n();
  const { toast } = useToast();
  const formSchema = useMemo(
    () =>
      z.object({
        fullName: z.string().min(2, t.events.validation.fullName),
        phone: z.string().min(9, t.events.validation.phone),
        date: z.string().min(1, t.events.validation.date),
        guests: z.coerce.number().min(1, t.events.validation.guests),
        notes: z.string().optional(),
      }),
    [t],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      date: "",
      guests: 2,
      notes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 429) {
        toast({
          title: t.events.toasts.rateLimitTitle,
          description: t.events.toasts.rateLimitDescription,
          variant: "destructive",
        });
        return;
      }

      if (!response.ok) {
        throw new Error("Event request failed");
      }

      toast({
        title: t.events.toasts.successTitle,
        description: t.events.toasts.successDescription,
        variant: "default",
      });
      form.reset();
    } catch {
      toast({
        title: t.events.toasts.errorTitle,
        description: t.events.toasts.errorDescription,
        variant: "destructive",
      });
    }
  };

  return (
    <section id="events" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#060606] z-0" />
      <div
        className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #d71920 0px, #d71920 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #d71920 0px, #d71920 1px, transparent 1px, transparent 60px)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            {t.events.title}
          </h2>
          <div className="w-20 h-[3px] bg-primary mx-auto mb-6" />
          <p className="text-base text-white/55 font-light max-w-xl mx-auto leading-relaxed">
            {t.events.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-black/60 backdrop-blur-sm border border-primary/20 p-8 md:p-12 shadow-2xl"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              dir={dir}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">
                        {t.events.fields.fullName}
                      </FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-fullname"
                          placeholder={t.events.placeholders.fullName}
                          {...field}
                          className="bg-white/5 border-white/15 focus-visible:border-primary rounded-none h-12 text-white placeholder:text-white/30"
                        />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">
                        {t.events.fields.phone}
                      </FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-phone"
                          type="tel"
                          placeholder={t.events.placeholders.phone}
                          {...field}
                          className={`bg-white/5 border-white/15 focus-visible:border-primary rounded-none h-12 text-white placeholder:text-white/30 ${
                            dir === "rtl" ? "text-right" : "text-left"
                          }`}
                          dir="ltr"
                        />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">
                        {t.events.fields.date}
                      </FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-date"
                          type="date"
                          {...field}
                          className="bg-white/5 border-white/15 focus-visible:border-primary rounded-none h-12 text-white appearance-none"
                        />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guests"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/80">
                        {t.events.fields.guests}
                      </FormLabel>
                      <FormControl>
                        <Input
                          data-testid="input-guests"
                          type="number"
                          min="1"
                          {...field}
                          className="bg-white/5 border-white/15 focus-visible:border-primary rounded-none h-12 text-white"
                        />
                      </FormControl>
                      <FormMessage className="text-primary" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white/80">
                      {t.events.fields.notes}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        data-testid="input-notes"
                        placeholder={t.events.placeholders.notes}
                        className="bg-white/5 border-white/15 focus-visible:border-primary rounded-none min-h-[120px] resize-y text-white placeholder:text-white/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-primary" />
                  </FormItem>
                )}
              />

              <Button
                data-testid="button-submit-events"
                type="submit"
                size="lg"
                disabled={form.formState.isSubmitting}
                className="w-full bg-primary text-white hover:bg-primary/90 rounded-none h-14 text-lg font-serif tracking-wide transition-all mt-4 border-none"
              >
                {form.formState.isSubmitting && (
                  <LoaderCircle size={18} className="animate-spin" />
                )}
                {form.formState.isSubmitting
                  ? t.events.submitting
                  : t.events.submit}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}
