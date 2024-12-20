"use server";

import { db } from "@/lib/prisma";
import { addHours } from "date-fns";

export const GetBookingOfDay = async () => {
  // Definir a data atual no fuso horário local
  const now = new Date();

  // Calcular o desvio em horas do fuso horário local para UTC
  const timeZoneOffset = now.getTimezoneOffset() / 60;

  // Determinar os limites do dia no horário local
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  // Converter os limites do dia para UTC
  const startUTC = addHours(startOfToday, -timeZoneOffset);
  const endUTC = addHours(endOfToday, -timeZoneOffset);

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
