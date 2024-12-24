"use server";

import { db } from "@/lib/prisma";

export const GetBookingOfDay = async () => {
  const now = new Date();

  // Calcula o início e fim do dia em UTC
  const startOfTodayUTC = new Date(now.getTime() - now.getTimezoneOffset() * 60000); 
  startOfTodayUTC.setUTCHours(0, 0, 0, 0); 

  const endOfTodayUTC = new Date(now.getTime() - now.getTimezoneOffset() * 60000); 
  endOfTodayUTC.setUTCHours(23, 59, 59, 999); 

  // Fazer a consulta no banco com base em UTC
  const bookings = await db.booking.findMany({
    where: {
      date: {
        gte: startOfTodayUTC,
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

  return bookings;
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







