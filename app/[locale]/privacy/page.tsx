import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import LegalPage, { type LegalSection } from "@/components/LegalPage";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return pageMetadata(locale, "/privacy", t("title"), t("description"));
}

// Copy lives in messages/<locale>.json under "Privacy". Bump "updated" there when it changes.
export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  return (
    <LegalPage
      title={t("title")}
      intro={t("intro")}
      updated={t("updated")}
      sections={t.raw("sections") as LegalSection[]}
    />
  );
}
