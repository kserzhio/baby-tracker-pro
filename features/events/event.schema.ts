import { DiaperType, EventType, FeedingMethod } from "@prisma/client";
import { z } from "zod";

export function createEventSchema(messages: {
  babyIdRequired: string;
  startedAtRequired: string;
  endedAtInvalid: string;
  amountPositive: string;
  noteMax: string;
}) {
  return z
    .object({
      babyId: z.string().min(1, messages.babyIdRequired),
      type: z.nativeEnum(EventType),
      startedAt: z.string().min(1, messages.startedAtRequired),
      endedAt: z.string().optional().or(z.literal("")),
      amountMl: z.coerce.number().int().positive(messages.amountPositive).optional(),
      feedingMethod: z.nativeEnum(FeedingMethod).optional(),
      diaperType: z.nativeEnum(DiaperType).optional(),
      note: z.string().max(500, messages.noteMax).optional()
    })
    .superRefine((value, ctx) => {
      if (value.type === EventType.SLEEP && value.endedAt) {
        if (new Date(value.endedAt) <= new Date(value.startedAt)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["endedAt"],
            message: messages.endedAtInvalid
          });
        }
      }
    });
}

export type EventFormValues = {
  babyId: string;
  type: EventType;
  startedAt: string;
  endedAt?: string;
  amountMl?: number;
  feedingMethod?: FeedingMethod;
  diaperType?: DiaperType;
  note?: string;
};
