import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/i18n/metadata";
import { getValueFeatures } from "@/i18n/content";
import type { Locale } from "@/i18n/routing";
import PageShell, { PageHeader } from "@/components/PageShell";
import FeatureGrid from "@/components/FeatureGrid";
import SunMark from "@/components/SunMark";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return pageMetadata(locale, "/about", t("title"), t("description"));
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const tc = await getTranslations("Common");
  const values = await getValueFeatures();

  return (
    <PageShell active="products">
      <PageHeader eyebrow={t("eyebrow")} title={t("heading")} intro={t("intro")} />
      <div className="sy-wrap" style={{ padding: "44px 32px 56px" }}>
        <FeatureGrid features={values} />
      </div>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "16px 32px 88px", textAlign: "center" }}>
        <SunMark style={{ margin: "0 auto 26px" }} />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 34,
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            margin: "0 0 18px",
            color: "var(--sy-ink)",
            textWrap: "balance",
          }}
        >
          {t("studioTitle")}
        </h2>
        <Link href="/contact" className="sy-btn sy-btn-primary sy-btn-lg">
          {tc("getInTouch")} <span>→</span>
        </Link>
      </div>
    </PageShell>
  );
}
