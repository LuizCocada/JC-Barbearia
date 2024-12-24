"use server";

import { db } from "@/lib/prisma";

//este bloco em producao, em desenvolvimento, o bloco comentado abaixo

export const GetAllBookings = async () => {
  const now = new Date();

  // Ajusta início do dia para UTC
  const startOfTodayUTC = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000
  );
  startOfTodayUTC.setUTCHours(0, 0, 0, 0);

  return await db.booking.findMany({
    where: {
      date: {
        gte: startOfTodayUTC, // Início do dia em UTC
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

// export const GetAllBookings = async () => {
//   const startOfToday = new Date();
//   startOfToday.setHours(0, 0, 0, 0);

//   return await db.booking.findMany({
//     where: {
//       date: {
//         gte: startOfToday,
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
//retorna todos agendamentos a partir de hoje.
