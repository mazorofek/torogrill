import { motion } from "framer-motion";
import { Flame, Utensils, UsersRound } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

const highlightIcons = [Flame, Utensils, UsersRound] as const;

export function AboutSection() {
  const { dir, t } = useI18n();

  return (
    <section
      id="about"
      className="bg-secondary/35 py-24 border-y border-white/5"
    >
      <div className="container mx-auto max-w-6xl px-4" dir={dir}>
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-primary">
              {t.about.eyebrow}
            </p>
            <h2 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl">
              {t.about.title}
            </h2>
            <div className="space-y-4 text-lg leading-8 text-white/70">
              {t.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid gap-5"
          >
            {t.about.highlights.map((item, index) => {
              const Icon = highlightIcons[index] ?? Flame;

              return (
                <div key={item.title} className="border-t border-white/10 pt-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center bg-primary text-white">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="max-w-xl text-base leading-7 text-white/60">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
