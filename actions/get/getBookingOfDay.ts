"use server";

import { db } from "@/lib/prisma";
import { toZonedTime, fromZonedTime } from "date-fns-tz";

export const GetBookingOfDay = async () => {
  const timeZone = "America/Sao_Paulo"; // Ajuste para o fuso horário desejado

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfTodayUTC = fromZonedTime(startOfToday, timeZone);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  const endOfTodayUTC = fromZonedTime(endOfToday, timeZone);

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







