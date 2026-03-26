import { redirect } from "next/navigation";

import { SignInForm } from "@/features/auth/components/sign-in-form";
import { getCurrentUser } from "@/features/auth/data/auth.repository";
import { getI18n } from "@/lib/i18n/server";

type SignInPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  const { dictionary } = await getI18n();
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-5 py-10">
      <div className="mb-8 space-y-4">
        <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-primary shadow-soft">
          {dictionary.auth.badge}
        </span>
        <div className="space-y-3">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl leading-tight text-foreground">
            {dictionary.auth.title}
          </h1>
          <p className="text-base leading-7 text-muted-foreground">{dictionary.auth.description}</p>
        </div>
      </div>

      <SignInForm
        dictionary={dictionary.auth}
        common={{ appName: dictionary.common.appName }}
        message={params.message === "check-email" ? dictionary.auth.checkEmail : undefined}
      />
    </main>
  );
}
