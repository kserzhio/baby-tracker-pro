"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { FormMessage } from "@/components/shared/form-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBabyAction } from "@/features/babies/actions/create-baby";
import { createBabySchema, type BabyFormValues } from "@/features/babies/baby.schema";

export function BabyForm({
  dictionary,
  validation
}: {
  dictionary: {
    formTitle: string;
    formDescription: string;
    nameLabel: string;
    namePlaceholder: string;
    birthDateLabel: string;
    submit: string;
    submitting: string;
  };
  validation: {
    nameMin: string;
    birthDateRequired: string;
  };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<BabyFormValues>({
    resolver: zodResolver(createBabySchema(validation)),
    defaultValues: {
      name: "",
      birthDate: ""
    }
  });

  return (
    <Card className="border-white/70 bg-white/85">
      <CardHeader>
        <CardTitle>{dictionary.formTitle}</CardTitle>
        <CardDescription>{dictionary.formDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values) =>
            startTransition(async () => {
              const result = await createBabyAction(values);

              if (!result.ok) {
                Object.entries(result.fieldErrors ?? {}).forEach(([fieldName, errors]) => {
                  if (errors?.[0]) {
                    form.setError(fieldName as keyof BabyFormValues, {
                      message: errors[0]
                    });
                  }
                });

                return;
              }

              form.reset();
              router.refresh();
            })
          )}
        >
          <div className="space-y-2">
            <Label htmlFor="name">{dictionary.nameLabel}</Label>
            <Input id="name" placeholder={dictionary.namePlaceholder} {...form.register("name")} />
            <FormMessage message={form.formState.errors.name?.message} tone="error" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">{dictionary.birthDateLabel}</Label>
            <Input id="birthDate" type="date" {...form.register("birthDate")} />
            <FormMessage message={form.formState.errors.birthDate?.message} tone="error" />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? dictionary.submitting : dictionary.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
