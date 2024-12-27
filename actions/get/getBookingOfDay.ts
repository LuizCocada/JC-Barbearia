"use server";

import { db } from "@/lib/prisma";
import { startOfDay, endOfDay, subHours } from 'date-fns';

export const GetBookingOfDay = async () => {
  const now = new Date();

  // Ajustando o início e o fim do dia no fuso horário local
  const startOfToday = startOfDay(now);
  const endOfToday = endOfDay(now);

  // Diminuindo 3 horas manualmente
  const startOfTodayAdjusted = subHours(startOfToday, 3);
  const endOfTodayAdjusted = subHours(endOfToday, 3);

  console.log(`data atual: ${now}`);
  console.log(`começo do dia ajustado: ${startOfTodayAdjusted}`);
  console.log(`fim do dia ajustado: ${endOfTodayAdjusted}`);

  const bookings = await db.booking.findMany({
    where: {
      date: {
        gte: startOfTodayAdjusted,
        lte: endOfTodayAdjusted,
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
