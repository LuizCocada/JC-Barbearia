"use server";

import { db } from "@/lib/prisma";

//fixed production UTC clock
export const GetAllBookings = async () => {

  const now = new Date();

  const year = now.getUTCFullYear();
  const month = now.getUTCMonth();
  const day = now.getUTCDate();
  
  const startOfToday = new Date(Date.UTC(year, month, day, 3, 0, 0, 0));

  return await db.booking.findMany({
    where: {
      date: {
        gte: startOfToday,
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

//development UTC clock
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
