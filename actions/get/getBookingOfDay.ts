"use server";

import { db } from "@/lib/prisma";
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

export const GetBookingOfDay = async () => {
  const timeZone = 'America/Sao_Paulo';

  const now = new Date();
  const startOfTodayZoned = toZonedTime(new Date(now.setHours(0, 0, 0, 0)), timeZone);
  const endOfTodayZoned = toZonedTime(new Date(now.setHours(23, 59, 59, 999)), timeZone);

  const startOfTodayUtc = fromZonedTime(startOfTodayZoned, timeZone);
  const endOfTodayUtc = fromZonedTime(endOfTodayZoned, timeZone);

  const bookings = await db.booking.findMany({
    where: {
      date: {
        gte: startOfTodayUtc,
        lte: endOfTodayUtc,
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
  console.log(`começo do dia (UTC): ${startOfTodayUtc}`);
  console.log(`fim do dia (UTC): ${endOfTodayUtc}`);
  console.log(`agendamentos retornados: ${bookings}`);
  return bookings;
};












// "use server";

// import { db } from "@/lib/prisma";

// export const GetBookingOfDay = async () => {

//   const nowUtc = new Date();
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

//   console.log(`data atual: ${nowUtc}`);
//   console.log(`começo do dia: ${startOfToday}`);
//   console.log(`fim do dia: ${endOfToday}`);
//   console.log(`agendamentos retornados: ${bookings}`);
//   return bookings;  
  
// };
