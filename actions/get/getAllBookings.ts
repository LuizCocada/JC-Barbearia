"use server";

import { db } from "@/lib/prisma";
import { formatInTimeZone } from "date-fns-tz";

export const GetAllBookings = async () => {
  const timeZone = "America/Fortaleza";
  const now = new Date();
  const localMidnightString = formatInTimeZone(now, timeZone, "yyyy-MM-dd 00:00:00");
  const localMidnightDate = new Date(localMidnightString);

  return await db.booking.findMany({
    where: {
      date: {
        gte: localMidnightDate,
      },
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
