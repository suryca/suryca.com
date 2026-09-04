import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import ProductPage from "@/components/ProductPage";
import type { Feature } from "@/components/FeatureGrid";
import { getProduct, productHref } from "@/lib/site";

type Props = { params: Promise<{ locale: Locale }> };

const product = getProduct("agents");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Products" });
  return pageMetadata(locale, productHref(product), product.name, t("agents.description"));
}

export default async function AgentsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProductPage");

  return (
    <ProductPage
      product={product}
      intro={t("agents.intro")}
      features={t.raw("agents.features") as Feature[]}
      cta={{ title: t("agents.cta.title"), body: t("agents.cta.body") }}
    >
      <div style={{ marginBottom: 30 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 28,
            letterSpacing: "-0.02em",
            margin: "0 0 4px",
            color: "var(--sy-ink)",
          }}
        >
          {t("agents.controlTitle")}
        </h2>
        <p style={{ fontSize: 16, color: "var(--sy-muted)", margin: 0 }}>
          {t("agents.controlStats")}
        </p>
      </div>
    </ProductPage>
  );
}
