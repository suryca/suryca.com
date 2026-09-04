import { useTranslations } from "next-intl";
import PageShell, { PageHeader } from "@/components/PageShell";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");
  return (
    <PageShell>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("body")} />
      <div className="sy-wrap" style={{ padding: "32px 32px 88px" }}>
        <Link href="/" className="sy-btn sy-btn-primary sy-btn-md">
          {t("home")} <span>→</span>
        </Link>
      </div>
    </PageShell>
  );
}
