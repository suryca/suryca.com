import Link from "next/link";
import { NAV_LINKS, type NavKey } from "@/lib/site";

export default function Nav({ active }: { active?: NavKey }) {
  return (
    <div className="sy-nav">
      <div className="sy-wrap sy-nav-inner">
        <div style={{ display: "flex", alignItems: "center", gap: 42 }}>
          <Link href="/" className="sy-brand" aria-label="Suryca home">
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
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/contact" className="sy-btn sy-btn-primary sy-btn-sm">
            Get in touch <span style={{ fontSize: 15 }}>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
