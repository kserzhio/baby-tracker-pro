"use server";

import { revalidatePath } from "next/cache";

import { requireCurrentUser } from "@/features/auth/data/auth.repository";
import { createBabySchema, type BabyFormValues } from "@/features/babies/baby.schema";
import { createBaby } from "@/features/babies/data/babies.repository";
import { getI18n } from "@/lib/i18n/server";

export async function createBabyAction(values: BabyFormValues) {
  const user = await requireCurrentUser();
  const { dictionary } = await getI18n();
  const schema = createBabySchema(dictionary.validation);
  const result = schema.safeParse(values);

  if (!result.success) {
    return {
      ok: false,
      fieldErrors: result.error.flatten().fieldErrors
    };
  }

  await createBaby(user.id, {
    name: result.data.name,
    birthDate: new Date(result.data.birthDate)
  });

  revalidatePath("/babies");
  revalidatePath("/dashboard");

  return {
    ok: true
  };
}
