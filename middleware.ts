import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define paths that should be excluded from authentication
  const isPublicPath =
    path === "/admin/login" ||
    path.startsWith("/api/auth/") ||
    path.startsWith("/api/seed") ||
    path.includes("/_next/") ||
    path.includes("/favicon.ico")

  // Only protect admin routes that aren't public
  if (path.startsWith("/admin") && !isPublicPath) {
    const token = request.cookies.get("token")?.value

    if (!token) {
      const url = new URL("/admin/login", request.url)
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}

