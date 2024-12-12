"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteUnusualDaysProps {
  id: string;
}

export const deleteUnusualDays = async ({ id }: DeleteUnusualDaysProps) => {
  await db.unusualDay.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/admin");
};
