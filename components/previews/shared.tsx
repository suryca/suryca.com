/** Small building blocks shared by the illustrative product previews. */

export const mono: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 12,
  color: "var(--sy-faint)",
};

/** A muted horizontal bar standing in for a line of text. */
export function TextLine({ width = "100%", tone = "#ebe3d4" }: { width?: number | string; tone?: string }) {
  return <div aria-hidden style={{ height: 8, borderRadius: 4, background: tone, width }} />;
}

export function Chip({
  children,
  active = false,
  accent = "var(--sy-accent)",
}: {
  children: React.ReactNode;
  active?: boolean;
  accent?: string;
}) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        padding: "5px 10px",
        borderRadius: 7,
        border: `1px solid ${active ? accent : "var(--sy-border)"}`,
        background: active ? accent : "var(--sy-card)",
        color: active ? "#fff" : "var(--sy-muted)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export function MiniButton({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: accent,
        color: "#fff",
        fontWeight: 600,
        fontSize: 12,
        padding: "8px 12px",
        borderRadius: 8,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
