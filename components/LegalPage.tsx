import { useTranslations } from "next-intl";
import PageShell, { PageHeader } from "@/components/PageShell";

export type LegalSection = { heading: string; body: string };

export default function LegalPage({
  title,
  intro,
  sections,
  updated,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  /** Human-readable date the text was last revised, e.g. "September 2026". */
  updated: string;
}) {
  const t = useTranslations("Legal");
  return (
    <PageShell>
      <PageHeader eyebrow={t("eyebrow")} title={title} intro={intro} />
      <div className="sy-wrap" style={{ padding: "32px 32px 88px", maxWidth: 820 }}>
        <p
          style={{
            margin: "0 0 30px",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--sy-faint)",
          }}
        >
          {t("lastUpdated", { date: updated })}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          {sections.map((s) => (
            <section key={s.heading}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 21,
                  margin: "0 0 8px",
                  color: "var(--sy-ink)",
                }}
              >
                {s.heading}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--sy-muted)", margin: 0 }}>
                {s.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
