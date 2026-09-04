/** Small mono, uppercase label that sits above a heading. */
export default function Eyebrow({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        color: "var(--sy-accent)",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: 14,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
