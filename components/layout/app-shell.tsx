import type { ReactNode } from "react";
import Link from "next/link";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { LanguageSwitcher } from "@/features/locale/components/language-switcher";
import { navigationItems } from "@/lib/constants";
import { getI18n } from "@/lib/i18n/server";
import { formatMessage } from "@/lib/utils";

export async function AppShell({ children, email }: { children: ReactNode; email: string }) {
  const { locale, dictionary } = await getI18n();
  const navigation = navigationItems.map((item) => ({
    href: item.href,
    label: dictionary.navigation[item.key]
  }));

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-24 pt-4 sm:px-6 lg:grid lg:grid-cols-[260px_1fr] lg:gap-8 lg:px-8 lg:pb-8">
      <aside className="hidden lg:block">
        <SidebarNav
          items={navigation}
          title={dictionary.common.appName}
          description={dictionary.common.appDescription}
        />
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 mb-6 rounded-[28px] border border-white/70 bg-white/85 p-4 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="font-[family-name:var(--font-heading)] text-3xl text-foreground">
                {dictionary.common.appName}
              </p>
              <p className="text-sm text-muted-foreground">{dictionary.common.appDescription}</p>
              <p className="text-xs font-medium text-muted-foreground">
                {formatMessage(dictionary.common.signedInAs, { email })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher
                currentLocale={locale}
                label={dictionary.common.language}
                options={[
                  { value: "en", label: dictionary.common.english },
                  { value: "uk", label: dictionary.common.ukrainian }
                ]}
              />
              <SignOutButton label={dictionary.common.signOut} />
            </div>
          </div>

          <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
