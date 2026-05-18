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
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/40 to-background" />

      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl font-bold tracking-wider text-primary mb-6">
            TORO GRILL
          </h1>
          <p className="text-xl md:text-3xl text-foreground font-light mb-12 tracking-wide">
            בשר אמיתי. חוויה אמיתית.
          </p>
        </motion.div>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Button 
            size="lg" 
            className="w-full sm:w-auto text-lg h-14 px-8 border-2 border-primary bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105"
            onClick={() => scrollToSection("menu")}
          >
            להזמנת משלוח
          </Button>
          <Button 
            variant="outline"
            size="lg" 
            className="w-full sm:w-auto text-lg h-14 px-8 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent transition-transform hover:scale-105"
            onClick={() => scrollToSection("contact")}
          >
            להזמנת שולחן
          </Button>
          <Button 
            variant="outline"
            size="lg" 
            className="w-full sm:w-auto text-lg h-14 px-8 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent transition-transform hover:scale-105"
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
        <ChevronDown size={40} strokeWidth={1} />
      </motion.div>
    </section>
  );
}