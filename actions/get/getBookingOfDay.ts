'use server';

import { db } from "@/lib/prisma";
import { add, startOfDay, endOfDay } from "date-fns";

//este bloco em producao. em desenvolvimento, usar o bloco abaixo

export const GetBookingOfDay = async () => {
  const now = new Date();
  const timeZoneOffset = now.getTimezoneOffset() * 60000;// Fuso horário em relação ao UTC (Brasil: -3h)

  // Calcula início e fim do dia no horário local
  const startOfToday = add(startOfDay(now), { hours: timeZoneOffset });
  const endOfToday = add(endOfDay(now), { hours: timeZoneOffset });

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







