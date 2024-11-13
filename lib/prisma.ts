import { PrismaClient } from "@prisma/client";

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
declare global {                                            //armazena instancia do prismaClient em ambientes que suportam o hotloading(geralmente em desenvolvimento)
    // eslint-disable-next-line no-var                                      
    var cachedPrisma: PrismaClient                      //isso evita a criação de varias instancia do Prisma toda vez que o codigo for recarregado, já que o hotloading reinicia o codigo
}                                                       //mas mantém o estado global.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

let prisma: PrismaClient // Declara uma variável prisma que vai armazenar a instância do PrismaClient. Essa variável será inicializada conforme a lógica seguinte.

if(process.env.NODE_ENV == "production"){ //Se o ambiente for de produção, cria uma nova instância do PrismaClient diretamente e a atribui à variável prisma.
    prisma = new PrismaClient() 
}//Caso contrário, se o ambiente não for de produção (presumivelmente desenvolvimento), a lógica dentro do bloco else será executada.
else{
    if(!global.cachedPrisma){
        global.cachedPrisma = new PrismaClient()// Se cachedPrisma ainda não existir, cria uma nova instância de PrismaClient e a armazena na variável global. Essa instância será reutilizada em futuras execuções do código.
    }

    prisma = global.cachedPrisma //Se cachedPrisma já existir, simplesmente reutiliza essa instância, atribuindo-a à variável prisma.
}

export const db = prisma //exporta db


// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Diferença entre os ambientes:

// PRODUÇÃO: Nova instância do PrismaClient é criada sempre que o código é executado.
// DESENVOLVIMENTO: Uma única instância do PrismaClient é reutilizada durante o hot-reloading, evitando a criação de múltiplas instâncias.

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------






