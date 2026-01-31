import { auth } from "@/lib/auth/server"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(request: NextRequest) {
  if (request.headers.has("next-action")) {
    return
  }

  const { data: session } = await auth.getSession()
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/auth/sign-in")) {
    return
  }

  if (!session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }

  if (pathname.startsWith("/schedule")) {
    return
  }

  if (session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/schedule", request.url))
  }

  return
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
