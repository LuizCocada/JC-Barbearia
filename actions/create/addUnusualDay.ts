"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface createUnusualDayParams {
  date: Date;
}

export const addUnusualDay = async (params: createUnusualDayParams) => {
    
  await db.unusualDay.create({
    data: params,
  });

  revalidatePath("/");
  revalidatePath("/admin");
};
