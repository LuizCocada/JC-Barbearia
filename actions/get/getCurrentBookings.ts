import { db } from "@/lib/prisma";

export const GetCurrentBookings = async () => {
  const now = new Date();

  // Obtém o início do dia e o final do dia no horário local
  const startOfNowLocal = new Date(now);
  const endOfTodayLocal = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );

  // Converte início e final do dia para UTC
  const startOfNowUTC = new Date(
    startOfNowLocal.getTime() - now.getTimezoneOffset() * 60000
  );
  const endOfTodayUTC = new Date(
    endOfTodayLocal.getTime() - now.getTimezoneOffset() * 60000
  );

  return await db.booking.findMany({
    where: {
      date: {
        gte: startOfNowUTC, // Agora ajustado para UTC
        lte: endOfTodayUTC, // Final do dia ajustado para UTC
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
