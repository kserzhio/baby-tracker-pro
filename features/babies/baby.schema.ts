import { z } from "zod";

export function createBabySchema(messages: { nameMin: string; birthDateRequired: string }) {
  return z.object({
    name: z.string().trim().min(2, messages.nameMin),
    birthDate: z.string().min(1, messages.birthDateRequired)
  });
}

export type BabyFormValues = {
  name: string;
  birthDate: string;
};
