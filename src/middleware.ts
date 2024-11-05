import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Add pathname to headers for server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  // Check auth for protected routes
  if (request.nextUrl.pathname.startsWith("/(auth)")) {
    const token = await getToken({ req: request });

    if (!token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/(auth)/:path*", // Protege todas as rotas dentro do grupo auth
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Aplica em todas as rotas exceto api e assets
  ],
};
