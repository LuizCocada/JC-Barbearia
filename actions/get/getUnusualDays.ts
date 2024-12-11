"use server";

import { db } from "@/lib/prisma";

export const getUnusualDays = () => {
  return db.unusualDay.findMany();
};

//retorna todos os dias incomuns do db
