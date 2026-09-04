import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { PageHeader } from "@/components/PageShell";
import FeatureGrid from "@/components/FeatureGrid";
import SunMark from "@/components/SunMark";
import { VALUES, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Suryca is an independent AI software studio, incorporating as ${SITE.legalName}`,
};

export default function AboutPage() {
  return (
    <PageShell active="products">
      <PageHeader
        eyebrow="About"
        title="Small studio. High standards."
        intro="Suryca began as an independent studio and is incorporating as Suryca Software Inc. The plan is simple: keep shipping useful products, and let our own agents help us build them."
      />
      <div className="sy-wrap" style={{ padding: "44px 32px 56px" }}>
        <FeatureGrid features={VALUES} />
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
          Today a one-person studio. Soon, a team of people and agents shipping together.
        </h2>
        <Link href="/contact" className="sy-btn sy-btn-primary sy-btn-lg">
          Get in touch <span>→</span>
        </Link>
      </div>
    </PageShell>
  );
}
