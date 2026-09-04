import type { Metadata } from "next";
import PageShell, { PageHeader } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from the studio.",
};

const FEATURED = {
  title: "Building a company where people and agents ship together",
  blurb:
    "How we're structuring Suryca so that human makers and autonomous agents do real work side by side.",
};

const POSTS = [
  "How we put hard limits around an autonomous trader",
  "Why Fizgot starts from a sentence, not a blank canvas",
  "Designing clean exports for messy AI chats",
  "What one person can ship in 2026",
  "Backtesting honestly: avoiding the lies we tell ourselves",
  "A warm palette for a company named after the sun",
];

export default function BlogPage() {
  return (
    <PageShell active="blog">
      <PageHeader
        eyebrow="Blog"
        title="Notes from the studio."
        intro="Essays on building products, designing with care, and working alongside agents."
      />
      <div className="sy-wrap" style={{ padding: "40px 32px 88px" }}>
        {/* Featured */}
        <article
          style={{
            background: "var(--sy-card)",
            border: "1px solid var(--sy-border)",
            borderRadius: 18,
            padding: 32,
            marginBottom: 28,
            boxShadow: "0 1px 2px rgba(28,23,18,0.03)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--sy-accent)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Featured
          </span>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 30,
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              margin: "14px 0 10px",
              color: "var(--sy-ink)",
              textWrap: "balance",
            }}
          >
            {FEATURED.title}
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--sy-muted)", margin: 0, maxWidth: 620 }}>
            {FEATURED.blurb}
          </p>
        </article>

        {/* Post list */}
        <div className="sy-grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {POSTS.map((title) => (
            <article
              key={title}
              style={{
                background: "var(--sy-card)",
                border: "1px solid var(--sy-border)",
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 18,
                  lineHeight: 1.25,
                  margin: 0,
                  color: "var(--sy-ink)",
                  flex: 1,
                }}
              >
                {title}
              </h3>
              <span className="sy-link-accent" style={{ marginTop: 18 }}>
                Read →
              </span>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
