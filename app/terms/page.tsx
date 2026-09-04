import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Suryca's website and products.",
};

const SECTIONS = [
  {
    heading: "1. Using our products",
    body: "You may use Suryca products in line with these terms and any product-specific rules. You must be old enough to form a binding contract where you live (19 in British Columbia), and you're responsible for activity under your account.",
  },
  {
    heading: "2. Your content & ownership",
    body: "You keep ownership of the content you create or import. You grant us the limited rights needed to host and process it so we can provide the service.",
  },
  {
    heading: "3. Acceptable use",
    body: "Don't use the products to break the law, infringe others' rights, or disrupt the service. We may suspend or terminate accounts that do. You can stop using the products at any time.",
  },
  {
    heading: "4. Trading & financial risk",
    body: "Suryca Agents can place trades within limits you configure. Trading carries risk of loss; past performance does not guarantee future results. Suryca is a software company, not a registered dealer, adviser or investment fund manager under the securities laws of British Columbia or anywhere else. Nothing in the products is investment advice, and you remain responsible for your mandate and for complying with the laws that apply to your trading.",
  },
  {
    heading: "5. Availability & changes",
    body: "We work to keep the products available but can't promise uninterrupted service. We may update features and these terms over time; if a change materially reduces your rights, we'll give reasonable notice.",
  },
  {
    heading: "6. Disclaimers & liability",
    body: "The products are provided “as is” and “as available.” To the extent permitted by law, we disclaim implied warranties and conditions, and our total liability for any claim is limited to the amount you paid us in the twelve months before the claim. Some laws, including British Columbia's consumer protection laws, don't allow certain exclusions or limits; where that's the case, these apply only to the extent permitted.",
  },
  {
    heading: "7. Governing law & disputes",
    body: "These terms are governed by the laws of the Province of British Columbia and the federal laws of Canada that apply there. Any dispute will be resolved in the courts of British Columbia, and you agree to their jurisdiction — unless the law where you live gives you the right to bring a claim in your local courts. The United Nations Convention on Contracts for the International Sale of Goods does not apply.",
  },
  {
    heading: "8. Contact",
    body: "These terms are the entire agreement between you and Suryca Software Inc. about the products. Questions? Email hello@suryca.com.",
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms govern your use of Suryca Software Inc.'s website and products, including Fizgot, ExportAIChat and Suryca Agents. Suryca is a company based in British Columbia, Canada. By using our website or products, you agree to what's below."
      sections={SECTIONS}
      updated="September 2026"
    />
  );
}
