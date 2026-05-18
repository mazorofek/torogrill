import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImg from "@/assets/images/hero.png";

export function Hero() {
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
            בשר אמיתי. חוויה אמיתית.
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
            onClick={() => scrollToSection("menu")}
          >
            להזמנת משלוח
          </Button>
          <Button
            variant="outline"
            size="lg"
            data-testid="button-table"
            className="w-full sm:w-auto text-lg h-13 px-8 border-2 border-white/60 text-white hover:bg-white hover:text-black bg-transparent rounded-none transition-transform hover:scale-105"
            onClick={() => scrollToSection("contact")}
          >
            להזמנת שולחן
          </Button>
          <Button
            variant="outline"
            size="lg"
            data-testid="button-events"
            className="w-full sm:w-auto text-lg h-13 px-8 border-2 border-primary/70 text-primary hover:bg-primary hover:text-white bg-transparent rounded-none transition-transform hover:scale-105"
            onClick={() => scrollToSection("events")}
          >
            לאירועים
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 1, repeat: Infinity }}
        onClick={() => scrollToSection("menu")}
      >
        <ChevronDown size={40} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
