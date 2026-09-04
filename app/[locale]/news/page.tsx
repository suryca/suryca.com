import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import PageShell, { PageHeader } from "@/components/PageShell";

type Props = { params: Promise<{ locale: Locale }> };

type NewsItem = { tag: string; title: string; blurb: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "News" });
  return pageMetadata(locale, "/news", t("title"), t("description"));
}

export default async function NewsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("News");
  const items = t.raw("items") as NewsItem[];

  return (
    <PageShell active="news">
      <PageHeader eyebrow={t("eyebrow")} title={t("heading")} intro={t("intro")} />
      <div className="sy-wrap" style={{ padding: "40px 32px 88px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {items.map((it) => (
            <article
              key={it.title}
              style={{
                background: "var(--sy-card)",
                border: "1px solid var(--sy-border)",
                borderRadius: 16,
                padding: 26,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--sy-accent)",
                  background: "rgba(226,99,42,0.1)",
                  padding: "4px 9px",
                  borderRadius: 6,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {it.tag}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 21,
                  margin: "14px 0 8px",
                  color: "var(--sy-ink)",
                }}
              >
                {it.title}
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--sy-muted)", margin: 0 }}>
                {it.blurb}
              </p>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
