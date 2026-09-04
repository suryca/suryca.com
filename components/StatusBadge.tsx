import { useTranslations } from "next-intl";
import { STATUS_STYLE, type ProductStatus } from "@/lib/site";

export default function StatusBadge({ status }: { status: ProductStatus }) {
  const t = useTranslations("Status");
  const s = STATUS_STYLE[status];
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: s.color,
        background: s.background,
        padding: "4px 9px",
        borderRadius: 6,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
      }}
    >
      {t(status)}
    </span>
  );
}
