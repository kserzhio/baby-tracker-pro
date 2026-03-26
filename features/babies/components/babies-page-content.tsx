import { Baby } from "lucide-react";

import { BabyForm } from "@/features/babies/components/baby-form";
import { requireCurrentUser } from "@/features/auth/data/auth.repository";
import { getBabiesByUser } from "@/features/babies/data/babies.repository";
import { getI18n } from "@/lib/i18n/server";
import { formatDate, formatMessage } from "@/lib/utils";

type BabyListItem = Awaited<ReturnType<typeof getBabiesByUser>>[number];

export async function BabiesPageContent() {
  const user = await requireCurrentUser();
  const { dictionary, locale } = await getI18n();
  const babies = await getBabiesByUser(user.id);

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <BabyForm dictionary={dictionary.babies} validation={dictionary.validation} />

      <section className="space-y-4">
        <div className="space-y-1">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl text-foreground">{dictionary.babies.title}</h1>
          <p className="text-muted-foreground">{dictionary.babies.description}</p>
        </div>

        {babies.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-border bg-white/70 p-8 text-center shadow-soft">
            <p className="font-semibold text-foreground">{dictionary.babies.emptyTitle}</p>
            <p className="mt-2 text-sm text-muted-foreground">{dictionary.babies.emptyDescription}</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {babies.map((baby: BabyListItem) => (
              <article key={baby.id} className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-[family-name:var(--font-heading)] text-3xl text-foreground">{baby.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{formatDate(baby.birthDate, locale)}</p>
                  </div>
                  <div className="rounded-2xl bg-secondary p-3 text-primary">
                    <Baby className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  {formatMessage(dictionary.babies.eventsCount, { count: baby._count.events })}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
