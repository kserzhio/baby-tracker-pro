"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { getI18n } from "@/lib/i18n/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function signInWithMagicLink(email: string) {
  const { dictionary } = await getI18n();
  const schema = z.string().email(dictionary.validation.emailInvalid);
  const parsed = schema.safeParse(email);

  if (!parsed.success) {
    return {
      ok: false,
      message: dictionary.validation.emailInvalid
    };
  }

  const headerStore = await headers();
  const origin = headerStore.get("origin") ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/dashboard`
    }
  });

  if (error) {
    return {
      ok: false,
      message: dictionary.auth.error
    };
  }

  return {
    ok: true
  };
}
