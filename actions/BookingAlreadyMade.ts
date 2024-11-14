"use server";

import { db } from "@/lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

interface GetBookingProps {
  serviceId: string;
  date: Date;
}

export const getBookings = ({ date, serviceId }: GetBookingProps) => {
  return db.booking.findMany({
    where: {
      date: {
        //retorna os agendamentos do dia passado por 'date'
        lte: endOfDay(date), //verificando menor ou igual ao fim do dia.
        gte: startOfDay(date), //verificando maior ou igual ao começo do dia.
      },
      serviceId: {
        equals: serviceId,
      },
    },
  });
};

//esta funcao por fazer consulta no banco de dados, deveria ter um async. Porém ela retorna sem atribuir o conteudo da busca a nenhuma variavel. neste caso, como foi feito, quando chamarmos à função
// será await GetBooking({props}).
