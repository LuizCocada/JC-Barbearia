"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface UpdateStateprops {
  state: boolean;
}

export const UpdateState = async ({ state }: UpdateStateprops) => {
  await db.state.update({
    data: {
      isActive: state,
    },
    where: {
      id: 4,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/agendamentos");

};
