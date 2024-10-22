import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./prisma";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session; // retornando o id do usuario (que é um token) para a sessao permitindo tratar os agendamentos em lados do client e servidor.
    },
  },
  secret: process.env.NEXT_AUTH_SECRET, //isto para validação em produção
};

//Geralmente precisariamos setar o id do usuario que vem de SESSION como ANY para burlar a typagem do typescript, mas como fizemos a tipagem no arquivo types/next-auth.d.ts, não precisamos fazer isso.
