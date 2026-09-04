import Link from "next/link";
import SunMark from "@/components/SunMark";
import { FOOTER_COLUMNS, SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer style={{ background: "var(--sy-bg-alt)", borderTop: "1px solid var(--sy-border)" }}>
      <div
        className="sy-wrap sy-footer-grid"
        style={{
          paddingTop: 56,
          paddingBottom: 40,
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <SunMark size={22} glow={false} />
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 16,
                letterSpacing: "0.16em",
                color: "var(--sy-ink)",
              }}
            >
              SURYCA
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: "var(--sy-faint-2)",
              maxWidth: 280,
              margin: 0,
            }}
          >
            {SITE.footerBlurb}
          </p>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div
            key={col.title}
            style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: "14.5px" }}
          >
            <span style={{ color: "var(--sy-ink)", fontWeight: 600, marginBottom: 4 }}>
              {col.title}
            </span>
            {col.links.map((l) => (
              <Link key={l.label} href={l.href} className="sy-footlink">
                {l.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div
        className="sy-wrap"
        style={{
          paddingTop: 20,
          paddingBottom: 48,
          borderTop: "1px solid var(--sy-border-strong)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          fontSize: 13,
          color: "var(--sy-faint)",
          fontFamily: "var(--font-mono)",
        }}
      >
        <span>
          © {new Date().getFullYear()} {SITE.legalName}
        </span>
        <span>Made with care, under the sun.</span>
      </div>
    </footer>
  );
}
