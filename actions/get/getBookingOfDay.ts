"use server";

import { db } from "@/lib/prisma";
import { formatInTimeZone, toDate } from 'date-fns-tz';
import { startOfDay, endOfDay } from 'date-fns';

export const GetBookingOfDay = async () => {
  const timeZone = 'America/Sao_Paulo';

  const now = new Date();

  // Ajustando o início e o fim do dia no fuso horário "America/Sao_Paulo"
  const startOfToday = startOfDay(now);
  const endOfToday = endOfDay(now);

  // Convertendo para UTC
  const startOfTodayUtc = toDate(formatInTimeZone(startOfToday, timeZone, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX'));
  const endOfTodayUtc = toDate(formatInTimeZone(endOfToday, timeZone, 'yyyy-MM-dd\'T\'HH:mm:ss.SSSXXX'));

  console.log(`data atual: ${now}`);
  console.log(`começo do dia (UTC): ${startOfTodayUtc}`);
  console.log(`fim do dia (UTC): ${endOfTodayUtc}`);

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

  console.log(`agendamentos retornados: ${JSON.stringify(bookings, null, 2)}`);
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
