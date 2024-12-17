"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import gzappy from "gzappy-js";
import { User } from "@prisma/client";

interface DeleteBookingProps {
  data: {
    bookingId: string;
    date: Date;
    user: User;
  };
}

export const deleteBooking = async ({ data }: DeleteBookingProps) => {
  await db.booking.delete({
    where: {
      id: data.bookingId,
    },
  });

  revalidatePath("/bookings");
  revalidatePath("/admin/agendamentos");

  const date = typeof data.date === "string" ? new Date(data.date) : data.date;
  const formattedDate = date.toLocaleString("pt-BR", {
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
    Agendamento cancelado ❌
    Nome: ${data.user.name}
    telefone: ${data.user.telephone}
    Dia e hora: ${formattedDate}
    `,
  ];
  const phones = [`55${data.user.telephone}`];

  gClient
    .sendMessage(messages, phones)
    .then((response) => console.log(`resposta ${response}`))
    .catch((error) => console.error(error));
};
