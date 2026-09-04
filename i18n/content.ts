import { getTranslations } from "next-intl/server";
import type { Feature } from "@/components/FeatureGrid";
import { VALUE_KEYS } from "@/lib/site";

/** Company values as FeatureGrid items, in the current locale. */
export async function getValueFeatures(): Promise<Feature[]> {
  const t = await getTranslations("Values");
  return VALUE_KEYS.map((k) => ({ title: t(`${k}.title`), body: t(`${k}.body`) }));
}
