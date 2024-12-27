"use server";

import { db } from "@/lib/prisma";
import { formatInTimeZone, toDate } from 'date-fns-tz';

export const GetBookingOfDay = async () => {
  const timeZone = 'America/Sao_Paulo';

  const now = new Date();
  const startOfToday = toDate(formatInTimeZone(new Date(now.setHours(0, 0, 0, 0)), timeZone, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX'));
  const endOfToday = toDate(formatInTimeZone(new Date(now.setHours(23, 59, 59, 999)), timeZone, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX'));

  const bookings = await db.booking.findMany({
    where: {
      date: {
        gte: startOfToday,
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

  console.log(`data atual: ${now}`);
  console.log(`começo do dia (UTC): ${startOfToday}`);
  console.log(`fim do dia (UTC): ${endOfToday}`);
  console.log(`agendamentos retornados: ${bookings}`);
  return bookings;
};