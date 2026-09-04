import { notFound } from "next/navigation";

/** Any path that no page above matched renders the localized not-found page. */
export default function CatchAllPage() {
  notFound();
}
