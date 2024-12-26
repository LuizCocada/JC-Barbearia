import { DateTime } from 'luxon';
import { db } from "@/lib/prisma";

export const GetBookingOfDay = async () => {
  const now = DateTime.now();
  const localTimezone = now.zoneName;

  // Início e final do dia no horário local
  const startOfTodayLocal = now.startOf('day');
  const endOfTodayLocal = now.endOf('day');

  // Convertendo para UTC
  const startOfTodayUTC = startOfTodayLocal.setZone(localTimezone).toUTC();
  const endOfTodayUTC = endOfTodayLocal.setZone(localTimezone).toUTC();

  // Debug para verificar horários
  console.log("=== Debug em produção ===");
  console.log("Horário Local (agora):", now.toISO());
  console.log("Início do Dia (Local):", startOfTodayLocal.toISO());
  console.log("Final do Dia (Local):", endOfTodayLocal.toISO());
  console.log("Início do Dia (UTC):", startOfTodayUTC.toISO());
  console.log("Final do Dia (UTC):", endOfTodayUTC.toISO());

  const bookings = await db.booking.findMany({
    where: {
      date: {
        gte: startOfTodayUTC.toJSDate(), // Início do dia em UTC
        lte: endOfTodayUTC.toJSDate(),   // Final do dia em UTC
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







