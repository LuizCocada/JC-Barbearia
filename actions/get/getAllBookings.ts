"use server";

import { db } from "@/lib/prisma";
import { startOfDay } from "date-fns";
import { zonedTimeToUtc, utcToZonedTime } from "date-fns-tz";

export const GetAllBookings = async () => {
  const timeZone = "America/Fortaleza";
  const now = new Date();
  const zonedNow = utcToZonedTime(now, timeZone);
  const localStartOfToday = startOfDay(zonedNow);
  const utcStartOfToday = zonedTimeToUtc(localStartOfToday, timeZone);

  return await db.booking.findMany({
    where: {
      date: { gte: utcStartOfToday },
    },
    include: { service: true, user: true },
    orderBy: { date: "asc" },
  });
};

// "use server";

// import { db } from "@/lib/prisma";

// export const GetAllBookings = async () => {
//   const startOfToday = new Date();
//   startOfToday.setHours(0, 0, 0, 0);

//   return await db.booking.findMany({
//     where: {
//       date: {
//         gte: startOfToday,
//       },
//     },
//     include: {
//       service: true,
//       user: true,
//     },
//     orderBy: {
//       date: "asc",
//     },
//   });
// };
//retorna todos agendamentos a partir de hoje.
