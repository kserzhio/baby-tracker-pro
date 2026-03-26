import type { Locale } from "@/lib/i18n/config";
import en from "@/lib/i18n/messages/en";
import uk from "@/lib/i18n/messages/uk";

export const dictionaries = {
  en,
  uk
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
