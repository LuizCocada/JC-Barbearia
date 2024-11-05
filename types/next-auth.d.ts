import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      telephone?: string | null;
    };
  }

  interface User {
    id: string;
    name?: string | null;
    telephone?: string | null;
    password?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    telephone?: string | null;
  }
}
