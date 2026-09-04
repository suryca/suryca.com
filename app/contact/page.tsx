import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import Eyebrow from "@/components/Eyebrow";
import ContactForm from "./ContactForm";
import { CONTACT_CHANNELS, SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.legalName}`,
};

export default function ContactPage() {
  return (
    <PageShell active="contact">
      <div className="sy-wrap" style={{ padding: "84px 32px 96px" }}>
        <div
          className="sy-grid-spotlight"
          style={{
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: 60,
            alignItems: "start",
          }}
        >
          {/* Left: details */}
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1
              className="sy-section-h2"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: 48,
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                margin: "0 0 28px",
                color: "var(--sy-ink)",
              }}
            >
              Let&apos;s talk.
            </h1>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {CONTACT_CHANNELS.map((c) => (
                <div key={c.label}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--sy-faint)",
                      marginBottom: 4,
                    }}
                  >
                    {c.label}
                  </div>
                  <a
                    href={`mailto:${c.value}`}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 15,
                      color: "var(--sy-ink)",
                    }}
                  >
                    {c.value}
                  </a>
                </div>
              ))}

              <div style={{ marginTop: 8 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--sy-faint)",
                    marginBottom: 4,
                  }}
                >
                  Studio
                </div>
                <div style={{ fontSize: 15, color: "var(--sy-ink)" }}>{SITE.legalName}</div>
                <div style={{ fontSize: 14, color: "var(--sy-muted)" }}>
                  Remote-first · building under the sun
                </div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div
            style={{
              background: "var(--sy-card)",
              border: "1px solid var(--sy-border)",
              borderRadius: 18,
              padding: 32,
              boxShadow: "0 1px 2px rgba(28,23,18,0.03)",
            }}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </PageShell>
  );
}
