/** Illustrative Suryca Agents dashboard: one running trading agent. */
export default function AgentsPreview() {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "13px 16px",
          borderBottom: "1px solid #f0e8da",
          background: "#faf5ec",
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "12.5px", color: "var(--sy-faint)" }}>
          atlas-1 · equities
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#2e7d4f" }}>● running</span>
      </div>
      <div style={{ padding: 24 }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 2 }}>
          <span style={{ fontSize: "12.5px", color: "var(--sy-faint)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            P&amp;L · today
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "#2e7d4f" }}>+2.41%</span>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 34, color: "var(--sy-ink)", letterSpacing: "-0.02em" }}>
          $24,830
        </div>
        <svg viewBox="0 0 420 120" style={{ width: "100%", height: 110, marginTop: 6, display: "block" }} aria-hidden>
          <defs>
            <linearGradient id="syArea2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(226,99,42,0.22)" />
              <stop offset="100%" stopColor="rgba(226,99,42,0)" />
            </linearGradient>
          </defs>
          <polygon
            points="0,98 35,90 70,94 105,76 140,82 175,60 210,68 245,46 280,54 315,32 350,38 385,18 420,12 420,120 0,120"
            fill="url(#syArea2)"
          />
          <polyline
            points="0,98 35,90 70,94 105,76 140,82 175,60 210,68 245,46 280,54 315,32 350,38 385,18 420,12"
            fill="none"
            stroke="#e2632a"
            strokeWidth="2.4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, paddingTop: 14, borderTop: "1px solid #f0e8da", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--sy-faint)" }}>
          <span>Sharpe <span style={{ color: "var(--sy-ink)" }}>2.7</span></span>
          <span>Win <span style={{ color: "var(--sy-ink)" }}>61%</span></span>
          <span>Max DD <span style={{ color: "var(--sy-ink)" }}>4.1%</span></span>
        </div>
      </div>
    </>
  );
}
