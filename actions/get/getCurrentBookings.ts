"use server";

import { db } from "@/lib/prisma";

export const GetCurrentBookings = async () => {
  
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  return await db.booking.findMany({
    where: {
      date: {
        gte: new Date(),
        lte: endOfToday,
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

















//retorna apenas os agendamentos de HOJE e MAIORES que a hora atual.
