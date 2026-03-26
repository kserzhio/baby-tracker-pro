"use client";

import { useEffect } from "react";

import { localeStorageKey, type Locale } from "@/lib/i18n/config";

export function LocaleSync({ locale }: { locale: Locale }) {
  useEffect(() => {
    localStorage.setItem(localeStorageKey, locale);
  }, [locale]);

  return null;
}
