import { defineRouting } from "next-intl/routing";

/**
 * Locale routing, Apple-style: the default language lives at the bare path
 * (suryca.com/about) and other languages get a prefix (suryca.com/hi/about).
 * No detection from browser settings and no cookie: visitors pick a language
 * with the switcher in the footer and links keep them in it.
 */
export const routing = defineRouting({
  locales: ["en", "hi"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
  localeCookie: false,
});

export type Locale = (typeof routing.locales)[number];

/** Open Graph locale codes per site locale. */
export const OG_LOCALE: Record<Locale, string> = { en: "en_US", hi: "hi_IN" };
