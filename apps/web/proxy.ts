import { SESSION_COOKIE } from "@rhea/contracts";
import { type NextRequest, NextResponse } from "next/server";

const proxy = (request: NextRequest) => {
  const response = request.cookies.has(SESSION_COOKIE)
    ? NextResponse.next()
    : NextResponse.redirect(new URL("/", request.url));

  return response;
};

export default proxy;

export const config = {
  matcher: ["/q/:path*", "/result"],
};
