"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { setLocale } from "@/features/locale/actions/set-locale";
import { localeStorageKey, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  label: string;
  options: Array<{
    value: Locale;
    label: string;
  }>;
};

export function LanguageSwitcher({ currentLocale, label, options }: LanguageSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm font-semibold text-muted-foreground sm:inline">{label}</span>
      <div className="inline-flex rounded-full border border-border bg-white/90 p-1">
        {options.map((option) => (
          <Button
            key={option.value}
            type="button"
            size="sm"
            variant="ghost"
            disabled={isPending}
            className={cn("rounded-full px-3", option.value === currentLocale && "bg-primary text-primary-foreground")}
            onClick={() =>
              startTransition(async () => {
                localStorage.setItem(localeStorageKey, option.value);
                await setLocale(option.value);
                router.refresh();
              })
            }
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
