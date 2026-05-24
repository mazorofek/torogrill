import { useLocation } from "wouter";
import { getLocalePath, localeConfig, locales } from "@/i18n/locales";
import { useI18n } from "@/i18n/I18nProvider";

export function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const [, setLocation] = useLocation();

  const selectLocale = (nextLocale: typeof locale) => {
    const hash = window.location.hash;
    setLocation(`${getLocalePath(nextLocale)}${hash}`);

    if (hash) {
      window.setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: "smooth",
        });
      }, 0);
    }
  };

  return (
    <div
      className="flex items-center border border-white/15 bg-black/65 p-1 text-xs font-semibold uppercase tracking-normal text-white shadow-xl backdrop-blur"
      role="group"
      aria-label={t.languageSwitcher.ariaLabel}
      data-testid="language-switcher"
    >
      {locales.map((option) => {
        const isActive = option === locale;

        return (
          <button
            key={option}
            type="button"
            className={`h-8 min-w-10 px-2.5 transition-colors ${
              isActive
                ? "bg-primary text-white"
                : "text-white/65 hover:bg-white/10 hover:text-white"
            }`}
            aria-pressed={isActive}
            onClick={() => selectLocale(option)}
            data-testid={`language-option-${option}`}
          >
            {localeConfig[option].shortLabel}
          </button>
        );
      })}
    </div>
  );
}
