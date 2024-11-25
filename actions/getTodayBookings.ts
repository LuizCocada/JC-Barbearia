"use server";

import { db } from "@/lib/prisma";

export const getTodayBookings = async () => {
  const now = new Date();

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  return await db.booking.findMany({
    where: {
      date: {
        gte: now,
        lte: endOfToday,
      },
    },
    include: {
      service: true,
    },
    orderBy: {
      date: "asc",
    },
  });
};
