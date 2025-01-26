"use server";

import { db } from "@/lib/prisma";

export const getUnusualDays = async () => {
  return await db.unusualDay.findMany();
};

//retorna todos os dias incomuns do db
