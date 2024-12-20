"use server";

import { db } from "@/lib/prisma";
import { startOfDay, endOfDay, addHours } from "date-fns";

export const GetBookingOfDay = async () => {
  const timeZoneOffset = -3; 

  const now = new Date();
  const startOfToday = addHours(startOfDay(now), timeZoneOffset);
  const endOfToday = addHours(endOfDay(now), timeZoneOffset);

  return await db.booking.findMany({
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
