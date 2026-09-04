import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getValueFeatures } from "@/i18n/content";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import SunMark from "@/components/SunMark";
import ProductMark from "@/components/ProductMark";
import StatusBadge from "@/components/StatusBadge";
import FeatureGrid from "@/components/FeatureGrid";
import FizgotPreview from "@/components/previews/FizgotPreview";
import ExportAIChatPreview from "@/components/previews/ExportAIChatPreview";
import AgentsPreview from "@/components/previews/AgentsPreview";
import { PRODUCTS, SITE, getProduct, productHref, type Product } from "@/lib/site";

const ORBIT_DELAYS = ["0s", "0.6s", "1.2s"];

const fizgot = getProduct("fizgot");
const exportAiChat = getProduct("exportaichat");
const agents = getProduct("agents");

function Bullet({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: "15.5px",
        color: "var(--sy-ink-soft)",
      }}
    >
      <span style={{ color, fontWeight: 700 }}>☼</span> {children}
    </div>
  );
}

const spotlightH2: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontWeight: 700,
  fontSize: 40,
  lineHeight: 1.08,
  letterSpacing: "-0.02em",
  margin: "0 0 16px",
  color: "var(--sy-ink)",
};

const spotlightP: React.CSSProperties = {
  fontSize: 18,
  lineHeight: 1.6,
  color: "var(--sy-muted)",
  margin: "0 0 24px",
};

const frame: React.CSSProperties = {
  borderRadius: 16,
  overflow: "hidden",
  border: "1px solid var(--sy-border)",
  boxShadow: "0 24px 60px -28px rgba(28,23,18,0.3)",
  background: "var(--sy-card)",
};

function SpotlightLabel({ product }: { product: Product }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, marginBottom: 18 }}>
      <ProductMark product={product} size={26} radius={8} />
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          fontSize: 16,
          color: "var(--sy-ink)",
        }}
      >
        {product.name}
      </span>
      {product.status !== "LIVE" ? <StatusBadge status={product.status} /> : null}
    </div>
  );
}

type Props = { params: Promise<{ locale: Locale }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const tc = await getTranslations("Common");
  const tp = await getTranslations("Products");
  const values = await getValueFeatures();

  return (
    <>
      <Nav active="products" />

      {/* HERO */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "var(--sy-hero-glow)",
            pointerEvents: "none",
          }}
        />
        <div
          className="sy-wrap"
          style={{ position: "relative", padding: "104px 32px 72px", textAlign: "center" }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              padding: "6px 15px 6px 11px",
              border: "1px solid rgba(28,23,18,0.12)",
              borderRadius: 999,
              fontSize: 13,
              color: "var(--sy-muted)",
              background: "rgba(255,255,255,0.6)",
              marginBottom: 30,
            }}
          >
            <span
              style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--sy-accent)" }}
            />
            {SITE.legalName} ·{" "}
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--sy-faint)" }}>
              {t("badge")}
            </span>
          </div>
          <h1
            className="sy-hero-h1"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 76,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              margin: "0 auto 24px",
              maxWidth: 900,
              color: "var(--sy-ink)",
              textWrap: "balance",
            }}
          >
            {t.rich("heroTitle", { br: () => <br /> })}
          </h1>
          <p
            style={{
              fontSize: 20,
              lineHeight: 1.55,
              color: "var(--sy-muted)",
              maxWidth: 650,
              margin: "0 auto 38px",
              textWrap: "pretty",
            }}
          >
            {t.rich("heroBody", {
              em: (chunks) => (
                <em style={{ fontStyle: "normal", color: "var(--sy-accent)" }}>{chunks}</em>
              ),
            })}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              marginBottom: 54,
              flexWrap: "wrap",
            }}
          >
            <a href="#products" className="sy-btn sy-btn-primary sy-btn-md">
              {t("seeProducts")} <span>→</span>
            </a>
            <Link href="/contact" className="sy-btn sy-btn-ghost sy-btn-md">
              {tc("getInTouch")}
            </Link>
          </div>

          {/* product orbit row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 34,
              flexWrap: "wrap",
            }}
          >
            {PRODUCTS.map((p, i) => (
              <div
                key={p.slug}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}
              >
                <ProductMark
                  product={p}
                  size={58}
                  radius={16}
                  shadow
                  style={{ animation: `sy-orbit 5s ease-in-out infinite ${ORBIT_DELAYS[i] ?? "0s"}` }}
                />
                <span style={{ fontSize: "13.5px", color: "var(--sy-muted)", fontWeight: 600 }}>
                  {p.name}
                </span>
              </div>
            ))}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 58,
                  height: 58,
                  borderRadius: 16,
                  border: "1.5px dashed rgba(28,23,18,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--sy-faint)",
                  fontSize: 24,
                  fontWeight: 300,
                }}
              >
                +
              </div>
              <span style={{ fontSize: "13.5px", color: "var(--sy-faint)", fontWeight: 600 }}>
                {t("moreSoon")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div
        id="products"
        className="sy-wrap"
        style={{ padding: "64px 32px 40px", scrollMarginTop: 84 }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 34,
            flexWrap: "wrap",
            gap: 14,
          }}
        >
          <div>
            <Eyebrow>{t("whatWeMake")}</Eyebrow>
            <h2
              className="sy-section-h2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 42,
                lineHeight: 1.06,
                letterSpacing: "-0.02em",
                margin: 0,
                color: "var(--sy-ink)",
              }}
            >
              {t("productsTitle")}
            </h2>
          </div>
          <p style={{ fontSize: 16, color: "var(--sy-muted)", maxWidth: 360, margin: 0, lineHeight: 1.55 }}>
            {t("productsBody")}
          </p>
        </div>
        <div
          className="sy-grid-3"
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}
        >
          {PRODUCTS.map((p) => (
            <div
              key={p.slug}
              style={{
                background: "var(--sy-card)",
                border: "1px solid var(--sy-border)",
                borderRadius: 18,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 1px 2px rgba(28,23,18,0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 22,
                }}
              >
                <ProductMark product={p} size={48} radius={13} shadow />
                <StatusBadge status={p.status} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 22,
                  margin: "0 0 9px",
                  color: "var(--sy-ink)",
                }}
              >
                {p.name}
              </h3>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--sy-muted)",
                  margin: "0 0 20px",
                  flex: 1,
                }}
              >
                {tp(`${p.slug}.blurb`)}
              </p>
              <Link href={productHref(p)} className="sy-link-accent">
                {t("explore", { name: p.name })} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* SPOTLIGHT: FIZGOT */}
      <div className="sy-wrap" style={{ padding: "64px 32px" }}>
        <div
          className="sy-grid-spotlight"
          style={{ display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 60, alignItems: "center" }}
        >
          <div>
            <SpotlightLabel product={fizgot} />
            <h2 className="sy-section-h2" style={spotlightH2}>
              {t("fizgot.title")}
            </h2>
            <p style={spotlightP}>{t("fizgot.body")}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <Bullet color={fizgot.accent}>{t("fizgot.bullet1")}</Bullet>
              <Bullet color={fizgot.accent}>{t("fizgot.bullet2")}</Bullet>
            </div>
          </div>
          <div style={frame}>
            <FizgotPreview />
          </div>
        </div>
      </div>

      {/* SPOTLIGHT: EXPORTAICHAT */}
      <div
        style={{
          background: "var(--sy-bg-alt)",
          borderTop: "1px solid var(--sy-border)",
          borderBottom: "1px solid var(--sy-border)",
        }}
      >
        <div className="sy-wrap" style={{ padding: "72px 32px" }}>
          <div
            className="sy-grid-spotlight-rev"
            style={{ display: "grid", gridTemplateColumns: "1.08fr 0.92fr", gap: 60, alignItems: "center" }}
          >
            <div style={{ ...frame, border: "1px solid var(--sy-border-strong)" }}>
              <ExportAIChatPreview />
            </div>
            <div>
              <SpotlightLabel product={exportAiChat} />
              <h2 className="sy-section-h2" style={spotlightH2}>
                {t("exportaichat.title")}
              </h2>
              <p style={spotlightP}>{t("exportaichat.body")}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                <Bullet color={exportAiChat.accent}>{t("exportaichat.bullet1")}</Bullet>
                <Bullet color={exportAiChat.accent}>{t("exportaichat.bullet2")}</Bullet>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPOTLIGHT: AGENTS */}
      <div className="sy-wrap" style={{ padding: "72px 32px" }}>
        <div
          className="sy-grid-spotlight"
          style={{ display: "grid", gridTemplateColumns: "0.92fr 1.08fr", gap: 60, alignItems: "center" }}
        >
          <div>
            <SpotlightLabel product={agents} />
            <h2 className="sy-section-h2" style={spotlightH2}>
              {t("agents.title")}
            </h2>
            <p style={spotlightP}>{t("agents.body")}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <Bullet color={agents.accent}>{t("agents.bullet1")}</Bullet>
              <Bullet color={agents.accent}>{t("agents.bullet2")}</Bullet>
            </div>
          </div>
          <div style={frame}>
            <AgentsPreview />
          </div>
        </div>
      </div>

      {/* APPROACH */}
      <div style={{ background: "var(--sy-bg-alt)", borderTop: "1px solid var(--sy-border)" }}>
        <div className="sy-wrap" style={{ padding: "80px 32px" }}>
          <div style={{ maxWidth: 600, marginBottom: 46 }}>
            <Eyebrow>{t("howWeBuild")}</Eyebrow>
            <h2 className="sy-section-h2" style={{ ...spotlightH2, margin: 0 }}>
              {t("approachTitle")}
            </h2>
          </div>
          <FeatureGrid features={values} mark={false} />
        </div>
      </div>

      {/* ABOUT / STUDIO NOTE */}
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "88px 32px", textAlign: "center" }}>
        <SunMark style={{ margin: "0 auto 26px" }} />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 36,
            lineHeight: 1.18,
            letterSpacing: "-0.02em",
            margin: "0 0 18px",
            color: "var(--sy-ink)",
            textWrap: "balance",
          }}
        >
          {t("studioTitle")}
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--sy-muted)", maxWidth: 600, margin: "0 auto" }}>
          {t("studioBody")}
        </p>
      </div>

      {/* CTA BAND */}
      <div style={{ position: "relative", overflow: "hidden", borderTop: "1px solid var(--sy-border)" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(50% 130% at 50% 100%, rgba(242,169,59,0.22), rgba(226,99,42,0.12) 42%, transparent 72%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", maxWidth: 860, margin: "0 auto", padding: "96px 32px", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 50,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              margin: "0 0 18px",
              color: "var(--sy-ink)",
              textWrap: "balance",
            }}
          >
            {t("ctaTitle")}
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--sy-muted)", maxWidth: 540, margin: "0 auto 32px" }}>
            {t("ctaBody")}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="sy-btn sy-btn-primary sy-btn-lg">
              {tc("getInTouch")} <span>→</span>
            </Link>
            <Link href="/careers" className="sy-btn sy-btn-ghost sy-btn-lg">
              {tc("seeCareers")}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
