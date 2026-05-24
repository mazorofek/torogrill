import { motion } from "framer-motion";
import { type FormEvent, useState } from "react";
import { Clock, LoaderCircle, Mail, MapPin, Phone, Send } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

type ContactForm = {
  name: string;
  phone: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  phone: "",
  message: "",
};

export function ContactSection() {
  const { dir, t } = useI18n();
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error(t.contact.error);
      }

      setForm(initialForm);
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : t.contact.error);
    }
  };

  return (
    <section
      id="contact"
      className="py-24 bg-background border-t border-white/5 relative"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            {t.contact.title}
          </h2>
          <div className="w-20 h-[3px] bg-primary mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          dir={dir}
        >
          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-8"
          >
            <h3 className="text-2xl font-serif text-white border-b border-primary/40 pb-4">
              {t.contact.detailsTitle}
            </h3>

            <div className="space-y-6">
              <a
                href="tel:03-952-0450"
                className="flex items-start gap-4 group"
                data-testid="link-phone"
              >
                <div className="mt-1 bg-white/5 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/45 mb-1">
                    {t.contact.phoneLabel}
                  </p>
                  <p className="text-lg font-light text-white" dir="ltr">
                    03-952-0450
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white/5 p-3 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/45 mb-1">
                    {t.contact.addressLabel}
                  </p>
                  <p className="text-lg font-light text-white">
                    {t.contact.address}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-8"
          >
            <h3 className="text-2xl font-serif text-white border-b border-primary/40 pb-4">
              {t.contact.hoursTitle}
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white/5 p-3 text-primary">
                  <Clock size={20} />
                </div>
                <div className="w-full space-y-4">
                  {t.contact.days.map((day, index) => (
                    <div
                      key={day.label}
                      className={`flex justify-between items-center pb-3 ${
                        index < t.contact.days.length - 1
                          ? "border-b border-white/8"
                          : ""
                      }`}
                    >
                      <span className="text-white font-light">{day.label}</span>
                      <span className="text-white/50" dir="ltr">
                        {day.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-8"
          >
            <h3 className="text-2xl font-serif text-white border-b border-primary/40 pb-4">
              {t.contact.formTitle}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-testid="contact-form"
            >
              <label className="block">
                <span className="mb-2 block text-sm text-white/55">
                  {t.contact.fields.name}
                </span>
                <input
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  required
                  className="h-12 w-full border border-white/12 bg-white/[0.03] px-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary"
                  data-testid="input-contact-name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/55">
                  {t.contact.fields.phone}
                </span>
                <input
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  required
                  inputMode="tel"
                  className="h-12 w-full border border-white/12 bg-white/[0.03] px-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary"
                  data-testid="input-contact-phone"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/55">
                  {t.contact.fields.message}
                </span>
                <textarea
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  required
                  rows={4}
                  className="min-h-32 w-full resize-none border border-white/12 bg-white/[0.03] px-4 py-3 text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary"
                  data-testid="textarea-contact-message"
                />
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex h-12 w-full items-center justify-center gap-2 bg-primary px-5 font-medium text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                data-testid="button-contact-submit"
              >
                {status === "sending" ? (
                  <LoaderCircle size={18} className="animate-spin" />
                ) : (
                  <Send size={18} />
                )}
                <span>
                  {status === "sending"
                    ? t.contact.submitting
                    : t.contact.submit}
                </span>
              </button>
              <div className="min-h-6 text-sm" aria-live="polite">
                {status === "sent" && (
                  <p className="flex items-center gap-2 text-white/75">
                    <Mail size={16} className="text-primary" />
                    {t.contact.success}
                  </p>
                )}
                {status === "error" && (
                  <p className="text-primary">{errorMessage}</p>
                )}
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
