"use server";

import { db } from "@/lib/prisma";

export const GetCurrentBookings = async () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();

  // fim do dia UTC (02:59:59 do dia seguinte)
  const endOfTodayUTC = new Date(Date.UTC(year, month, day + 1, 2, 59, 59, 999));

  return await db.booking.findMany({
    where: {
      date: {
        gte: now,
        lte: endOfTodayUTC,
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

// export const GetCurrentBookings = async () => {
  
//   const now = new Date();
//   const year = now.getUTCFullYear();
//   const month = now.getUTCMonth();
//   const day = now.getUTCDate();

//   const nowUTC = new Date();
//   nowUTC.setHours(now.getUTCHours() + 3);

//   //fim dia local (23:59:59) => fim dia UTC (02:59:59)
//   const endOfTodayUTC = new Date(Date.UTC(year, month, day + 1, 2, 59, 59, 999));


//   return await db.booking.findMany({
//     where: {
//       date: {
//         gte: nowUTC,
//         lte: endOfTodayUTC,
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

//development UTC
// "use server";
//
// import { db } from "@/lib/prisma";
//
// export const GetCurrentBookings = async () => {
//
// const endOfToday = new Date();
// endOfToday.setHours(23, 59, 59, 999);
//
// return await db.booking.findMany({
// where: {
// date: {
// gte: new Date(),
// lte: endOfToday,
// },
// },
// include: {
// service: true,
// user: true,
// },
// orderBy: {
// date: "asc",
// },
// });
// };
