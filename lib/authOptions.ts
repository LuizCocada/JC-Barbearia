import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./prisma";
import { revalidatePath } from "next/cache";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Telefone e Email",
      credentials: {
        name: { label: "Nome", type: "text", placeholder: "Seu nome" },
        telefone: {
          label: "Telefone",
          type: "text",
          placeholder: "Seu telefone",
        },
        email: { label: "Email", type: "email", placeholder: "seu@email.com" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, telefone, name } = credentials ?? {};

        // Verifica se o usuário existe com o email fornecido
        let user = await db.user.findUnique({ where: { email } });

        if (user) {
          // Atualiza o número de telefone se necessário
          if (user.telephone !== telefone) {
            user = await db.user.update({
              where: { email },
              data: {
                telephone: telefone,
                name: name,
              },
            });
          }
        } else {
          // Cria um novo usuário com email e telefone
          user = await db.user.create({
            data: {
              name: name,
              email,
              telephone: telefone,
            },
          });
        }

        return user || null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.telephone = user.telephone; // Adicione esta linha
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.telephone = token.telephone as string; // Adicione esta linha
      return session;
    },
  },
  events: {
    async signIn() {
      revalidatePath("/");
    },
  },
  secret: process.env.AUTH_SECRET,
};

// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { AuthOptions } from "next-auth";
// import { Adapter } from "next-auth/adapters";
// import GoogleProvider from "next-auth/providers/google";
// import { db } from "./prisma";

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

// export const authOptions: AuthOptions = {
//   adapter: PrismaAdapter(db) as Adapter,
//   providers: [
//     GoogleProvider({
//       clientId: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.user.id = token.id;
//       return session;
//     },
//   },
//   secret: process.env.AUTH_SECRET, //isto para validação em produção
// };

//Geralmente precisariamos setar o id do usuario que vem de SESSION como ANY para burlar a typagem do typescript, mas como fizemos a tipagem no arquivo types/next-auth.d.ts, não precisamos fazer isso.
