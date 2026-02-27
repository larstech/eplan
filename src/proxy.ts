import { auth } from "@/lib/auth/server"
import { NextRequest, NextResponse } from "next/server"

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (request.headers.has("next-action") || pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  const { data: session } = await auth.getSession()

  if (pathname.startsWith("/auth/sign-in")) {
    if (session) {
      return NextResponse.redirect(new URL("/schedule", request.url))
    }

    return NextResponse.next()
  }

  if (!session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }

  if (pathname.startsWith("/schedule")) {
    return NextResponse.next()
  }

  if (session.user.role !== "admin") {
    return NextResponse.redirect(new URL("/schedule", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
