"use server";

import { db } from "@/lib/prisma";
import { toDate } from "date-fns-tz";
import { endOfDay } from "date-fns";

export const GetCurrentBookings = async () => {
  const timeZone = "America/Fortaleza";

  const now = new Date();
  const zonedNow = new Date(now.toLocaleString("en-US", { timeZone }));
  const zonedEndOfToday = endOfDay(zonedNow);
  const utcNow = toDate(zonedNow, { timeZone });
  const utcEndOfToday = toDate(zonedEndOfToday, { timeZone });

  return await db.booking.findMany({
    where: {
      date: {
        gte: utcNow,
        lte: utcEndOfToday,
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

// export const GetCurrentBookings = async () => {
  
//   const endOfToday = new Date();
//   endOfToday.setHours(23, 59, 59, 999);

//   return await db.booking.findMany({
//     where: {
//       date: {
//         gte: new Date(),
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



//retorna apenas os agendamentos de HOJE e MAIORES que a hora atual.
