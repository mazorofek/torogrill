import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export function StickyOrderBar() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > window.innerHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [scrollY]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div 
      className="fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-t border-primary/30 py-3 px-4 shadow-2xl"
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="container mx-auto max-w-4xl flex items-center justify-between gap-2 md:gap-4">
        <Button 
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-none h-12 text-base font-medium"
          onClick={() => scrollToSection("menu")}
        >
          משלוח
        </Button>
        <Button 
          variant="outline"
          className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent rounded-none h-12 text-base font-medium"
          onClick={() => scrollToSection("contact")}
        >
          הזמנת שולחן
        </Button>
        <Button 
          variant="outline"
          className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent rounded-none h-12 text-base font-medium"
          onClick={() => scrollToSection("events")}
        >
          אירועים
        </Button>
      </div>
    </motion.div>
  );
}