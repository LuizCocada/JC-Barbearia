// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      telephone?: string | null; // Adicione esta linha
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    telephone?: string | null; // Adicione esta linha
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    telephone?: string | null; // Adicione esta linha
  }
}