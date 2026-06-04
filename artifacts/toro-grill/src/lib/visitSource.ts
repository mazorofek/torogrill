export type VisitSource =
  | "instagram"
  | "facebook"
  | "tiktok"
  | "google"
  | "direct";

const STORAGE_KEY = "toro-grill-visit-source";

const sourceAliases: Record<string, VisitSource> = {
  instagram: "instagram",
  ig: "instagram",
  facebook: "facebook",
  fb: "facebook",
  meta: "facebook",
  tiktok: "tiktok",
  google: "google",
  direct: "direct",
};

function normalizeSource(value: string | null): VisitSource | null {
  if (!value) return null;

  return sourceAliases[value.trim().toLowerCase()] ?? null;
}

function isDomain(hostname: string, domain: string): boolean {
  return hostname === domain || hostname.endsWith(`.${domain}`);
}

function getReferrerSource(referrer: string): VisitSource | null {
  if (!referrer) return null;

  try {
    const referrerUrl = new URL(referrer);

    if (referrerUrl.origin === window.location.origin) return null;

    const hostname = referrerUrl.hostname.toLowerCase();

    if (
      hostname === "google.com" ||
      hostname.startsWith("google.") ||
      hostname.startsWith("www.google.")
    ) {
      return "google";
    }

    if (isDomain(hostname, "instagram.com")) return "instagram";
    if (isDomain(hostname, "facebook.com")) return "facebook";
    if (isDomain(hostname, "tiktok.com")) return "tiktok";
  } catch {
    return null;
  }

  return null;
}

function readStoredSource(): VisitSource | null {
  try {
    return normalizeSource(window.sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function storeSource(source: VisitSource): void {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, source);
  } catch {
    // Form submission still works when storage is unavailable.
  }
}

function shouldPreserveStoredSource(): boolean {
  if (document.referrer) {
    try {
      if (new URL(document.referrer).origin === window.location.origin) {
        return true;
      }
    } catch {
      // Fall through to the navigation type check.
    }
  }

  const navigationEntry = window.performance
    .getEntriesByType("navigation")
    .at(0) as PerformanceNavigationTiming | undefined;

  return (
    navigationEntry?.type === "reload" ||
    navigationEntry?.type === "back_forward"
  );
}

export function initializeVisitSource(): VisitSource {
  const utmSource = normalizeSource(
    new URLSearchParams(window.location.search).get("utm_source"),
  );
  const referrerSource = getReferrerSource(document.referrer);

  const source =
    utmSource ??
    referrerSource ??
    (shouldPreserveStoredSource() ? readStoredSource() : null) ??
    "direct";

  storeSource(source);
  return source;
}

export function getVisitSource(): VisitSource {
  return readStoredSource() ?? "direct";
}
