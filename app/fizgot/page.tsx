import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";
import { getProduct } from "@/lib/site";

const product = getProduct("fizgot");

export const metadata: Metadata = {
  title: product.name,
  description:
    "A playful AI creation tool for makers. Describe an idea and watch it become something real and shareable — in minutes.",
};

const FEATURES = [
  {
    title: "Start from a sentence",
    body: "No blank canvas. Type what you want and Fizgot drafts a first version you can shape from there.",
  },
  {
    title: "Shape it live",
    body: "Nudge, remix and refine with simple controls. Every change is instant, every step reversible.",
  },
  {
    title: "Share in one click",
    body: "Publish to a link, export, or hand it off. What you make is yours to take anywhere.",
  },
];

export default function FizgotPage() {
  return (
    <ProductPage
      product={product}
      intro="A playful AI creation tool for makers. Describe an idea and watch it become something real and shareable — in minutes, not afternoons."
      features={FEATURES}
      cta={{
        title: "Make your first thing today.",
        body: "Fizgot is free to try. Bring an idea, leave with something real.",
      }}
    />
  );
}
