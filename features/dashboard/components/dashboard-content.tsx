import { Baby, Cookie, MoonStar, NotebookPen, RotateCcw } from "lucide-react";

import { requireCurrentUser } from "@/features/auth/data/auth.repository";
import { getBabiesByUser } from "@/features/babies/data/babies.repository";
import { getDashboardData } from "@/features/dashboard/data/dashboard.repository";
import { EventForm } from "@/features/events/components/event-form";
import { EventList } from "@/features/events/components/event-list";
import { getI18n } from "@/lib/i18n/server";

const iconMap = {
  babies: Baby,
  feeding: Cookie,
  sleep: MoonStar,
  diaper: RotateCcw,
  note: NotebookPen
};

export async function DashboardContent() {
  const user = await requireCurrentUser();
  const { dictionary, locale } = await getI18n();
  const [data, babies] = await Promise.all([getDashboardData(user.id), getBabiesByUser(user.id)]);

  const cards = [
    { key: "babies", label: dictionary.dashboard.totalBabies, value: data.summary.babies },
    { key: "feeding", label: dictionary.dashboard.feedingCount, value: data.summary.feeding },
    { key: "sleep", label: dictionary.dashboard.sleepCount, value: data.summary.sleep },
    { key: "diaper", label: dictionary.dashboard.diaperCount, value: data.summary.diaper },
    { key: "note", label: dictionary.dashboard.noteCount, value: data.summary.note }
  ] as const;

  return (
    <div className="space-y-6">
      <section className="space-y-1">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl text-foreground">{dictionary.dashboard.title}</h1>
        <p className="text-muted-foreground">{dictionary.dashboard.description}</p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => {
          const Icon = iconMap[card.key];

          return (
            <article key={card.key} className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-muted-foreground">{card.label}</p>
                <div className="rounded-2xl bg-secondary p-3 text-primary">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-6 font-[family-name:var(--font-heading)] text-5xl text-foreground">{card.value}</p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        <EventForm
          babies={babies.map((baby) => ({ id: baby.id, name: baby.name }))}
          dictionary={dictionary.eventForm}
          validation={dictionary.validation}
        />

        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-soft">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl text-foreground">
              {dictionary.dashboard.babiesTitle}
            </h2>
            {babies.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">{dictionary.dashboard.addBabyHint}</p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-3">
                {babies.map((baby) => (
                  <div key={baby.id} className="rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-foreground">
                    {baby.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <section className="space-y-3">
            <h2 className="font-[family-name:var(--font-heading)] text-3xl text-foreground">
              {dictionary.dashboard.recentTitle}
            </h2>
            <EventList
              events={data.recentEvents}
              emptyTitle={dictionary.dashboard.emptyTitle}
              emptyDescription={dictionary.dashboard.emptyDescription}
              dictionary={dictionary}
              locale={locale}
            />
          </section>
        </div>
      </section>
    </div>
  );
}
