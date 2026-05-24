import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider";

type StickyOrderBarProps = {
  onDeliveryClick: () => void;
};

export function StickyOrderBar({ onDeliveryClick }: StickyOrderBarProps) {
  const { t } = useI18n();
  const { scrollY } = {
    scrollY: {
      onChange: (cb: (v: number) => void) => {
        let prev = 0;
        const handler = () => {
          cb(window.scrollY);
          prev = window.scrollY;
        };
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
      },
    },
  };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-md border-t-2 border-primary py-3 px-4 shadow-2xl"
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="container mx-auto max-w-4xl flex items-center justify-between gap-2 md:gap-4">
        <Button
          data-testid="sticky-button-delivery"
          className="flex-1 bg-primary text-white hover:bg-primary/90 rounded-none h-12 text-base font-medium border-none"
          onClick={onDeliveryClick}
        >
          {t.sticky.delivery}
        </Button>
        <Button
          data-testid="sticky-button-table"
          variant="outline"
          className="flex-1 border border-white/25 text-white hover:bg-white hover:text-black bg-transparent rounded-none h-12 text-base font-medium"
          onClick={() => scrollToSection("contact")}
        >
          {t.sticky.table}
        </Button>
        <Button
          data-testid="sticky-button-events"
          variant="outline"
          className="flex-1 border border-primary/60 text-primary hover:bg-primary hover:text-white bg-transparent rounded-none h-12 text-base font-medium"
          onClick={() => scrollToSection("events")}
        >
          {t.sticky.events}
        </Button>
      </div>
    </motion.div>
  );
}
