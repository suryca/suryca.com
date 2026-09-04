import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Eyebrow from "@/components/Eyebrow";
import type { NavKey } from "@/lib/site";

export default function PageShell({
  active,
  children,
}: {
  active?: NavKey;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav active={active} />
      <main style={{ minHeight: "60vh" }}>{children}</main>
      <Footer />
    </>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="sy-wrap" style={{ padding: "84px 32px 8px", maxWidth: 820 }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1
        className="sy-section-h2"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 52,
          lineHeight: 1.05,
          letterSpacing: "-0.025em",
          margin: 0,
          color: "var(--sy-ink)",
          textWrap: "balance",
        }}
      >
        {title}
      </h1>
      {intro ? (
        <p
          style={{
            fontSize: 19,
            lineHeight: 1.6,
            color: "var(--sy-muted)",
            maxWidth: 620,
            margin: "20px 0 0",
          }}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
