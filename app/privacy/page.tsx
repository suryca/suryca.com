import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Suryca Software Inc. collects, uses and protects personal information.",
};

const SECTIONS = [
  {
    heading: "1. Who we are",
    body: "Suryca Software Inc. is a company based in British Columbia, Canada. We are responsible for the personal information described in this policy, and we handle it in line with British Columbia's Personal Information Protection Act (PIPA) and Canada's Personal Information Protection and Electronic Documents Act (PIPEDA). Our privacy officer can be reached at privacy@suryca.com.",
  },
  {
    heading: "2. Information we collect",
    body: "Account details you provide, such as your name and email address; messages you send us, including through the contact form; basic usage and device data needed to run and secure the products; and the content you create or import while using Fizgot, ExportAIChat and Suryca Agents.",
  },
  {
    heading: "3. How we use information & consent",
    body: "We use personal information to operate and improve the products, keep them secure, respond to you, and communicate with you about your account. We collect, use and disclose it only for purposes a reasonable person would consider appropriate, with your consent or as PIPA and PIPEDA otherwise allow. We do not sell personal information. We send marketing email only with your consent, as Canada's anti-spam legislation (CASL) requires, and you can unsubscribe at any time.",
  },
  {
    heading: "4. Your content",
    body: "Content you create or import is yours. We process it only to provide the service you've asked for, and you can export or delete it.",
  },
  {
    heading: "5. Sharing",
    body: "We share personal information only with service providers that help us run Suryca — such as hosting, email delivery and analytics — and only as needed, under contracts that require them to protect it. We may also disclose information where the law requires it, for example in response to a lawful request from a Canadian authority.",
  },
  {
    heading: "6. Where your information is stored",
    body: "Suryca is located in Canada, but some of our service providers store or process information outside Canada, including in the United States. While it's there, it may be accessible to the courts, law enforcement and national security authorities of that country. Contact our privacy officer for more about how we handle personal information outside Canada.",
  },
  {
    heading: "7. Retention & security",
    body: "We keep personal information only as long as needed for the purposes above or as the law requires, then delete or de-identify it. We encrypt data in transit and at rest and limit access on a least-privilege basis. If a breach creates a real risk of significant harm, we'll notify you and the relevant privacy commissioner as the law requires.",
  },
  {
    heading: "8. Your rights",
    body: "You can ask to access or correct the personal information we hold about you, ask how we've used or disclosed it, and withdraw your consent — subject to legal or contractual limits, and knowing that withdrawing consent may limit what we can provide. We'll respond within the time PIPA and PIPEDA allow. If you're not satisfied with our response, you can complain to the Office of the Information and Privacy Commissioner for British Columbia or the Office of the Privacy Commissioner of Canada.",
  },
  {
    heading: "9. Cookies",
    body: "Our website sets no advertising or tracking cookies. Our products use cookies and similar storage only to keep you signed in and remember your preferences.",
  },
  {
    heading: "10. Children",
    body: "Our website and products are not directed to children, and we don't knowingly collect personal information from anyone under 13.",
  },
  {
    heading: "11. Changes & contact",
    body: "We'll post material changes here and update the date above. Questions about privacy? Email privacy@suryca.com.",
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={`This policy explains what personal information Suryca Software Inc. ("Suryca", "we") collects, how we use it, and the choices you have. It applies to our website and products.`}
      sections={SECTIONS}
      updated="September 2026"
    />
  );
}
