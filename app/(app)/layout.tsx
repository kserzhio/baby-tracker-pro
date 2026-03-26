import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/app-shell";
import { requireCurrentUser } from "@/features/auth/data/auth.repository";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await requireCurrentUser();

  return <AppShell email={user.email ?? ""}>{children}</AppShell>;
}
