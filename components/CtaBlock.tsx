import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

/** Centered call-to-action: heading, optional body, primary button. */
export default function CtaBlock({
  title,
  body,
  href = "/contact",
  label,
  style,
}: {
  title: string;
  body?: string;
  /** Internal path (localized automatically) or a mailto:/https: URL. */
  href?: string;
  /** Defaults to "Get in touch" in the current language. */
  label?: string;
  style?: React.CSSProperties;
}) {
  const t = useTranslations("Common");
  const text = label ?? t("getInTouch");
  const external = /^(mailto:|https?:)/.test(href);
  const className = "sy-btn sy-btn-primary sy-btn-lg";
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
      {external ? (
        <a href={href} className={className}>
          {text} <span>→</span>
        </a>
      ) : (
        <Link href={href} className={className}>
          {text} <span>→</span>
        </Link>
      )}
    </div>
  );
}
