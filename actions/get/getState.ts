"use server";

import { db } from "@/lib/prisma";

export const GetState = async () => {
  const state = await db.state.findUnique({
    where: {
      id: 4,
    },
    select: {
      isActive: true,
    },
  });
  return state?.isActive ?? false;
};