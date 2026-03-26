"use client";

import { useState, useTransition } from "react";

import { FormMessage } from "@/components/shared/form-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithMagicLink } from "@/features/auth/actions/sign-in";

type SignInDictionary = {
  emailLabel: string;
  emailPlaceholder: string;
  submit: string;
  submitting: string;
};

export function SignInForm({
  dictionary,
  common,
  message
}: {
  dictionary: SignInDictionary;
  common: {
    appName: string;
  };
  message?: string;
}) {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState(message);
  const [tone, setTone] = useState<"success" | "error" | "muted">(message ? "success" : "muted");
  const [isPending, startTransition] = useTransition();

  return (
    <Card className="border-white/70 bg-white/85">
      <CardHeader>
        <CardTitle>{common.appName}</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();

            startTransition(async () => {
              const result = await signInWithMagicLink(email);

              if (result.ok) {
                window.location.assign("/auth/sign-in?message=check-email");
                return;
              }

              setTone("error");
              setFeedback(result.message);
            });
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">{dictionary.emailLabel}</Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder={dictionary.emailPlaceholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <FormMessage message={feedback} tone={tone} />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? dictionary.submitting : dictionary.submit}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
