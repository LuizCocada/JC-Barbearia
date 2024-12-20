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



// "use server";

// import { db } from "@/lib/prisma";
// import { toDate } from "date-fns-tz";
// import { startOfDay } from "date-fns";

// export const GetAllBookings = async () => {
//   const timeZone = "America/Fortaleza";

//   const now = new Date();
//   const zonedStartOfToday = startOfDay(now);
//   const utcStartOfToday = toDate(zonedStartOfToday, { timeZone });

//   return await db.booking.findMany({
//     where: {
//       date: {
//         gte: utcStartOfToday,
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








