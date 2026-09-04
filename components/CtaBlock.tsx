import Link from "next/link";

/** Centered call-to-action: heading, optional body, primary button. */
export default function CtaBlock({
  title,
  body,
  href = "/contact",
  label = "Get in touch",
  style,
}: {
  title: string;
  body?: string;
  href?: string;
  label?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div style={{ textAlign: "center", ...style }}>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: 32,
          letterSpacing: "-0.02em",
          margin: "0 0 10px",
          color: "var(--sy-ink)",
          textWrap: "balance",
        }}
      >
        {title}
      </h2>
      {body ? (
        <p style={{ fontSize: 17, color: "var(--sy-muted)", margin: "0 0 24px" }}>{body}</p>
      ) : null}
      <Link href={href} className="sy-btn sy-btn-primary sy-btn-lg">
        {label} <span>→</span>
      </Link>
    </div>
  );
}
