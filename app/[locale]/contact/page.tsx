import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import PageShell from "@/components/PageShell";
import Eyebrow from "@/components/Eyebrow";
import ContactForm from "./ContactForm";
import { CONTACT_CHANNELS, SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return pageMetadata(locale, "/contact", t("title"), t("description"));
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  return (
    <PageShell active="contact">
      <div className="sy-wrap" style={{ padding: "84px 32px 96px" }}>
        <div
          className="sy-grid-spotlight"
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: 60,
            alignItems: "start",
          }}
        >
          {/* Left: details */}
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1
              className="sy-section-h2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 48,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                margin: "0 0 28px",
                color: "var(--sy-ink)",
              }}
            >
              {t("heading")}
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {CONTACT_CHANNELS.map((c) => (
                <div key={c.key}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--sy-faint)",
                      marginBottom: 4,
                    }}
                  >
                    {t(`channels.${c.key}`)}
                  </div>
                  <a
                    href={`mailto:${c.value}`}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 15,
                      color: "var(--sy-ink)",
                    }}
                  >
                    {c.value}
                  </a>
                </div>
              ))}

              <div style={{ marginTop: 8 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--sy-faint)",
                    marginBottom: 4,
                  }}
                >
                  {t("studio")}
                </div>
                <div style={{ fontSize: 15, color: "var(--sy-ink)" }}>{SITE.legalName}</div>
                <div style={{ fontSize: 14, color: "var(--sy-muted)" }}>{t("studioNote")}</div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div
            style={{
              background: "var(--sy-card)",
              border: "1px solid var(--sy-border)",
              borderRadius: 18,
              padding: 32,
              boxShadow: "0 1px 2px rgba(28,23,18,0.03)",
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
