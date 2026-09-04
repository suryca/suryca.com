import type { Metadata } from "next";
import PageShell, { PageHeader } from "@/components/PageShell";
import FeatureGrid from "@/components/FeatureGrid";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Suryca protects your data and your money — encryption, least-privilege access, and trading safeguards.",
};

const PRACTICES = [
  {
    title: "Encryption everywhere",
    body: "Data is encrypted in transit (TLS 1.2+) and at rest (AES-256). Secrets are stored in a managed vault, never in code.",
  },
  {
    title: "Least-privilege access",
    body: "SSO and role-based access control on every system. Access is scoped, logged, and reviewed regularly.",
  },
  {
    title: "Hardened infrastructure",
    body: "Isolated environments, automated patching, and continuous monitoring on reputable cloud providers.",
  },
  {
    title: "Trading safeguards",
    body: "For Suryca Agents: hard risk limits, instant kill-switches, and a complete, replayable audit trail.",
  },
  {
    title: "Working toward formal compliance",
    body: "As we incorporate as Suryca Software Inc., we're building toward SOC 2 Type II. Reach out for our current security overview.",
  },
];

export default function SecurityPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Security"
        title="Security is a feature, not a footnote."
        intro="We build every Suryca product to protect your data and your money. Here's how we think about it — and what we commit to."
      />
      <div className="sy-wrap" style={{ padding: "44px 32px 56px" }}>
        <FeatureGrid features={PRACTICES} />
      </div>

      <div className="sy-wrap" style={{ padding: "0 32px 88px", maxWidth: 820 }}>
        <div
          style={{
            background: "var(--sy-bg-alt)",
            border: "1px solid var(--sy-border)",
            borderRadius: 18,
            padding: 32,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 26,
              letterSpacing: "-0.02em",
              margin: "0 0 12px",
              color: "var(--sy-ink)",
            }}
          >
            Responsible disclosure
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--sy-muted)", margin: "0 0 16px" }}>
            Found a vulnerability? We want to hear from you. Email us with details and
            steps to reproduce, and we&apos;ll acknowledge quickly and work with you on a
            fix. Please give us reasonable time before any public disclosure.
          </p>
          <a
            href="mailto:security@suryca.com"
            style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--sy-accent)", fontWeight: 600 }}
          >
            security@suryca.com →
          </a>
        </div>
      </div>
    </PageShell>
  );
}
