import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import ProductPage from "@/components/ProductPage";
import type { Feature } from "@/components/FeatureGrid";
import { getProduct, productHref } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

const product = getProduct("fizgot");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return pageMetadata(locale, productHref(product), product.name, t("fizgot.description"));
}

export default async function FizgotPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProductPage");

  return (
    <ProductPage
      product={product}
      intro={t("fizgot.intro")}
      features={t.raw("fizgot.features") as Feature[]}
      cta={{ title: t("fizgot.cta.title"), body: t("fizgot.cta.body") }}
    />
  );
}
