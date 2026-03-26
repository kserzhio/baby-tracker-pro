"use server";

import { revalidatePath } from "next/cache";

import { requireCurrentUser } from "@/features/auth/data/auth.repository";
import { createEvent } from "@/features/events/data/events.repository";
import { createEventSchema, type EventFormValues } from "@/features/events/event.schema";
import { getI18n } from "@/lib/i18n/server";

export async function createEventAction(values: EventFormValues) {
  const user = await requireCurrentUser();
  const { dictionary } = await getI18n();
  const schema = createEventSchema(dictionary.validation);
  const result = schema.safeParse(values);

  if (!result.success) {
    return {
      ok: false,
      fieldErrors: result.error.flatten().fieldErrors
    };
  }

  await createEvent(user.id, {
    babyId: result.data.babyId,
    type: result.data.type,
    startedAt: new Date(result.data.startedAt),
    endedAt: result.data.endedAt ? new Date(result.data.endedAt) : undefined,
    amountMl: result.data.amountMl,
    feedingMethod: result.data.feedingMethod,
    diaperType: result.data.diaperType,
    note: result.data.note?.trim() || undefined
  });

  revalidatePath("/dashboard");
  revalidatePath("/timeline");
  revalidatePath("/babies");

  return {
    ok: true
  };
}
