"use client";

import { useState } from "react";
import SunMark from "@/components/SunMark";

const TOPICS = ["Product", "Partnership", "Careers", "Press", "Other"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend wired up in this design implementation — acknowledge locally.
    setSent(true);
  }

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "32px 8px" }}>
        <SunMark style={{ margin: "0 auto 18px" }} />
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 24,
            margin: "0 0 8px",
            color: "var(--sy-ink)",
          }}
        >
          Thanks — message received.
        </h3>
        <p style={{ fontSize: 15.5, color: "var(--sy-muted)", margin: 0 }}>
          We&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        <div>
          <label className="sy-label" htmlFor="name">
            Name
          </label>
          <input id="name" name="name" className="sy-input" required autoComplete="name" />
        </div>
        <div>
          <label className="sy-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="sy-input"
            required
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label className="sy-label" htmlFor="topic">
          What&apos;s this about?
        </label>
        <select id="topic" name="topic" className="sy-select" defaultValue="Product">
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="sy-label" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          className="sy-textarea"
          rows={5}
          required
          style={{ resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: "var(--sy-faint)" }}>
          We&apos;ll never share your details.
        </span>
        <button type="submit" className="sy-btn sy-btn-primary sy-btn-md" style={{ border: "none", cursor: "pointer" }}>
          Send message <span>→</span>
        </button>
      </div>
    </form>
  );
}
