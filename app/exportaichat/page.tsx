import type { Metadata } from "next";
import ProductPage from "@/components/ProductPage";
import { getProduct } from "@/lib/site";

const product = getProduct("exportaichat");

export const metadata: Metadata = {
  title: product.name,
  description:
    "Save, organize and share your AI conversations in clean formats — so nothing useful gets lost in a scroll-back.",
};

const FEATURES = [
  {
    title: "Capture every chat",
    body: "One click pulls a full conversation — prompts, replies, code and all — into a tidy document.",
  },
  {
    title: "Organize & search",
    body: "Tag, fold into collections and search across everything you've ever asked an AI.",
  },
  {
    title: "Share cleanly",
    body: "Send a polished link or file — formatted, readable, and free of UI clutter.",
  },
];

export default function ExportAIChatPage() {
  return (
    <ProductPage
      product={product}
      intro="Your conversations with AI are real work. ExportAIChat saves, organizes and shares them in clean formats — so nothing useful gets lost in a scroll-back."
      features={FEATURES}
      cta={{
        title: "Keep what you learn.",
        body: "Add ExportAIChat to your browser and never lose a good conversation again.",
      }}
    />
  );
}
