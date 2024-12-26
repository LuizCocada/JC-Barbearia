"use server";

import { db } from "@/lib/prisma";

export const GetCurrentBookings = async () => {
  // Obtendo a data e hora atual em UTC
  const nowUTC = new Date();

  // Definir o final do dia em UTC
  const endOfTodayUTC = new Date(Date.UTC(nowUTC.getUTCFullYear(), nowUTC.getUTCMonth(), nowUTC.getUTCDate(), 23, 59, 59, 999));

  return await db.booking.findMany({
    where: {
      date: {
        gte: nowUTC,        // Agendamentos a partir de agora
        lte: endOfTodayUTC, // Até o final do dia
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
//   // Obtendo o horário atual (sem depender do fuso horário do sistema)
//   const nowUTC = new Date();

//   // Definir início e final do dia no UTC
//   const startOfTodayUTC = new Date(Date.UTC(nowUTC.getUTCFullYear(), nowUTC.getUTCMonth(), nowUTC.getUTCDate(), 0, 0, 0));
//   const endOfTodayUTC = new Date(Date.UTC(nowUTC.getUTCFullYear(), nowUTC.getUTCMonth(), nowUTC.getUTCDate(), 23, 59, 59, 999));

//   return await db.booking.findMany({
//     where: {
//       date: {
//         gte: startOfTodayUTC, // Data >= início do dia em UTC
//         lte: endOfTodayUTC,   // Data <= final do dia em UTC
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
