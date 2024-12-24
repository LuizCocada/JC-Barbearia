"use server";

import { db } from "@/lib/prisma";

export const GetAllBookings = async () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  return await db.booking.findMany({
    where: {
      date: {
        gte: startOfToday,
      },
    },
    include: {
      service: true,
      user: true,
    },
    orderBy: {
      date: "asc",
    },
  });
};
//retorna todos agendamentos a partir de hoje.
