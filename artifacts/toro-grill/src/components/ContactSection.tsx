import { motion } from "framer-motion";
import { type FormEvent, useState } from "react";
import {
  Clock,
  LoaderCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

type ContactForm = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  phone: "",
  email: "",
  message: "",
};

export function ContactSection() {
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
        throw new Error("שליחת ההודעה נכשלה");
      }

      setForm(initialForm);
      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "שליחת ההודעה נכשלה",
      );
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
            צרו קשר
          </h2>
          <div className="w-20 h-[3px] bg-primary mx-auto" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          dir="rtl"
        >
          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col space-y-8"
          >
            <h3 className="text-2xl font-serif text-white border-b border-primary/40 pb-4">
              פרטים
            </h3>

            <div className="space-y-6">
              <a
                href="tel:04-1234567"
                className="flex items-start gap-4 group"
                data-testid="link-phone"
              >
                <div className="mt-1 bg-white/5 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/45 mb-1">טלפון להזמנות</p>
                  <p className="text-lg font-light text-white" dir="ltr">
                    04-1234567
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/9724123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
                data-testid="link-whatsapp"
              >
                <div className="mt-1 bg-white/5 p-3 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/45 mb-1">וואטסאפ</p>
                  <p className="text-lg font-light text-white">שלחו הודעה</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white/5 p-3 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/45 mb-1">כתובת</p>
                  <p className="text-lg font-light text-white">
                    סחרוב 20 ראשון לציון
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
              שעות פתיחה
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-white/5 p-3 text-primary">
                  <Clock size={20} />
                </div>
                <div className="w-full space-y-4">
                  <div className="flex justify-between items-center border-b border-white/8 pb-3">
                    <span className="text-white font-light">ראשון–חמישי</span>
                    <span className="text-white/50" dir="ltr">
                      12:00–23:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/8 pb-3">
                    <span className="text-white font-light">שישי</span>
                    <span className="text-white/50" dir="ltr">
                      12:00–15:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3">
                    <span className="text-white font-light">שבת</span>
                    <span className="text-white/50" dir="ltr">
                      19:00–23:00
                    </span>
                  </div>
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
              השאירו פרטים
            </h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
              data-testid="contact-form"
            >
              <label className="block">
                <span className="mb-2 block text-sm text-white/55">שם</span>
                <input
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  required
                  className="h-12 w-full border border-white/12 bg-white/[0.03] px-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary"
                  data-testid="input-contact-name"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/55">טלפון</span>
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
                <span className="mb-2 block text-sm text-white/55">אימייל</span>
                <input
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  type="email"
                  className="h-12 w-full border border-white/12 bg-white/[0.03] px-4 text-white outline-none transition-colors placeholder:text-white/30 focus:border-primary"
                  data-testid="input-contact-email"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/55">הודעה</span>
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
                <span>{status === "sending" ? "שולח..." : "שליחה"}</span>
              </button>
              <div className="min-h-6 text-sm" aria-live="polite">
                {status === "sent" && (
                  <p className="flex items-center gap-2 text-white/75">
                    <Mail size={16} className="text-primary" />
                    ההודעה נשלחה בהצלחה
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
