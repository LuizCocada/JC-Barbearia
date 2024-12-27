"use server";

import { db } from "@/lib/prisma";

export const GetBookingOfDay = async () => {
  const nowUtc = new Date();

  // Definindo o início do dia em UTC
  const startOfToday = new Date(Date.UTC(nowUtc.getUTCFullYear(), nowUtc.getUTCMonth(), nowUtc.getUTCDate(), 0, 0, 0, 0));

  // Definindo o fim do dia em UTC
  const endOfToday = new Date(Date.UTC(nowUtc.getUTCFullYear(), nowUtc.getUTCMonth(), nowUtc.getUTCDate(), 23, 59, 59, 999));

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

  console.log(`data atual: ${nowUtc}`);
  console.log(`começo do dia (UTC): ${startOfToday}`);
  console.log(`fim do dia (UTC): ${endOfToday}`);
  console.log(`agendamentos retornados: ${bookings}`);
  return bookings;
};












// "use server";

// import { db } from "@/lib/prisma";

// export const GetBookingOfDay = async () => {

//   const nowUtc = new Date();
//   const startOfToday = new Date();
//   startOfToday.setHours(0, 0, 0, 0);

//   const endOfToday = new Date();
//   endOfToday.setHours(23, 59, 59, 999);

//    const bookings = await db.booking.findMany({
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

//   console.log(`data atual: ${nowUtc}`);
//   console.log(`começo do dia: ${startOfToday}`);
//   console.log(`fim do dia: ${endOfToday}`);
//   console.log(`agendamentos retornados: ${bookings}`);
//   return bookings;  
  
// };
