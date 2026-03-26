import { redirect } from "next/navigation";

import { getCurrentUser } from "@/features/auth/data/auth.repository";

export default async function HomePage() {
  const user = await getCurrentUser();

  redirect(user ? "/dashboard" : "/auth/sign-in");
}
