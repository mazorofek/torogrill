import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuSections } from "@/data/menu";

export function MenuSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = menuSections[activeIndex];

  return (
    <section id="menu" className="py-24 bg-background border-b border-white/5">
      <div className="container mx-auto px-4 max-w-4xl">
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
                className="mb-10 border border-primary/60 bg-primary/5 px-6 py-5 text-sm text-white/90 space-y-2"
                dir="rtl"
              >
                {active.note.map((line, i) => (
                  <p key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 shrink-0">—</span>
                    <span>{line}</span>
                  </p>
                ))}
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
