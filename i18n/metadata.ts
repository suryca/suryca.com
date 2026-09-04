import type { Metadata } from "next";
import { getPathname } from "./navigation";
import { routing, type Locale } from "./routing";

/**
 * Metadata for a localized page: title, description and hreflang alternates
 * (canonical for the current locale, one entry per locale, plus x-default).
 */
export function pageMetadata(
  locale: Locale,
  href: string,
  title: string,
  description: string,
): Metadata {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href })]),
  );
  return {
    title,
    description,
    alternates: {
      canonical: getPathname({ locale, href }),
      languages: {
        ...languages,
        "x-default": getPathname({ locale: routing.defaultLocale, href }),
      },
    },
  };
}
