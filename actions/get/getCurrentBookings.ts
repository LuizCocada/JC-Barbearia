"use server";

import { db } from "@/lib/prisma";

export const GetCurrentBookings = async () => {
  const now = new Date();

  // Ajusta agora e o final do dia para UTC
  const currentUTC = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  const endOfTodayUTC = new Date(currentUTC);
  endOfTodayUTC.setUTCHours(23, 59, 59, 999);

  return await db.booking.findMany({
    where: {
      date: {
        gte: currentUTC, // Agora em UTC
        lte: endOfTodayUTC, // Final do dia em UTC
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
