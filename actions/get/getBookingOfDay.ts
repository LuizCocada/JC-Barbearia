"use server";

import { db } from "@/lib/prisma";
import { toDate } from "date-fns-tz";
import { startOfDay, endOfDay } from "date-fns";

export const GetBookingOfDay = async () => {
  const timeZone = "America/Fortaleza";

  const now = new Date();
  const zonedStartOfToday = startOfDay(now);
  const zonedEndOfToday = endOfDay(now);
  const utcStartOfToday = toDate(zonedStartOfToday, { timeZone });
  const utcEndOfToday = toDate(zonedEndOfToday, { timeZone });

  return await db.booking.findMany({
    where: {
      date: {
        gte: utcStartOfToday,
        lte: utcEndOfToday,
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









// "use server";

// import { db } from "@/lib/prisma";
// import { endOfDay, startOfDay } from "date-fns";

// export const GetBookingOfDay = async () => {
//   const startOfToday = new Date();
//   startOfToday.setHours(0, 0, 0, 0);

//   const endOfToday = new Date();
//   endOfToday.setHours(23, 59, 59, 999);

//   return await db.booking.findMany({
//     where: {
//       date: {
//         gte: startOfToday,
//         lte: endOfToday,
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
