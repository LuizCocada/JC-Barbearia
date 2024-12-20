"use server";

import { db } from "@/lib/prisma";
import { startOfDay, endOfDay, addHours } from "date-fns";

export const GetBookingOfDay = async () => {
  // Obtenha a data atual com base no horário local
  const localNow = new Date();

  // Ajuste o horário local para UTC
  const timeZoneOffset = localNow.getTimezoneOffset() / 60;

  // Calcular início e fim do dia no horário local convertido para UTC
  const startOfTodayLocal = startOfDay(localNow); // Meia-noite no horário local
  const endOfTodayLocal = endOfDay(localNow); // 23:59:59 no horário local

  const startUTC = addHours(startOfTodayLocal, -timeZoneOffset);
  const endUTC = addHours(endOfTodayLocal, -timeZoneOffset);

  // Consulta no banco com datas corrigidas para UTC
  return await db.booking.findMany({
    where: {
      date: {
        gte: startUTC,
        lte: endUTC,
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
// import { endOfDay, startOfDay } from "date-fns";

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
