import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { NAV_LINKS, type NavKey } from "@/lib/site";

export default function Nav({ active }: { active?: NavKey }) {
  const t = useTranslations("Nav");
  const tc = useTranslations("Common");
  return (
    <div className="sy-nav">
      <div className="sy-wrap sy-nav-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 42 }}>
          <Link href="/" className="sy-brand" aria-label={tc("brandHome")}>
            <div className="sy-brand-mark" />
            <span className="sy-brand-word">SURYCA</span>
          </Link>
          <div className="sy-navlinks sy-navlinks-secondary">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.key}
                href={l.href}
                className="sy-navlink"
                aria-current={active === l.key ? "page" : undefined}
              >
                {t(l.key)}
              </Link>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/contact" className="sy-btn sy-btn-primary sy-btn-sm">
            {tc("getInTouch")} <span style={{ fontSize: 15 }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
