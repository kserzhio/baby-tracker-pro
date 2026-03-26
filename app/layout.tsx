import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { LocaleSync } from "@/features/locale/components/locale-sync";
import { getI18n } from "@/lib/i18n/server";
import "./globals.css";

const headingFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading"
});

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body"
});

export async function generateMetadata(): Promise<Metadata> {
  const { dictionary } = await getI18n();

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description
  };
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const { locale } = await getI18n();

  return (
    <html lang={locale}>
      <body className={`${headingFont.variable} ${bodyFont.variable} font-[family-name:var(--font-body)]`}>
        <LocaleSync locale={locale} />
        {children}
      </body>
    </html>
  );
}
