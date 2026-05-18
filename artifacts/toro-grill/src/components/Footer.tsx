import { FaInstagram, FaFacebookF } from "react-icons/fa";

export function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t border-primary/20 pt-16 pb-24 md:pb-16 text-center">
      <div className="container mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold tracking-widest text-primary mb-8">
          TORO GRILL
        </h2>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <button onClick={() => scrollToSection("menu")} className="text-muted-foreground hover:text-primary transition-colors text-lg">
            תפריט
          </button>
          <button onClick={() => scrollToSection("events")} className="text-muted-foreground hover:text-primary transition-colors text-lg">
            אירועים
          </button>
          <button onClick={() => scrollToSection("contact")} className="text-muted-foreground hover:text-primary transition-colors text-lg">
            צרו קשר
          </button>
        </div>

        <div className="flex justify-center gap-6 mb-12">
          <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
            <FaInstagram size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
            <FaFacebookF size={18} />
          </a>
        </div>

        <div className="text-sm text-muted-foreground/50 font-light border-t border-white/5 pt-8 max-w-md mx-auto">
          © {new Date().getFullYear()} טורו גריל. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}