import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
} from "react";
import {
  defaultLocale,
  getLocalePath,
  localeConfig,
  type Direction,
  type Locale,
} from "@/i18n/locales";
import { translations } from "@/i18n/translations";

const SITE_URL = "https://toro-grill.com";

type I18nContextValue = {
  locale: Locale;
  dir: Direction;
  t: (typeof translations)[Locale];
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = {
  locale?: Locale;
  children: ReactNode;
};

export function I18nProvider({
  locale = defaultLocale,
  children,
}: I18nProviderProps) {
  const dir = localeConfig[locale].dir;

  useEffect(() => {
    updateDocumentMetadata(locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      dir,
      t: translations[locale],
    }),
    [dir, locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }

  return context;
}

function updateDocumentMetadata(locale: Locale) {
  const config = localeConfig[locale];
  const seo = translations[locale].seo;
  const url = `${SITE_URL}${getLocalePath(locale)}`;

  document.documentElement.lang = locale;
  document.documentElement.dir = config.dir;
  document.title = seo.title;

  setMeta("name", "description", seo.description);
  setMeta("name", "geo.placename", seo.geoPlaceName);
  setMeta("property", "og:locale", config.ogLocale);
  setMeta("property", "og:title", seo.title);
  setMeta("property", "og:description", seo.description);
  setMeta("property", "og:url", url);
  setMeta("property", "og:site_name", seo.siteName);
  setMeta("name", "twitter:title", seo.title);
  setMeta("name", "twitter:description", seo.description);
  setCanonical(url);
  setAlternateLinks();
  setRestaurantJsonLd(locale, url);
}

function setMeta(attribute: "name" | "property", key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = url;
}

function setAlternateLinks() {
  document.head
    .querySelectorAll('link[rel="alternate"][data-i18n="true"]')
    .forEach((element) => element.remove());

  const alternates: Array<{ hreflang: string; href: string }> = [
    { hreflang: "x-default", href: `${SITE_URL}/` },
    { hreflang: "he", href: `${SITE_URL}/` },
    { hreflang: "en", href: `${SITE_URL}/en` },
    { hreflang: "ru", href: `${SITE_URL}/ru` },
  ];

  for (const alternate of alternates) {
    const link = document.createElement("link");
    link.rel = "alternate";
    link.hreflang = alternate.hreflang;
    link.href = alternate.href;
    link.dataset.i18n = "true";
    document.head.appendChild(link);
  }
}

function setRestaurantJsonLd(locale: Locale, url: string) {
  const seo = translations[locale].seo;
  let script = document.getElementById(
    "restaurant-jsonld",
  ) as HTMLScriptElement | null;

  if (!script) {
    script = document.createElement("script");
    script.id = "restaurant-jsonld";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: seo.restaurantName,
    alternateName: ["Toro Grill", "טורו גריל ראשון לציון"],
    url,
    description: seo.restaurantDescription,
    telephone: "+972-3-952-0450",
    priceRange: "₪₪",
    servesCuisine: seo.cuisines,
    image: `${SITE_URL}/opengraph.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: seo.streetAddress,
      addressLocality: seo.addressLocality,
      addressCountry: "IL",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "11:00",
        closes: "23:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "11:00",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "19:00",
        closes: "23:00",
      },
    ],
  });
}
