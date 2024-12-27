"use server";

import { db } from "@/lib/prisma";

export const GetBookingOfDay = async () => {

  const now = new Date();

  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();

  const startOfToday = new Date(Date.UTC(year, month, day, 0, 0, 0, 0)); // Início do dia em UTC
  const endOfToday = new Date(Date.UTC(year, month, day, 23, 59, 59, 999)); // Fim do dia em UTC

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

  console.log(`data atual: ${now.toISOString()}`);
  console.log(`começo do dia: ${startOfToday.toISOString()}`);
  console.log(`fim do dia: ${endOfToday.toISOString()}`);
  console.log(`agendamentos retornados: ${JSON.stringify(bookings, null, 2)}`);
  return bookings;  
};


// "use server";

// import { db } from "@/lib/prisma";

// export const GetBookingOfDay = async () => {

//   const now = new Date();

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

//   console.log(`data atual: ${now}`);
//   console.log(`começo do dia: ${startOfToday}`);
//   console.log(`fim do dia: ${endOfToday}`);
//   console.log(`agendamentos retornados: ${bookings}`);
//   return bookings;  
// };
