import type { Metadata } from "next";
import PageShell, { PageHeader } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "News",
  description: "News and announcements from Suryca Software Inc.",
};

const ITEMS = [
  {
    tag: "Company",
    title: "Suryca incorporates as Suryca Software Inc.",
    blurb:
      "What began as an independent studio is becoming a company — same focus, more room to grow.",
  },
  {
    tag: "Product",
    title: "Suryca Agents enters private beta",
    blurb:
      "Our first autonomous trading agent opens to a small cohort of partners.",
  },
  {
    tag: "Product",
    title: "ExportAIChat adds Markdown & public links",
    blurb:
      "Export conversations to clean Markdown or share them with a single public link.",
  },
  {
    tag: "Product",
    title: "Fizgot launches to the public",
    blurb:
      "The playful idea-to-output tool is now free for anyone to try.",
  },
];

export default function NewsPage() {
  return (
    <PageShell active="news">
      <PageHeader
        eyebrow="News"
        title="News & announcements"
        intro="Milestones, launches and notes on where Suryca is headed."
      />
      <div className="sy-wrap" style={{ padding: "40px 32px 88px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {ITEMS.map((it) => (
            <article
              key={it.title}
              style={{
                background: "var(--sy-card)",
                border: "1px solid var(--sy-border)",
                borderRadius: 16,
                padding: 26,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--sy-accent)",
                  background: "rgba(226,99,42,0.1)",
                  padding: "4px 9px",
                  borderRadius: 6,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
              >
                {it.tag}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 21,
                  margin: "14px 0 8px",
                  color: "var(--sy-ink)",
                }}
              >
                {it.title}
              </h3>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "var(--sy-muted)", margin: 0 }}>
                {it.blurb}
              </p>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
