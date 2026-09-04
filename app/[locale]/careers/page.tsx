import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import { getValueFeatures } from "@/i18n/content";
import type { Locale } from "@/i18n/routing";
import PageShell, { PageHeader } from "@/components/PageShell";
import FeatureGrid from "@/components/FeatureGrid";
import CtaBlock from "@/components/CtaBlock";
import { CONTACT_CHANNELS } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

const careersEmail =
  CONTACT_CHANNELS.find((c) => c.key === "careers")?.value ?? "join@suryca.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Careers" });
  return pageMetadata(locale, "/careers", t("title"), t("description"));
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Careers");
  const tc = await getTranslations("Common");
  const values = await getValueFeatures();

  return (
    <PageShell>
      <PageHeader eyebrow={t("eyebrow")} title={t("heading")} intro={t("intro")} />
      <div className="sy-wrap" style={{ padding: "44px 32px 56px" }}>
        <FeatureGrid features={values} />
      </div>
      <div className="sy-wrap" style={{ padding: "0 32px 88px" }}>
        <CtaBlock
          title={t("ctaTitle")}
          body={t("ctaBody", { email: careersEmail })}
          href={`mailto:${careersEmail}`}
          label={tc("emailUs")}
        />
      </div>
    </PageShell>
  );
}
