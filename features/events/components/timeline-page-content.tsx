import { EventList } from "@/features/events/components/event-list";
import { requireCurrentUser } from "@/features/auth/data/auth.repository";
import { getTimelineEvents } from "@/features/events/data/events.repository";
import { getI18n } from "@/lib/i18n/server";

export async function TimelinePageContent() {
  const user = await requireCurrentUser();
  const { dictionary, locale } = await getI18n();
  const events = await getTimelineEvents(user.id);

  return (
    <section className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl text-foreground">{dictionary.timeline.title}</h1>
        <p className="text-muted-foreground">{dictionary.timeline.description}</p>
      </div>

      <EventList
        events={events}
        emptyTitle={dictionary.timeline.emptyTitle}
        emptyDescription={dictionary.timeline.emptyDescription}
        dictionary={dictionary}
        locale={locale}
      />
    </section>
  );
}
