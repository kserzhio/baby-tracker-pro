import { type DiaperType, Prisma, type EventType, type FeedingMethod } from "@prisma/client";
import { startOfDay, subDays } from "date-fns";

import { db } from "@/lib/db";

const eventInclude = {
  baby: {
    select: {
      id: true,
      name: true,
      birthDate: true
    }
  }
} satisfies Prisma.EventInclude;

export type EventRecord = Prisma.EventGetPayload<{
  include: typeof eventInclude;
}>;

export async function createEvent(
  userId: string,
  input: {
    babyId: string;
    type: EventType;
    startedAt: Date;
    endedAt?: Date;
    amountMl?: number;
    feedingMethod?: FeedingMethod;
    diaperType?: DiaperType;
    note?: string;
  }
) {
  return db.event.create({
    data: {
      ...input,
      userId
    }
  });
}

export async function getRecentEvents(userId: string, limit = 8) {
  return db.event.findMany({
    where: { userId },
    include: eventInclude,
    orderBy: {
      startedAt: "desc"
    },
    take: limit
  });
}

export async function getTodayEvents(userId: string) {
  const todayStart = startOfDay(new Date());

  return db.event.findMany({
    where: {
      userId,
      startedAt: {
        gte: todayStart
      }
    },
    include: eventInclude,
    orderBy: {
      startedAt: "desc"
    }
  });
}

export async function getTimelineEvents(userId: string) {
  return db.event.findMany({
    where: {
      userId,
      startedAt: {
        gte: subDays(startOfDay(new Date()), 30)
      }
    },
    include: eventInclude,
    orderBy: {
      startedAt: "desc"
    }
  });
}
