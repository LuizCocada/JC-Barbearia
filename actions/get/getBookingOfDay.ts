"use server";

import { db } from "@/lib/prisma";

export const GetBookingOfDay = async () => {

  const now = new Date();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

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
  
  console.log(`data atual: ${now}`);
  console.log(`começo do dia: ${startOfToday}`);
  console.log(`fim do dia: ${endOfToday}`);
  console.log(`agendamentos retornados: ${bookings}`);
  return bookings;  
  
};







