import BrowserChrome from "@/components/previews/BrowserChrome";
import { Chip, MiniButton, TextLine, mono } from "@/components/previews/shared";
import { getProduct } from "@/lib/site";

const product = getProduct("exportaichat");

function Bubble({ who, lines, accent }: { who: "You" | "AI"; lines: (number | string)[]; accent?: string }) {
  const mine = who === "You";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: mine ? "flex-end" : "flex-start" }}>
      <span style={{ ...mono, fontSize: 10.5, color: mine && accent ? accent : "var(--sy-faint)" }}>{who}</span>
      <div
        style={{
          maxWidth: "88%",
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          background: mine ? "rgba(217,146,17,0.12)" : "var(--sy-bg)",
          border: "1px solid var(--sy-border)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {lines.map((w, i) => (
          <TextLine key={i} width={w} tone={mine ? "rgba(217,146,17,0.35)" : "#ebe3d4"} />
        ))}
      </div>
    </div>
  );
}

/** Illustrative ExportAIChat UI: a chat on the left, export options on the right. */
export default function ExportAIChatPreview() {
  return (
    <>
      <BrowserChrome host="exportaichat.com" />
      <div style={{ height: 300, display: "grid", gridTemplateColumns: "1.1fr 0.9fr" }}>
        {/* Conversation */}
        <div style={{ padding: 18, borderRight: "1px solid #f0e8da", display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13.5, color: "var(--sy-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            Q3 roadmap brainstorm
          </div>
          <Bubble who="You" lines={["70%"]} accent={product.accent} />
          <Bubble who="AI" lines={["100%", "92%", "64%"]} />
          <Bubble who="You" lines={["48%"]} accent={product.accent} />
          <Bubble who="AI" lines={["96%", "58%"]} />
        </div>

        {/* Export panel */}
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14, background: "#fdfbf7" }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13.5, color: "var(--sy-ink)" }}>
            Export conversation
          </div>
          <div>
            <div style={{ ...mono, fontSize: 10.5, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Format</div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Chip active accent={product.accent}>PDF</Chip>
              <Chip>Markdown</Chip>
              <Chip>Link</Chip>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 12.5, color: "var(--sy-ink-soft)" }}>
            <span><span style={{ color: product.accent, fontWeight: 700 }}>✓</span> Include code blocks</span>
            <span><span style={{ color: product.accent, fontWeight: 700 }}>✓</span> Strip UI clutter</span>
            <span><span style={{ color: "var(--sy-faint)" }}>○</span> Add to collection</span>
          </div>
          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
            <span style={mono}>14 messages</span>
            <MiniButton accent={product.accent}>Export →</MiniButton>
          </div>
        </div>
      </div>
    </>
  );
}
