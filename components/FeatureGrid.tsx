export type Feature = { title: string; body: string };

/**
 * Responsive card grid (max 3 columns). `accent` colours the small square
 * mark in each card; pass `mark={false}` to omit the mark entirely.
 */
export default function FeatureGrid({
  features,
  accent = "var(--sy-accent)",
  mark = true,
}: {
  features: Feature[];
  accent?: string;
  mark?: boolean;
}) {
  return (
    <div
      className="sy-grid-3"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(features.length, 3)},1fr)`,
        gap: 22,
      }}
    >
      {features.map((f) => (
        <div
          key={f.title}
          style={{
            background: "var(--sy-card)",
            border: "1px solid var(--sy-border)",
            borderRadius: 16,
            padding: 28,
          }}
        >
          {mark ? (
            <div
              aria-hidden
              style={{
                width: 30,
                height: 30,
                borderRadius: 9,
                marginBottom: 16,
                background: accent,
                opacity: 0.9,
              }}
            />
          ) : null}
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: mark ? 19 : 20,
              margin: mark ? "0 0 9px" : "0 0 10px",
              color: "var(--sy-ink)",
            }}
          >
            {f.title}
          </h3>
          <p
            style={{
              fontSize: mark ? 15 : "15.5px",
              lineHeight: 1.6,
              color: "var(--sy-muted)",
              margin: 0,
            }}
          >
            {f.body}
          </p>
        </div>
      ))}
    </div>
  );
}
