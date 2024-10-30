"use server";

import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const GetConfirmedBookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return [];
  }

  return await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(), //filtrando apenas os agendamentos que as dadas sao maiores que o dia, mes e hora de hoje.
      },
    },
    include: {
      service: true,
    },
    orderBy: {
      date: "asc",
    },
  });
};
