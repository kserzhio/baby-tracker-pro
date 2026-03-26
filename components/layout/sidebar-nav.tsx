"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Baby, Clock3, LayoutDashboard } from "lucide-react";

import { cn } from "@/lib/utils";

const iconMap = {
  "/dashboard": LayoutDashboard,
  "/babies": Baby,
  "/timeline": Clock3
};

export function SidebarNav({
  title,
  description,
  items
}: {
  title: string;
  description: string;
  items: Array<{ href: string; label: string }>;
}) {
  const pathname = usePathname();

  return (
    <div className="sticky top-8 space-y-6">
      <div className="rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-soft">
        <p className="font-[family-name:var(--font-heading)] text-3xl text-foreground">{title}</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
      </div>

      <nav className="space-y-2 rounded-[32px] border border-white/70 bg-white/70 p-3 shadow-soft">
        {items.map((item) => {
          const Icon = iconMap[item.href as keyof typeof iconMap];
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
