import { NextResponse } from "next/server";
import { CONTACT_TOPICS } from "@/lib/site";

export const dynamic = "force-dynamic";

const LIMITS = { name: 120, email: 254, message: 5000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Published Resend template (alias). Declares the variables NAME, TOPIC,
 * SENDER_EMAIL and MESSAGE with no fallbacks and no default from/subject, so
 * every send must supply all of them. Source copy: emails/contact-notification.html.
 */
const TEMPLATE_ALIAS = "contact-form";

type Submission = {
  name: string;
  email: string;
  topic: (typeof CONTACT_TOPICS)[number];
  message: string;
};

function fail(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

/**
 * Resend substitutes {{{VAR}}} verbatim into the template HTML (verified by a
 * test send), so user input must be escaped or it becomes markup.
 */
function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function parse(body: unknown): { data?: Submission; error?: string; spam?: boolean } {
  if (!body || typeof body !== "object") return { error: "Invalid request body." };
  const b = body as Record<string, unknown>;

  // Honeypot: real users never see or fill this field.
  if (typeof b.website === "string" && b.website.trim() !== "") return { spam: true };

  const name = String(b.name ?? "").trim();
  const email = String(b.email ?? "").trim();
  const topic = String(b.topic ?? "").trim();
  const message = String(b.message ?? "").trim();

  if (!name || name.length > LIMITS.name) return { error: "Please enter your name." };
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    return { error: "Please enter a valid email address." };
  if (!(CONTACT_TOPICS as readonly string[]).includes(topic))
    return { error: "Please choose a topic." };
  if (!message || message.length > LIMITS.message)
    return { error: `Please enter a message (up to ${LIMITS.message} characters).` };

  return { data: { name, email, topic: topic as Submission["topic"], message } };
}

async function sendViaResend(data: Submission): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Suryca <hello@suryca.com>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL not set; submission logged only:", data);
      return { ok: true };
    }
    return { ok: false, error: "Contact form is not configured." };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `[suryca.com] ${data.topic} — ${data.name}`,
      template: {
        id: TEMPLATE_ALIAS,
        variables: {
          NAME: escapeHtml(data.name),
          TOPIC: escapeHtml(data.topic),
          SENDER_EMAIL: escapeHtml(data.email),
          MESSAGE: escapeHtml(data.message),
        },
      },
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text().catch(() => ""));
    return { ok: false, error: "Could not send your message. Please email us directly." };
  }
  return { ok: true };
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return fail("Invalid request body.");
  }

  const parsed = parse(body);
  if (parsed.spam) return NextResponse.json({ ok: true }); // silently drop bots
  if (!parsed.data) return fail(parsed.error ?? "Invalid submission.");

  const result = await sendViaResend(parsed.data);
  if (!result.ok) {
    const status = result.error.startsWith("Contact form is not configured") ? 503 : 502;
    return fail(result.error, status);
  }
  return NextResponse.json({ ok: true });
}
