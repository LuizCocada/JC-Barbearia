"use server";

import { db } from "@/lib/prisma";
import { toZonedTime, fromZonedTime } from 'date-fns-tz';

export const GetBookingOfDay = async () => {
  const timeZone = 'America/Sao_Paulo';

  const now = new Date();

  // Ajustando o início e o fim do dia no fuso horário "America/Sao_Paulo"
  const startOfToday = new Date(now.setHours(0, 0, 0, 0));
  const endOfToday = new Date(now.setHours(23, 59, 59, 999));

  const startOfTodayZoned = toZonedTime(startOfToday, timeZone);
  const endOfTodayZoned = toZonedTime(endOfToday, timeZone);

  // Convertendo para UTC
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

  // Convertendo as datas dos agendamentos de UTC para o fuso horário local
  const bookingsInLocalTime = bookings.map(booking => ({
    ...booking,
    date: toZonedTime(booking.date, timeZone),
  }));

  console.log(`data atual: ${now}`);
  console.log(`começo do dia (UTC): ${startOfTodayUtc}`);
  console.log(`fim do dia (UTC): ${endOfTodayUtc}`);
  console.log(`agendamentos retornados: ${JSON.stringify(bookingsInLocalTime, null, 2)}`);
  return bookingsInLocalTime;
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
