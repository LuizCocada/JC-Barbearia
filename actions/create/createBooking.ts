"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import gzappy from "gzappy-js";

interface createBookingParams {
  userId: string;
  serviceId: string;
  date: Date;
}

export const createBooking = async (params: createBookingParams) => {
  const user = await getServerSession(authOptions);

  if (!user) {
    throw new Error("Usuário não autenticado");
  }
  if (params.userId != user.user.id) {
    throw new Error("Error inesperado de autenticação");
  }

  await db.booking.create({
    data: params,
  });

  revalidatePath("/bookings");
  revalidatePath("/");

  const formattedDate = params.date.toLocaleString("pt-BR", {
    timeZone: "America/Fortaleza",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const GZAPPY_API_TOKEN = process.env.GZAPPY_API_TOKEN;
  const GZAPPY_INSTANCE_ID = process.env.GZAPPY_INSTANCE_ID;

  const gClient = new gzappy({
    token: GZAPPY_API_TOKEN,
    instanceId: GZAPPY_INSTANCE_ID,
  });

  const messages = [
    `
    Agendamento confirmado ✅
    Nome: ${user.user.name}
    telefone: ${user.user.telephone}
    Dia e hora: ${formattedDate}
    `,
  ];
  const phones = [`55${user.user.telephone}`];

  gClient
    .sendMessage(messages, phones)
    .then((response) => console.log(`resposta ${response}`))
    .catch((error) => console.error(error));
};
