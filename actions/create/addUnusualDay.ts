"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface createUnusualDayParams {
  open: Date;
  close: Date;
}

export const addUnusualDay = async (params: createUnusualDayParams) => {
    
  await db.unusualDay.create({
    data: {
      open: params.open,
      close: params.close,
    }
  });

  revalidatePath("/");
  revalidatePath("/admin");
};
