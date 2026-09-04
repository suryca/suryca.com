import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import SunMark from "@/components/SunMark";
import ProductMark from "@/components/ProductMark";
import StatusBadge from "@/components/StatusBadge";
import FeatureGrid from "@/components/FeatureGrid";
import { PRODUCTS, VALUES, SITE, getProduct, productHref, type Product } from "@/lib/site";

const ORBIT_DELAYS = ["0s", "0.6s", "1.2s"];

const fizgot = getProduct("fizgot");
const exportAiChat = getProduct("exportaichat");
const agents = getProduct("agents");

function BrowserChrome({ host }: { host: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "11px 14px",
        borderBottom: "1px solid #f0e8da",
        background: "#faf5ec",
      }}
    >
      {["#e8a34a", "#e8d04a", "#d97a3f"].map((c) => (
        <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
      ))}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--sy-faint)",
          marginLeft: 8,
        }}
      >
        {host}
      </span>
    </div>
  );
}

function ScreenshotPlaceholder({ label }: { label: string }) {
  return (
    <div
      style={{
        height: 300,
        background:
          "repeating-linear-gradient(45deg,#f4ead9,#f4ead9 11px,#efe3cf 11px,#efe3cf 22px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          color: "#9a8f7d",
          background: "rgba(255,255,255,0.7)",
          padding: "8px 14px",
          borderRadius: 8,
        }}
      >
        {label}
      </span>
    </div>
  );
}

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

export default function Home() {
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
              surya ka — of the sun
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
            An AI software studio
            <br />
            building a family of products.
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
            Suryca designs and ships practical AI software — creative tools, everyday
            utilities, and autonomous agents. Named for{" "}
            <em style={{ fontStyle: "normal", color: "var(--sy-accent)" }}>surya</em>, the
            sun: always on, always shipping.
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
            <Link href="#products" className="sy-btn sy-btn-primary sy-btn-md">
              See our products <span>→</span>
            </Link>
            <Link href="/contact" className="sy-btn sy-btn-ghost sy-btn-md">
              Get in touch
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
                More soon
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
            <Eyebrow>What we make</Eyebrow>
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
              One studio, many products.
            </h2>
          </div>
          <p style={{ fontSize: 16, color: "var(--sy-muted)", maxWidth: 360, margin: 0, lineHeight: 1.55 }}>
            Each product stands on its own, but they share a spine: thoughtful design and
            AI that quietly does the work.
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
                {p.blurb}
              </p>
              <Link href={productHref(p)} className="sy-link-accent">
                Explore {p.name} →
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
              Make something delightful, fast.
            </h2>
            <p style={spotlightP}>
              Fizgot turns a sentence into a finished little thing — no blank canvas, no
              friction. Built for the moments when an idea should just become real.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <Bullet color={fizgot.accent}>Idea-to-output in under a minute</Bullet>
              <Bullet color={fizgot.accent}>Share anywhere with one link</Bullet>
            </div>
          </div>
          <div style={frame}>
            <BrowserChrome host="fizgot.com" />
            <ScreenshotPlaceholder label="Fizgot — drop product screenshot" />
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
              <BrowserChrome host="exportaichat.com" />
              <ScreenshotPlaceholder label="ExportAIChat — drop product screenshot" />
            </div>
            <div>
              <SpotlightLabel product={exportAiChat} />
              <h2 className="sy-section-h2" style={spotlightH2}>
                Your AI chats, worth keeping.
              </h2>
              <p style={spotlightP}>
                Conversations with AI are real work. ExportAIChat captures them in clean,
                shareable formats so nothing useful gets lost in a scroll-back.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                <Bullet color={exportAiChat.accent}>Export to PDF, Markdown &amp; web</Bullet>
                <Bullet color={exportAiChat.accent}>Organize, search and revisit</Bullet>
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
              Software that does the work, not just the talking.
            </h2>
            <p style={spotlightP}>
              Our first agent is a financial trading agent: it researches markets, manages
              risk, and executes within limits you set — around the clock, with a full
              audit trail.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              <Bullet color={agents.accent}>Runs 24/7 within hard risk limits</Bullet>
              <Bullet color={agents.accent}>Every decision logged and reversible</Bullet>
            </div>
          </div>
          <div style={frame}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "13px 16px",
                borderBottom: "1px solid #f0e8da",
                background: "#faf5ec",
              }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", color: "var(--sy-faint)" }}>
                atlas-1 · equities
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#2e7d4f" }}>
                ● running
              </span>
            </div>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: "12.5px", color: "var(--sy-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  P&amp;L · today
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#2e7d4f" }}>
                  +2.41%
                </span>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, color: "var(--sy-ink)", letterSpacing: "-0.02em" }}>
                $24,830
              </div>
              <svg viewBox="0 0 420 120" style={{ width: "100%", height: 110, marginTop: 6, display: "block" }} aria-hidden>
                <defs>
                  <linearGradient id="syArea2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(226,99,42,0.22)" />
                    <stop offset="100%" stopColor="rgba(226,99,42,0)" />
                  </linearGradient>
                </defs>
                <polygon
                  points="0,98 35,90 70,94 105,76 140,82 175,60 210,68 245,46 280,54 315,32 350,38 385,18 420,12 420,120 0,120"
                  fill="url(#syArea2)"
                />
                <polyline
                  points="0,98 35,90 70,94 105,76 140,82 175,60 210,68 245,46 280,54 315,32 350,38 385,18 420,12"
                  fill="none"
                  stroke="#e2632a"
                  strokeWidth="2.4"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 14, borderTop: "1px solid #f0e8da", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--sy-faint)" }}>
                <span>Sharpe <span style={{ color: "var(--sy-ink)" }}>2.7</span></span>
                <span>Win <span style={{ color: "var(--sy-ink)" }}>61%</span></span>
                <span>Max DD <span style={{ color: "var(--sy-ink)" }}>4.1%</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APPROACH */}
      <div style={{ background: "var(--sy-bg-alt)", borderTop: "1px solid var(--sy-border)" }}>
        <div className="sy-wrap" style={{ padding: "80px 32px" }}>
          <div style={{ maxWidth: 600, marginBottom: 46 }}>
            <Eyebrow>How we build</Eyebrow>
            <h2 className="sy-section-h2" style={{ ...spotlightH2, margin: 0 }}>
              Small studio. High standards.
            </h2>
          </div>
          <FeatureGrid features={VALUES} mark={false} />
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
          Today a one-person studio. Soon, a team of people and agents shipping together.
        </h2>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "var(--sy-muted)", maxWidth: 600, margin: "0 auto" }}>
          Suryca began as an independent studio and is incorporating as Suryca Software
          Inc. The plan is simple: keep shipping useful products, and let our own agents
          help us build them.
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
            Let&apos;s build something useful.
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--sy-muted)", maxWidth: 540, margin: "0 auto 32px" }}>
            Want to try a product, partner up, or join the studio? We&apos;d love to hear
            from you.
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="sy-btn sy-btn-primary sy-btn-lg">
              Get in touch <span>→</span>
            </Link>
            <Link href="/contact" className="sy-btn sy-btn-ghost sy-btn-lg">
              See careers
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
