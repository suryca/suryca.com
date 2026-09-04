import { useTranslations } from "next-intl";
import PageShell, { PageHeader } from "@/components/PageShell";
import FeatureGrid, { type Feature } from "@/components/FeatureGrid";
import CtaBlock from "@/components/CtaBlock";
import type { Product } from "@/lib/site";

/**
 * Shared layout for a product detail page:
 * header → optional extra content → feature grid → call to action.
 */
export default function ProductPage({
  product,
  intro,
  features,
  cta,
  children,
}: {
  product: Product;
  intro: string;
  features: Feature[];
  cta: { title: string; body: string };
  children?: React.ReactNode;
}) {
  const t = useTranslations("Status");
  return (
    <PageShell active="products">
      <PageHeader
        eyebrow={`${product.name} · ${t(product.status)}`}
        title={product.name}
        intro={intro}
      />
      <div className="sy-wrap" style={{ padding: "44px 32px 80px" }}>
        {children}
        <FeatureGrid features={features} accent={product.gradient} />
        <CtaBlock title={cta.title} body={cta.body} style={{ marginTop: 56 }} />
      </div>
    </PageShell>
  );
}
