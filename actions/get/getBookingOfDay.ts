"use server";

import { db } from "@/lib/prisma";

export const GetBookingOfDay = async () => {
  // Definir o fuso horário local
  const localTimezoneOffset = new Date().getTimezoneOffset(); // Diferença em minutos entre local e UTC

  // Obtendo o início do dia no horário local e convertendo para UTC
  const startOfTodayLocal = new Date();
  startOfTodayLocal.setHours(0, 0, 0, 0);
  const startOfTodayUTC = new Date(startOfTodayLocal.getTime() - localTimezoneOffset * 60 * 1000);

  // Obtendo o final do dia no horário local e convertendo para UTC
  const endOfTodayLocal = new Date();
  endOfTodayLocal.setHours(23, 59, 59, 999);
  const endOfTodayUTC = new Date(endOfTodayLocal.getTime() - localTimezoneOffset * 60 * 1000);

  // Adicionar logs para depuração
  console.log("=== Debug em produção ===");
  console.log("Horário Local (agora):", new Date());
  console.log("Início do Dia (Local):", startOfTodayLocal);
  console.log("Final do Dia (Local):", endOfTodayLocal);
  console.log("Início do Dia (UTC):", startOfTodayUTC);
  console.log("Final do Dia (UTC):", endOfTodayUTC);

  const bookings = await db.booking.findMany({
    where: {
      date: {
        gte: startOfTodayUTC, // Início do dia em UTC
        lte: endOfTodayUTC,   // Final do dia em UTC
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

  // Logar os agendamentos encontrados
  console.log("Agendamentos Encontrados:", bookings);

  return bookings;
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







