import BrowserChrome from "@/components/previews/BrowserChrome";
import { Chip, MiniButton, TextLine, mono } from "@/components/previews/shared";
import { getProduct } from "@/lib/site";

const fizgot = getProduct("fizgot");

/** Illustrative Fizgot UI: a one-line prompt becomes a shareable card. */
export default function FizgotPreview() {
  return (
    <>
      <BrowserChrome host="fizgot.com" />
      <div style={{ height: 300, padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Prompt bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid var(--sy-border)",
            borderRadius: 10,
            padding: "9px 10px 9px 14px",
            background: "var(--sy-bg)",
          }}
        >
          <span style={{ color: fizgot.accent, fontWeight: 700 }}>☼</span>
          <span style={{ fontSize: 13.5, color: "var(--sy-ink-soft)", flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            a thank-you card for my hiking buddy, sunset colours
          </span>
          <MiniButton accent={fizgot.accent}>Make it →</MiniButton>
        </div>

        {/* Result */}
        <div style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 16, flex: 1, minHeight: 0 }}>
          <div
            aria-hidden
            style={{
              borderRadius: 12,
              background: fizgot.gradient,
              boxShadow: fizgot.shadow,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div style={{ position: "absolute", left: 16, bottom: 14, right: 16 }}>
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.85)", width: "70%", marginBottom: 6 }} />
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.55)", width: "45%" }} />
            </div>
            <div style={{ position: "absolute", top: 14, right: 14, width: 26, height: 26, borderRadius: "50%", background: "var(--sy-sun)" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 15, color: "var(--sy-ink)" }}>
              Thanks for every summit
            </div>
            <TextLine width="92%" />
            <TextLine width="78%" />
            <TextLine width="60%" />
            <div style={{ display: "flex", gap: 8, marginTop: "auto", flexWrap: "wrap" }}>
              <Chip active accent={fizgot.accent}>Remix</Chip>
              <Chip>Warmer</Chip>
              <Chip>Shorter</Chip>
              <Chip>Share link</Chip>
            </div>
          </div>
        </div>

        {/* Drafts */}
        <div style={{ ...mono, display: "flex", gap: 16, paddingTop: 12, borderTop: "1px solid #f0e8da" }}>
          <span style={{ color: "var(--sy-ink)" }}>● Draft 3 · 41s</span>
          <span>○ Draft 2</span>
          <span>○ Draft 1</span>
        </div>
      </div>
    </>
  );
}
