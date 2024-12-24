"use server";

import { db } from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

export const GetBookingOfDay = async () => {
  const timeZone = "America/Fortaleza"; // Ajuste para o fuso horário desejado

  // Obtém o início e o fim do dia atual no fuso horário local
  const now = new Date();
  const startOfToday = fromZonedTime(startOfDay(now), timeZone);
  const endOfToday = fromZonedTime(endOfDay(now), timeZone);

  const bookings = await db.booking.findMany({
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

  // Convertendo as datas de volta para o fuso horário local
  return bookings.map(booking => ({
    ...booking,
    date: toZonedTime(booking.date, timeZone),
  }));
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







