import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Suryca's website and products.",
};

const SECTIONS = [
  {
    heading: "1. Using our products",
    body: "You may use Suryca products in line with these terms and any product-specific rules. You're responsible for activity under your account.",
  },
  {
    heading: "2. Your content & ownership",
    body: "You keep ownership of the content you create or import. You grant us the limited rights needed to host and process it so we can provide the service.",
  },
  {
    heading: "3. Acceptable use",
    body: "Don't use the products to break the law, infringe others' rights, or disrupt the service. We may suspend accounts that do.",
  },
  {
    heading: "4. Trading & financial risk",
    body: "Suryca Agents can place trades within limits you configure. Trading carries risk of loss; past performance does not guarantee future results, and you remain responsible for your mandate.",
  },
  {
    heading: "5. Availability & changes",
    body: "We work to keep the products available but can't promise uninterrupted service. We may update features and these terms over time.",
  },
  {
    heading: "6. Disclaimers & liability",
    body: "The products are provided “as is.” To the extent permitted by law, our liability is limited as described here.",
  },
  {
    heading: "7. Contact",
    body: "Questions about these terms? Email hello@suryca.com.",
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms govern your use of Suryca Software Inc.'s website and products, including Fizgot, ExportAIChat, and Suryca Agents. By using them, you agree to what's below."
      sections={SECTIONS}
    />
  );
}
