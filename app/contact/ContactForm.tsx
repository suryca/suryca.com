"use client";

import { useState } from "react";
import SunMark from "@/components/SunMark";
import { CONTACT_TOPICS } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong. Please try again.");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "32px 8px" }} role="status">
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

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label className="sy-label" htmlFor="name">
            Name
          </label>
          <input id="name" name="name" className="sy-input" required autoComplete="name" maxLength={120} />
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
            maxLength={254}
          />
        </div>
      </div>

      <div>
        <label className="sy-label" htmlFor="topic">
          What&apos;s this about?
        </label>
        <select id="topic" name="topic" className="sy-select" defaultValue={CONTACT_TOPICS[0]}>
          {CONTACT_TOPICS.map((t) => (
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
          maxLength={5000}
          style={{ resize: "vertical" }}
        />
      </div>

      {/* Honeypot: hidden from people, filled by bots. Server drops submissions that set it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: -10000, top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && error ? (
        <p role="alert" style={{ margin: 0, fontSize: 14, color: "#b4471f" }}>
          {error}
        </p>
      ) : null}

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, color: "var(--sy-faint)" }}>
          We&apos;ll never share your details.
        </span>
        <button
          type="submit"
          className="sy-btn sy-btn-primary sy-btn-md"
          style={{ border: "none", cursor: sending ? "wait" : "pointer", opacity: sending ? 0.7 : 1 }}
          disabled={sending}
        >
          {sending ? "Sending…" : "Send message"} <span>→</span>
        </button>
      </div>
    </form>
  );
}
