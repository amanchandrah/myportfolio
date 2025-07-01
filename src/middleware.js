import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-createxyz-project-id", "40128c62-49cb-46c1-bc31-198ed9f8ae61");
  requestHeaders.set("x-createxyz-project-group-id", "ad8ca8a0-c955-4ff0-934b-7f8f9841b101");


  request.nextUrl.href = `https://www.create.xyz/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}