import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
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
            {t.footer.menu}
          </button>
          <button
            onClick={() => scrollToSection("events")}
            className="text-white/45 hover:text-primary transition-colors text-base"
            data-testid="footer-link-events"
          >
            {t.footer.events}
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="text-white/45 hover:text-primary transition-colors text-base"
            data-testid="footer-link-contact"
          >
            {t.footer.contact}
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-10">
          <a
            href="https://www.instagram.com/torogrill_il/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Toro Grill Instagram"
            data-testid="link-instagram"
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/45 hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <FaInstagram size={16} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100063848808308&locale=he_IL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Toro Grill Facebook"
            data-testid="link-facebook"
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/45 hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <FaFacebookF size={16} />
          </a>
          <a
            href="https://www.tiktok.com/@toro.gril.il"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Toro Grill TikTok"
            data-testid="link-tiktok"
            className="w-10 h-10 border border-white/15 flex items-center justify-center text-white/45 hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <SiTiktok size={16} />
          </a>
        </div>

        <div className="text-xs text-white/25 font-light border-t border-white/5 pt-6 max-w-md mx-auto">
          {t.footer.copyright.replace(
            "{year}",
            String(new Date().getFullYear()),
          )}
        </div>
      </div>
    </footer>
  );
}
