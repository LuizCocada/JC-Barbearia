// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRETT });
  const { pathname } = req.nextUrl;

  // Permite o acesso às páginas de login e API de autenticação
  if (pathname.startsWith("/syslogin") || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Verifica se o usuário está autenticado
  if (pathname.startsWith("/admin")) {
    if (!token || token.id !== process.env.ID_ADMIN) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/syslogin";
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
