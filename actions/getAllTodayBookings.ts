"use server";

import { db } from "@/lib/prisma";

export const getAllTodayBookings = async () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  const result = await db.booking.findMany({
    where: {
      date: {
        gte: startOfToday,
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

  return result
    .map((booking) => Number(booking.service.price))
    .reduce((a, b) => a + b, 0);
};
