import { Role } from "@prisma/client";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const MANAGER_DASHBOARD_ROUTES = ["/dashboard/users", "/dashboard/products"];

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;
    if (
      MANAGER_DASHBOARD_ROUTES.includes(pathname) &&
      request.nextauth.token?.role === Role.Manager
    ) {
      return NextResponse.rewrite(new URL(request.url, request.url));
    }
    if (
      pathname.startsWith("/dashboard") &&
      request.nextauth.token?.role !== Role.Admin
      // && request.nextauth.token?.role !== Role.Manager
    ) {
      return NextResponse.rewrite(new URL("/403", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:patch*",
    "/profile/:patch*",
    "/success/:patch*",
    "/successPayment",
    "/checkout",
  ],
};
