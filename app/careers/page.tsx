import type { Metadata } from "next";
import PageShell, { PageHeader } from "@/components/PageShell";
import FeatureGrid from "@/components/FeatureGrid";
import CtaBlock from "@/components/CtaBlock";
import { CONTACT_CHANNELS, VALUES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Suryca is a small AI software studio. There are no open roles right now, but we always want to hear from people who ship.",
};

const careersEmail =
  CONTACT_CHANNELS.find((c) => c.label === "Careers")?.value ?? "join@suryca.com";

export default function CareersPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Careers"
        title="No open roles right now."
        intro="Suryca is a one-person studio today, incorporating as Suryca Software Inc. We are not hiring yet, but the plan is a small team of people and agents shipping together. If that sounds like you, say hello early."
      />
      <div className="sy-wrap" style={{ padding: "44px 32px 56px" }}>
        <FeatureGrid features={VALUES} />
      </div>
      <div className="sy-wrap" style={{ padding: "0 32px 88px" }}>
        <CtaBlock
          title="Introduce yourself."
          body={`Send a short note and a link to something you built to ${careersEmail}.`}
          href={`mailto:${careersEmail}`}
          label="Email us"
        />
      </div>
    </PageShell>
  );
}
