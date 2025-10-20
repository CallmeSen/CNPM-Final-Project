import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  void request;
  // Allow Next.js to serve the requested route directly so dynamic segments resolve properly.
  return NextResponse.next();
}
