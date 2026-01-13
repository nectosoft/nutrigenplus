import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
    const isLoggedIn = !!req.auth

    if (isAdminRoute && !isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/login", req.nextUrl))
    }

    // Double check admin role
    if (isAdminRoute && req.auth?.user?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.nextUrl))
    }
})

export const config = {
    matcher: ["/admin/:path*"]
}
