"use client";

import { DiaperType, EventType, FeedingMethod } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { FormMessage } from "@/components/shared/form-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createEventAction } from "@/features/events/actions/create-event";
import { createEventSchema, type EventFormValues } from "@/features/events/event.schema";
import { formatDateTimeLocal } from "@/lib/utils";

export function EventForm({
  babies,
  dictionary,
  validation
}: {
  babies: Array<{ id: string; name: string }>;
  dictionary: {
    title: string;
    description: string;
    babyLabel: string;
    typeLabel: string;
    startedAtLabel: string;
    endedAtLabel: string;
    amountMlLabel: string;
    feedingMethodLabel: string;
    diaperTypeLabel: string;
    noteLabel: string;
    notePlaceholder: string;
    submit: string;
    submitting: string;
    types: Record<EventType, string>;
    feedingMethods: Record<FeedingMethod, string>;
    diaperTypes: Record<DiaperType, string>;
  };
  validation: {
    babyIdRequired: string;
    startedAtRequired: string;
    endedAtInvalid: string;
    amountPositive: string;
    noteMax: string;
  };
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<EventFormValues>({
    resolver: zodResolver(createEventSchema(validation)),
    defaultValues: {
      babyId: babies[0]?.id ?? "",
      type: EventType.FEEDING,
      startedAt: formatDateTimeLocal(new Date()),
      endedAt: "",
      amountMl: 90,
      feedingMethod: FeedingMethod.BOTTLE,
      diaperType: DiaperType.WET,
      note: ""
    }
  });

  const eventType = form.watch("type");

  return (
    <Card className="border-white/70 bg-white/85">
      <CardHeader>
        <CardTitle>{dictionary.title}</CardTitle>
        <CardDescription>{dictionary.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit((values) =>
            startTransition(async () => {
              const result = await createEventAction(values);

              if (!result.ok) {
                Object.entries(result.fieldErrors ?? {}).forEach(([fieldName, errors]) => {
                  if (errors?.[0]) {
                    form.setError(fieldName as keyof EventFormValues, {
                      message: errors[0]
                    });
                  }
                });

                return;
              }

              form.reset({
                babyId: values.babyId,
                type: EventType.FEEDING,
                startedAt: formatDateTimeLocal(new Date()),
                endedAt: "",
                amountMl: 90,
                feedingMethod: FeedingMethod.BOTTLE,
                diaperType: DiaperType.WET,
                note: ""
              });
              router.refresh();
            })
          )}
        >
          <div className="space-y-2">
            <Label htmlFor="babyId">{dictionary.babyLabel}</Label>
            <Select id="babyId" {...form.register("babyId")}>
              {babies.map((baby) => (
                <option key={baby.id} value={baby.id}>
                  {baby.name}
                </option>
              ))}
            </Select>
            <FormMessage message={form.formState.errors.babyId?.message} tone="error" />
          </div>

          <div className="space-y-2">
            <Label>{dictionary.typeLabel}</Label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(EventType).map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={eventType === type ? "default" : "outline"}
                  onClick={() => form.setValue("type", type)}
                >
                  {dictionary.types[type]}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startedAt">{dictionary.startedAtLabel}</Label>
              <Input id="startedAt" type="datetime-local" {...form.register("startedAt")} />
              <FormMessage message={form.formState.errors.startedAt?.message} tone="error" />
            </div>

            {eventType === EventType.SLEEP ? (
              <div className="space-y-2">
                <Label htmlFor="endedAt">{dictionary.endedAtLabel}</Label>
                <Input id="endedAt" type="datetime-local" {...form.register("endedAt")} />
                <FormMessage message={form.formState.errors.endedAt?.message} tone="error" />
              </div>
            ) : null}
          </div>

          {eventType === EventType.FEEDING ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="feedingMethod">{dictionary.feedingMethodLabel}</Label>
                <Select id="feedingMethod" {...form.register("feedingMethod")}>
                  {Object.values(FeedingMethod).map((method) => (
                    <option key={method} value={method}>
                      {dictionary.feedingMethods[method]}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amountMl">{dictionary.amountMlLabel}</Label>
                <Input id="amountMl" type="number" min={1} {...form.register("amountMl", { valueAsNumber: true })} />
                <FormMessage message={form.formState.errors.amountMl?.message} tone="error" />
              </div>
            </div>
          ) : null}

          {eventType === EventType.DIAPER ? (
            <div className="space-y-2">
              <Label htmlFor="diaperType">{dictionary.diaperTypeLabel}</Label>
              <Select id="diaperType" {...form.register("diaperType")}>
                {Object.values(DiaperType).map((diaperType) => (
                  <option key={diaperType} value={diaperType}>
                    {dictionary.diaperTypes[diaperType]}
                  </option>
                ))}
              </Select>
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="note">{dictionary.noteLabel}</Label>
            <Textarea id="note" placeholder={dictionary.notePlaceholder} {...form.register("note")} />
            <FormMessage message={form.formState.errors.note?.message} tone="error" />
          </div>

          <Button type="submit" className="w-full" disabled={isPending || babies.length === 0}>
            {isPending ? dictionary.submitting : dictionary.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
