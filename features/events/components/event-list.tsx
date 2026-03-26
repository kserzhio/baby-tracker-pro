import type { EventRecord } from "@/features/events/data/events.repository";
import { getEventSummary, getEventTitle } from "@/features/events/event-presenter";
import type { Dictionary } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/config";
import { formatDate } from "@/lib/utils";

function groupEventsByDay(events: EventRecord[]) {
  const groups = new Map<string, EventRecord[]>();

  for (const event of events) {
    const key = new Date(event.startedAt).toISOString().slice(0, 10);
    groups.set(key, [...(groups.get(key) ?? []), event]);
  }

  return Array.from(groups.entries()).sort(([left], [right]) => (left < right ? 1 : -1));
}

export function EventList({
  events,
  emptyTitle,
  emptyDescription,
  dictionary,
  locale
}: {
  events: EventRecord[];
  emptyTitle: string;
  emptyDescription: string;
  dictionary: Dictionary;
  locale: Locale;
}) {
  if (events.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-border bg-white/70 p-8 text-center shadow-soft">
        <p className="font-semibold text-foreground">{emptyTitle}</p>
        <p className="mt-2 text-sm text-muted-foreground">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groupEventsByDay(events).map(([day, dayEvents]) => (
        <section key={day} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {formatDate(day, locale, "EEEE, MMM d")}
          </h2>
          <div className="space-y-3">
            {dayEvents.map((event) => (
              <article key={event.id} className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-soft">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                      {getEventTitle(event, dictionary)}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">{event.baby.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{getEventSummary(event, locale, dictionary)}</p>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">{formatDate(event.startedAt, locale, "HH:mm")}</p>
                </div>

                {event.note ? <p className="mt-4 text-sm leading-6 text-foreground">{event.note}</p> : null}
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
