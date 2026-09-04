/** Fake browser title bar used above product preview mock-ups. */
export default function BrowserChrome({ host }: { host: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "11px 14px",
        borderBottom: "1px solid #f0e8da",
        background: "#faf5ec",
      }}
    >
      {["#e8a34a", "#e8d04a", "#d97a3f"].map((c) => (
        <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
      ))}
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          color: "var(--sy-faint)",
          marginLeft: 8,
        }}
      >
        {host}
      </span>
    </div>
  );
}
