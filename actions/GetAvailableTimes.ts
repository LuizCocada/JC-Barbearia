"use server";

import { db } from "@/lib/prisma";

export const GetAvailableTimes = async () => {
  const times = await db.times.findMany();
  return times.sort((a, b) => {
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    return timeA[0] - timeB[0] || timeA[1] - timeB[1];
  });
};