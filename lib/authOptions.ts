import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { db } from "./prisma";

import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      id: "user-credentials",
      name: "Credentials",
      credentials: {
        name: { label: "Nome", type: "text" },
        number: { label: "Número", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const { name, number } = credentials;

        let user = await db.user.findFirst({
          where: { telephone: number },
        });

        if (user && user.name !== name) {
          user = await db.user.update({
            where: { id: user.id },
            data: {
              name,
            },
          });
        }

        if (!user) {
          user = await db.user.create({
            data: {
              name,
              telephone: number,
            },
          });
        }

        if (user) {
          return user;
        }

        return null;
      },
    }),

    CredentialsProvider({
      id: "admin-credentials",
      name: "Admin Credentials",
      credentials: {
        username: { label: "Nome", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const isValid =
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD;
          
        if (isValid) {
          const adminId = process.env.ID_ADMIN;
          if (!adminId) {
            throw new Error("ID_ADMIN não está definido nas variáveis de ambiente");
          }
          return { id: adminId, name: process.env.ADMIN_USERNAME };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.telephone = user.telephone;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.telephone = token.telephone;
      session.user.id = token.id;
      return session;
    },
  },
  secret: process.env.AUTH_SECRET, //assinatura para JWT
};
