import { db } from '@/lib/prisma';
import moment from 'moment-timezone';

export const GetBookingOfDay = async () => {
  const startOfToday = moment().tz('UTC').startOf('day').toDate();
  const endOfToday = moment().tz('UTC').endOf('day').toDate();

  return await db.booking.findMany({
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







