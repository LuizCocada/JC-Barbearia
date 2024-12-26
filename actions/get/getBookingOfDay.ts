"use server";

import { db } from "@/lib/prisma";

export const GetBookingOfDay = async () => {
  // Data e hora atual em UTC
  const nowUTC = new Date();

  // Definir início do dia em UTC
  const startOfTodayUTC = new Date(Date.UTC(nowUTC.getUTCFullYear(), nowUTC.getUTCMonth(), nowUTC.getUTCDate(), 0, 0, 0));

  // Definir final do dia em UTC
  const endOfTodayUTC = new Date(Date.UTC(nowUTC.getUTCFullYear(), nowUTC.getUTCMonth(), nowUTC.getUTCDate(), 23, 59, 59, 999));

  return await db.booking.findMany({
    where: {
      date: {
        gte: startOfTodayUTC, // A partir do início do dia UTC
        lte: endOfTodayUTC,   // Até o final do dia UTC
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







