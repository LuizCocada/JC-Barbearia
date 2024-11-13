
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import { db } from "./prisma";

import CredentialsProvider from "next-auth/providers/credentials";

// const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
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

// LOGIN GOOGLE

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
