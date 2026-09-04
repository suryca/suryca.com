"use client";

import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Footer language picker, Apple-style: a globe and one link per language,
 * each pointing at the current page in that language. Language names are
 * written in their own language so a visitor can always find theirs.
 *
 * Hrefs are built with getPathname rather than next-intl's Link + `locale`
 * prop, which always adds a prefix (so English would go to /en/... and bounce
 * through a redirect). Detection and cookies are off, so bare paths are safe.
 */
export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Language");

  return (
    <nav aria-label={t("label")} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <svg
        aria-hidden
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2c3 3.3 3 16.7 0 20M12 2c-3 3.3-3 16.7 0 20" />
      </svg>
      {routing.locales.map((l, i) => {
        const current = l === locale;
        return (
          <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            {i > 0 ? (
              <span aria-hidden style={{ opacity: 0.5 }}>
                |
              </span>
            ) : null}
            <NextLink
              href={getPathname({ href: pathname, locale: l })}
              hrefLang={l}
              lang={l}
              aria-current={current ? "true" : undefined}
              className="sy-footlink"
              style={{ color: current ? "var(--sy-ink)" : undefined, fontWeight: current ? 600 : 400 }}
            >
              {t(l)}
            </NextLink>
          </span>
        );
      })}
    </nav>
  );
}
