"use server";

import { db } from "@/lib/prisma";
import { add, startOfDay, endOfDay } from "date-fns";


export const getBillingOfDay = async () => {

  const now = new Date();
  const timeZoneOffSet = now.getTimezoneOffset() * 60000;

  const startOfToday = add(startOfDay(now), { hours: timeZoneOffSet });
  const endOfToday = add(endOfDay(now), { hours: timeZoneOffSet });


  const result = await db.booking.findMany({
    where: {
      date: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    include: {
      service: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  return result
    .map((booking) => Number(booking.service.price))
    .reduce((a, b) => a + b, 0);
};






//este bloco usar em desenvolvimento. em producao, usar o bloco acima

// "use server";

// import { db } from "@/lib/prisma";

// export const getBillingOfDay = async () => {
//   const startOfToday = new Date();
//   startOfToday.setHours(0, 0, 0, 0);

//   const endOfToday = new Date();
//   endOfToday.setHours(23, 59, 59, 999);

//   const result = await db.booking.findMany({
//     where: {
//       date: {
//         gte: startOfToday,
//         lte: endOfToday,
//       },
//     },
//     include: {
//       service: true,
//     },
//     orderBy: {
//       date: "asc",
//     },
//   });

//   return result
//     .map((booking) => Number(booking.service.price))
//     .reduce((a, b) => a + b, 0);
// };

//a função retorna o valor total do faturamento do dia atual, somando o preço de cada serviço agendado no dia.
