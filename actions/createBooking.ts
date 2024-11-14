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

  revalidatePath("/services/[id]");
  revalidatePath("/bookings");
  revalidatePath("/");

  try {
    // Definição das variáveis de ambiente
    const GZAPPY_API_TOKEN = process.env.GZAPPY_API_TOKEN;
    const GZAPPY_INSTANCE_ID = process.env.GZAPPY_INSTANCE_ID;

    // Criação de uma instância do gzappy client
    const gClient = new gzappy({
      token: GZAPPY_API_TOKEN,
      instanceId: GZAPPY_INSTANCE_ID,
    });

    // Enviando mensagens
    const messages = [
      "Olá, tudo bem?",
      "Você tem um novo agendamento marcado, Sr Cliente",
    ];
    const phones = ["5511999999999", "5511333333333"];

    gClient
      .sendMessage(messages, phones)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  } catch (error) {
    console.log(error);
  }
};

//------------------------------------------------------------------------------------------------------------------------------------

//podemos verificar se o ID recebido bate com o id da sessao atual.

// if (params.userId != (user.user as any).id) {
//   //verificando se o Id do user recebido de params bate com a sessao atual de user.
//   throw new Error("Error inesperado de autenticação")
// }

// ou ao invés de verificar, já pegar a sessao atual logada e setar ela no userId, sem precisar passar na interface a prop userId

// await db.booking.create({
//     data: {...params, userId: (user.user as any).id}
//   })
