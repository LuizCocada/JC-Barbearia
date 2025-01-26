"use server";

import { db } from "@/lib/prisma";

interface GetBookingProps {
  dateProp: Date;
}

export const bookingAlreadyMade = async ({ dateProp }: GetBookingProps) => {

  const date  = new Date(dateProp);

  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  const startOfTodayUTC = new Date(Date.UTC(year, month, day, 3, 0, 0, 0));
  //00:00 => fim dia UTC (02:59:59)
  const endOfTodayUTC = new Date(startOfTodayUTC.getTime() + (24 * 60 * 60 * 1000) - 1);
  


  console.log(`date recebido de props: ${dateProp}`);
  console.log(`Inicio do dia UTC: ${startOfTodayUTC.toISOString()}`);
  console.log(`Fim do dia UTC: ${endOfTodayUTC.toISOString()}`);




  return await db.booking.findMany({
    where: {
      date: {
        gte: startOfTodayUTC, 
        lte: endOfTodayUTC, 
      },
    },
  });
};

// "use server";

// import { db } from "@/lib/prisma";
// import { endOfDay, startOfDay } from "date-fns";

// interface GetBookingProps {
//   date: Date;
// }

// export const bookingAlreadyMade = ({ date }: GetBookingProps) => {
//   return db.booking.findMany({
//     where: {
//       date: {
//         //retorna os agendamentos do dia passado por 'date'
//         lte: endOfDay(date), //verificando menor ou igual ao fim do dia.
//         gte: startOfDay(date), //verificando maior ou igual ao começo do dia.
//       },
//     },
//   });
// };


//Busca os horários disponíveis para agendamento

//esta funcao por fazer consulta no banco de dados, deveria ter um async. Porém ela retorna sem atribuir o conteudo da busca a nenhuma variavel. neste caso, como foi feito, quando chamarmos à função
// será await GetBooking({props}).
