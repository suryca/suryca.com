import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Suryca Software Inc. collects, uses and protects information.",
};

const SECTIONS = [
  {
    heading: "1. Information we collect",
    body: "Account details you provide, basic usage data needed to run the products, and the content you create or import while using Fizgot, ExportAIChat, and Suryca Agents.",
  },
  {
    heading: "2. How we use information",
    body: "To operate and improve the products, keep them secure, and communicate with you about your account. We do not sell personal information.",
  },
  {
    heading: "3. Your content",
    body: "Content you create or import is yours. We process it only to provide the service you've asked for, and you can export or delete it.",
  },
  {
    heading: "4. Sharing",
    body: "We share data only with service providers that help us run Suryca, and only as needed — under contracts that require them to protect it.",
  },
  {
    heading: "5. Data retention & security",
    body: "We keep data only as long as needed, encrypt it in transit and at rest, and limit access on a least-privilege basis.",
  },
  {
    heading: "6. Your rights",
    body: "Depending on where you live, you may have rights to access, correct, export or delete your data. Contact us to exercise them.",
  },
  {
    heading: "7. Changes & contact",
    body: "We'll post material changes here. Questions about privacy? Email privacy@suryca.com.",
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`This policy explains what information Suryca Software Inc. ("Suryca", "we") collects, how we use it, and the choices you have. It applies to our website and products.`}
      sections={SECTIONS}
      updated="September 2026"
    />
  );
}
