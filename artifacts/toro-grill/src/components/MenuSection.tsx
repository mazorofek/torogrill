import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift } from "lucide-react";
import { menuSections } from "@/data/menu";
import menuLogo from "@/assets/images/toro-logo-real.png";

export function MenuSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = menuSections[activeIndex];

  return (
    <section
      id="menu"
      className="relative overflow-hidden py-24 bg-background border-b border-white/5"
    >
      <img
        src={menuLogo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[56%] z-0 w-[min(76rem,118vw)] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.065] mix-blend-screen"
      />
      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            התפריט שלנו
          </h2>
          <div className="w-20 h-[3px] bg-primary mx-auto" />
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" dir="rtl">
          {menuSections.map((section, idx) => (
            <button
              key={section.title}
              data-testid={`tab-menu-${section.title}`}
              onClick={() => setActiveIndex(idx)}
              className={`
                px-5 py-2.5 text-base font-medium transition-all duration-200 border rounded-none
                ${
                  activeIndex === idx
                    ? "bg-primary text-white border-primary"
                    : "bg-transparent text-white/60 border-white/15 hover:border-primary/50 hover:text-white/90"
                }
              `}
            >
              {section.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Skewers note box */}
            {active.note && (
              <div
                className="relative mb-12 overflow-hidden border border-primary/45 bg-gradient-to-l from-primary/18 via-white/[0.035] to-white/[0.01] px-6 py-6 text-white shadow-[0_22px_70px_rgba(0,0,0,0.35)] md:px-8"
                dir="rtl"
              >
                <div className="absolute inset-y-0 right-0 w-1 bg-primary" />
                <div className="absolute -left-16 -top-20 size-44 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex size-12 shrink-0 items-center justify-center border border-primary/50 bg-primary text-white shadow-lg shadow-primary/20">
                      <Gift size={23} />
                    </span>
                    <div>
                      <p className="mb-1 text-xs font-bold tracking-[0.22em] text-primary">
                        הטבת שיפודים
                      </p>
                      <h3 className="text-2xl font-extrabold leading-tight text-white md:text-3xl">
                        סלטי הבית עלינו
                      </h3>
                      <p className="mt-2 max-w-xl text-base font-semibold leading-7 text-white/75">
                        בהזמנת 2 שיפודים לסועד מקבלים את סלטי הבית ללא תוספת
                        תשלום.
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-2 text-sm font-semibold text-white/70">
                    {active.note.slice(1).map((line, i) => (
                      <p key={i} className="flex items-start gap-2">
                        <span className="mt-2 size-1.5 shrink-0 bg-primary" />
                        <span>{line}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Menu items grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0"
              dir="rtl"
            >
              {active.items.map((item, idx) => (
                <div
                  key={`${item.name}-${idx}`}
                  data-testid={`menu-item-${idx}`}
                  className="py-4.5 border-b border-white/8 last:border-b-0 md:last:border-b-0"
                >
                  <div className="flex items-baseline gap-1 w-full">
                    <span className="text-lg font-extrabold leading-snug text-white tracking-normal shrink-0 md:text-xl">
                      {item.name}
                    </span>
                    <span className="mx-3 mb-1 flex-grow border-b border-dashed border-white/25" />
                    <span className="text-lg font-extrabold text-primary whitespace-nowrap shrink-0 md:text-xl">
                      {item.price !== null ? `${item.price} ₪` : "—"}
                    </span>
                  </div>
                  {item.description && (
                    <p className="mt-1.5 pr-0 text-sm font-medium leading-snug text-white/55">
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
