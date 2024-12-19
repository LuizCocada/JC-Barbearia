"use server";

import { authOptions } from "@/lib/authOptions";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const getConcludedBookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return [];
  }

  return await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lte: new Date(), //filtrando apenas os agendamentos que as dadas sao menores que o dia, mes e hora de hoje.
      },
    },
    include: {
      service: true,
      user: true,
    },
    orderBy: {
      date: "asc",
    },
  });
};
