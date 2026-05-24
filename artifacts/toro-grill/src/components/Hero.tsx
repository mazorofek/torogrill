import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useI18n } from "@/i18n/I18nProvider";
import heroImg from "@/assets/images/hero.png";
import logoImg from "@/assets/images/toro-logo-official.png";

type HeroProps = {
  onDeliveryClick: () => void;
};

export function Hero({ onDeliveryClick }: HeroProps) {
  const { t } = useI18n();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/75 via-black/50 to-background" />

      <div className="absolute right-4 top-32 z-30 md:right-8 md:top-8">
        <LanguageSwitcher />
      </div>

      <img
        src={logoImg}
        alt="Toro Grill"
        className="absolute top-6 z-20 h-auto w-48 border border-white/10 bg-black/80 object-contain px-2 py-1 shadow-2xl md:top-8 md:w-72"
        data-testid="hero-logo"
      />

      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="mb-6 flex flex-col items-center">
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-black tracking-widest text-white leading-none uppercase">
              TORO
            </h1>
            <div className="w-full h-[3px] bg-primary my-1" />
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] font-black tracking-widest text-white leading-none uppercase">
              GRILL
            </h1>
          </div>
          <p className="text-lg md:text-2xl text-white/80 font-light mb-12 tracking-widest">
            {t.hero.tagline}
          </p>
          <p className="mb-10 border border-white/15 bg-black/35 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm md:text-base">
            {t.hero.kosherNote}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Button
            size="lg"
            data-testid="button-delivery"
            className="w-full sm:w-auto text-lg h-13 px-8 bg-primary text-white border-2 border-primary hover:bg-primary/90 rounded-none transition-transform hover:scale-105"
            onClick={onDeliveryClick}
          >
            {t.hero.delivery}
          </Button>
          <Button
            variant="outline"
            size="lg"
            data-testid="button-table"
            className="w-full sm:w-auto text-lg h-13 px-8 border-2 border-white/60 text-white hover:bg-white hover:text-black bg-transparent rounded-none transition-transform hover:scale-105"
            onClick={() => scrollToSection("contact")}
          >
            {t.hero.table}
          </Button>
          <Button
            variant="outline"
            size="lg"
            data-testid="button-events"
            className="w-full sm:w-auto text-lg h-13 px-8 border-2 border-primary/70 text-primary hover:bg-primary hover:text-white bg-transparent rounded-none transition-transform hover:scale-105"
            onClick={() => scrollToSection("events")}
          >
            {t.hero.events}
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 1, repeat: Infinity }}
        onClick={() => scrollToSection("menu")}
        aria-label={t.hero.scrollToMenu}
      >
        <ChevronDown size={40} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
