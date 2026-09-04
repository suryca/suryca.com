/** The Suryca sun: a warm radial-gradient circle used as the brand mark. */
export default function SunMark({
  size = 36,
  glow = true,
  style,
}: {
  size?: number;
  glow?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--sy-sun)",
        boxShadow: glow ? "0 8px 24px -6px rgba(226,99,42,0.45)" : undefined,
        ...style,
      }}
    />
  );
}
