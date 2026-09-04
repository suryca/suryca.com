import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";
import { getProduct } from "@/lib/site";

const product = getProduct("agents");

export const metadata: Metadata = {
  title: product.name,
  description:
    "Autonomous software that does real work. Our first agent trades financial markets within hard limits you set, around the clock.",
};

const FEATURES = [
  {
    title: "Hard risk limits",
    body: "VaR, drawdown and exposure ceilings enforced before any order — never as an afterthought.",
  },
  {
    title: "Instant kill-switch",
    body: "Flatten any agent or the whole fleet in one click, from anywhere.",
  },
  {
    title: "Full audit trail",
    body: "Every decision, signal and fill is timestamped and replayable.",
  },
  {
    title: "Paper → live",
    body: "Backtest and paper-trade first; promote to live with a single flag when you're ready.",
  },
];

export default function AgentsPage() {
  return (
    <ProductPage
      product={product}
      intro="Autonomous software that does real work. Our first agent trades financial markets — researching, managing risk, and executing within limits you set, around the clock."
      features={FEATURES}
      cta={{
        title: "Bring autonomy to your desk.",
        body: "We're onboarding a first cohort of partners. Tell us your mandate and we'll run an agent against it.",
      }}
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
          Autonomy, with the brakes you&apos;d expect.
        </h2>
        <p style={{ fontSize: 16, color: "var(--sy-muted)", margin: 0 }}>
          Control &amp; trust — Sharpe 2.7 · Win 61% · Max DD 4.1%
        </p>
      </div>
    </ProductPage>
  );
}
