import { type Dictionary } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/i18n/config";
import { formatDuration, formatMessage } from "@/lib/utils";
import type { EventRecord } from "@/features/events/data/events.repository";

export function getEventTitle(event: EventRecord, dictionary: Dictionary) {
  return dictionary.eventForm.types[event.type];
}

export function getEventSummary(event: EventRecord, locale: Locale, dictionary: Dictionary) {
  if (event.type === "FEEDING") {
    return formatMessage(dictionary.events.feedingSummary, {
      method: event.feedingMethod ? dictionary.eventForm.feedingMethods[event.feedingMethod] : dictionary.eventForm.types.FEEDING,
      amount: event.amountMl ?? 0
    });
  }

  if (event.type === "DIAPER") {
    return formatMessage(dictionary.events.diaperSummary, {
      diaperType: event.diaperType ? dictionary.eventForm.diaperTypes[event.diaperType] : dictionary.eventForm.types.DIAPER
    });
  }

  if (event.type === "SLEEP" && event.endedAt) {
    return formatMessage(dictionary.events.sleepSummary, {
      duration: formatDuration(event.startedAt, event.endedAt, locale)
    });
  }

  if (event.type === "NOTE") {
    return dictionary.events.noteSummary;
  }

  return event.note || dictionary.events.noNote;
}
