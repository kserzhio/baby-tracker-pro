"use server";

import { headers } from "next/headers";
import { z } from "zod";

import { getI18n } from "@/lib/i18n/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function getAppUrl(headerStore: Headers) {
  const configuredUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  const forwardedProto = headerStore.get("x-forwarded-proto");
  const forwardedHost = headerStore.get("x-forwarded-host");

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  const origin = headerStore.get("origin");

  if (origin) {
    return origin.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}

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
  const appUrl = getAppUrl(headerStore);
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: {
      emailRedirectTo: `${appUrl}/auth/callback?next=/dashboard`
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
