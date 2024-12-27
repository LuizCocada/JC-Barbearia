"use server";

import { db } from "@/lib/prisma";

export const GetBookingOfDay = async () => {

  const now = new Date();

  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();

  // Início do dia local (00:00 UTC-3) em UTC
  const startOfTodayUTC = new Date(Date.UTC(year, month, day, 3, 0, 0, 0));

  // Fim do dia local (23:59:59.999 UTC-3) em UTC
  const endOfTodayUTC = new Date(startOfTodayUTC.getTime() + (24 * 60 * 60 * 1000) - 1);

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

  console.log(`data atual: ${now.toISOString()}`);
  console.log(`começo do dia (UTC): ${startOfTodayUTC.toISOString()}`);
  console.log(`fim do dia (UTC): ${endOfTodayUTC.toISOString()}`);
  console.log(`agendamentos retornados: ${JSON.stringify(bookings, null, 2)}`);
  return bookings;  
};


// "use server";

// import { db } from "@/lib/prisma";

// export const GetBookingOfDay = async () => {

//   const now = new Date();

//   const startOfToday = new Date();
//   startOfToday.setHours(0, 0, 0, 0);

//   const endOfToday = new Date();
//   endOfToday.setHours(23, 59, 59, 999);

//    const bookings = await db.booking.findMany({
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

//   console.log(`data atual: ${now}`);
//   console.log(`começo do dia: ${startOfToday}`);
//   console.log(`fim do dia: ${endOfToday}`);
//   console.log(`agendamentos retornados: ${bookings}`);
//   return bookings;  
// };
