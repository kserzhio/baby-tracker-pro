import { db } from "@/lib/db";

export async function getBabiesByUser(userId: string) {
  return db.baby.findMany({
    where: { userId },
    orderBy: {
      birthDate: "desc"
    },
    include: {
      _count: {
        select: {
          events: true
        }
      }
    }
  });
}

export async function createBaby(userId: string, input: { name: string; birthDate: Date }) {
  return db.baby.create({
    data: {
      userId,
      name: input.name,
      birthDate: input.birthDate
    }
  });
}
