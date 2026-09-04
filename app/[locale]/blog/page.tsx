import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import PageShell, { PageHeader } from "@/components/PageShell";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  return pageMetadata(locale, "/blog", t("title"), t("description"));
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Blog");
  const posts = t.raw("posts") as string[];

  return (
    <PageShell active="blog">
      <PageHeader eyebrow={t("eyebrow")} title={t("heading")} intro={t("intro")} />
      <div className="sy-wrap" style={{ padding: "40px 32px 88px" }}>
        {/* Featured */}
        <article
          style={{
            background: "var(--sy-card)",
            border: "1px solid var(--sy-border)",
            borderRadius: 18,
            padding: 32,
            marginBottom: 28,
            boxShadow: "0 1px 2px rgba(28,23,18,0.03)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--sy-accent)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {t("featured")}
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              margin: "14px 0 10px",
              color: "var(--sy-ink)",
              textWrap: "balance",
            }}
          >
            {t("featuredTitle")}
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--sy-muted)", margin: 0, maxWidth: 620 }}>
            {t("featuredBlurb")}
          </p>
        </article>

        {/* Post list */}
        <div className="sy-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {posts.map((title) => (
            <article
              key={title}
              style={{
                background: "var(--sy-card)",
                border: "1px solid var(--sy-border)",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 18,
                  lineHeight: 1.25,
                  margin: 0,
                  color: "var(--sy-ink)",
                  flex: 1,
                }}
              >
                {title}
              </h3>
              <span className="sy-link-accent" style={{ marginTop: 18 }}>
                {t("read")}
              </span>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
