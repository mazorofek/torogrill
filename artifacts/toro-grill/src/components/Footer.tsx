import { FaInstagram, FaFacebookF } from "react-icons/fa";

export function Footer() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#020202] border-t-2 border-primary/60 pt-14 pb-28 md:pb-14 text-center">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-8">
          <h2 className="font-serif text-4xl font-black tracking-[0.25em] text-white uppercase mb-1">
            TORO
          </h2>
          <div className="w-32 h-[2px] bg-primary mb-1" />
          <h2 className="font-serif text-4xl font-black tracking-[0.25em] text-white uppercase">
            GRILL
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 mb-8">
          <button
            onClick={() => scrollToSection("menu")}
            className="text-white/45 hover:text-primary transition-colors text-base"
            data-testid="footer-link-menu"
          >
            תפריט
          </button>
          <button
            onClick={() => scrollToSection("events")}
            className="text-white/45 hover:text-primary transition-colors text-base"
            data-testid="footer-link-events"
          >
            אירועים
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-white/45 hover:text-primary transition-colors text-base"
            data-testid="footer-link-contact"
          >
            צרו קשר
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <a
            href="#"
            data-testid="link-instagram"
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/45 hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href="#"
            data-testid="link-facebook"
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/45 hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <FaFacebookF size={16} />
          </a>
        </div>

        <div className="text-xs text-white/25 font-light border-t border-white/5 pt-6 max-w-md mx-auto">
          © {new Date().getFullYear()} טורו גריל. כל הזכויות שמורות.
        </div>
      </div>
    </footer>
  );
}
