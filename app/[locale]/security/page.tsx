import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import PageShell, { PageHeader } from "@/components/PageShell";
import FeatureGrid, { type Feature } from "@/components/FeatureGrid";
import { CONTACT_CHANNELS } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

const securityEmail =
  CONTACT_CHANNELS.find((c) => c.key === "security")?.value ?? "security@suryca.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Security" });
  return pageMetadata(locale, "/security", t("title"), t("description"));
}

export default async function SecurityPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Security");
  const practices = t.raw("practices") as Feature[];

  return (
    <PageShell>
      <PageHeader eyebrow={t("eyebrow")} title={t("heading")} intro={t("intro")} />
      <div className="sy-wrap" style={{ padding: "44px 32px 56px" }}>
        <FeatureGrid features={practices} />
      </div>

      <div className="sy-wrap" style={{ padding: "0 32px 88px", maxWidth: 820 }}>
        <div
          style={{
            background: "var(--sy-bg-alt)",
            border: "1px solid var(--sy-border)",
            borderRadius: 18,
            padding: 32,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
              color: "var(--sy-ink)",
            }}
          >
            {t("disclosureTitle")}
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--sy-muted)", margin: "0 0 16px" }}>
            {t("disclosureBody")}
          </p>
          <a
            href={`mailto:${securityEmail}`}
            style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--sy-accent)", fontWeight: 600 }}
          >
            {securityEmail} →
          </a>
        </div>
      </div>
    </PageShell>
  );
}
