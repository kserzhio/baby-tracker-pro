import { DiaperType, EventType, FeedingMethod, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const userId = "seed-user";

  const baby = await prisma.baby.upsert({
    where: { id: "seed-baby" },
    update: {},
    create: {
      id: "seed-baby",
      userId,
      name: "Mia",
      birthDate: new Date("2026-02-14T08:00:00.000Z")
    }
  });

  const existingEvents = await prisma.event.count({
    where: {
      userId,
      babyId: baby.id
    }
  });

  if (existingEvents === 0) {
    await prisma.event.createMany({
      data: [
        {
          userId,
          babyId: baby.id,
          type: EventType.FEEDING,
          startedAt: new Date(),
          amountMl: 90,
          feedingMethod: FeedingMethod.BOTTLE,
          note: "Calm feed"
        },
        {
          userId,
          babyId: baby.id,
          type: EventType.DIAPER,
          startedAt: new Date(Date.now() - 1000 * 60 * 90),
          diaperType: DiaperType.WET
        }
      ]
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
