"use server"

import { revalidatePath } from "next/cache";
import { db } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

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
  revalidatePath("/services/[id]"); //limpa o cache após criar um agendamento
  revalidatePath("/bookings"); //revalidando os dados após crioar um agendamento
};

//podemos verificar se o ID recebido bate com o id da sessao atual.

// if (params.userId != (user.user as any).id) {
//   //verificando se o Id do user recebido de params bate com a sessao atual de user.
//   throw new Error("Error inesperado de autenticação")
// }

// ou ao invés de verificar, já pegar a sessao atual logada e setar ela no userId, sem precisar passar na interface a prop userId

// await db.booking.create({
//     data: {...params, userId: (user.user as any).id}
//   })
