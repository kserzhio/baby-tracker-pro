import { clsx, type ClassValue } from "clsx";
import { differenceInMinutes, format, formatDistanceStrict } from "date-fns";
import { enUS, uk as ukLocale } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

import type { Locale } from "@/lib/i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getDateFnsLocale(locale: Locale) {
  return locale === "uk" ? ukLocale : enUS;
}

export function formatDate(date: Date | string, locale: Locale = "en", pattern = "MMM d, yyyy") {
  return format(new Date(date), pattern, {
    locale: getDateFnsLocale(locale)
  });
}

export function formatDateTimeLocal(date: Date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
}

export function formatDuration(start: Date | string, end: Date | string, locale: Locale) {
  return formatDistanceStrict(new Date(start), new Date(end), {
    locale: getDateFnsLocale(locale)
  });
}

export function getMinutesBetween(start: Date | string, end: Date | string) {
  return Math.max(0, differenceInMinutes(new Date(end), new Date(start)));
}

export function formatMessage(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}
