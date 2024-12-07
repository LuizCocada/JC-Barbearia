"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteTimeAvailableProps {
  id: string;
}

export const deleteTimeAvailable = async ({ id }: DeleteTimeAvailableProps) => {
  await db.times.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/admin");
};
