export const locales = ["he", "en", "ru"] as const;

export type Locale = (typeof locales)[number];
export type Direction = "rtl" | "ltr";

export const defaultLocale: Locale = "he";

export const localeConfig: Record<
  Locale,
  { label: string; shortLabel: string; dir: Direction; ogLocale: string }
> = {
  he: {
    label: "עברית",
    shortLabel: "HE",
    dir: "rtl",
    ogLocale: "he_IL",
  },
  en: {
    label: "English",
    shortLabel: "EN",
    dir: "ltr",
    ogLocale: "en_US",
  },
  ru: {
    label: "Русский",
    shortLabel: "RU",
    dir: "ltr",
    ogLocale: "ru_RU",
  },
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const [firstSegment] = pathname.split("/").filter(Boolean);

  if (!firstSegment) return defaultLocale;
  if (isLocale(firstSegment)) return firstSegment;

  return null;
}

export function getLocalePath(locale: Locale) {
  return locale === defaultLocale ? "/" : `/${locale}`;
}
