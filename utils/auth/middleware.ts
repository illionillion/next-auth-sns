import { NextResponse } from "next/server"
import { auth } from "@/utils/auth/auth"

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export default auth((req) => {
  const reqUrl = new URL(req.url)

  if (!req.auth && reqUrl?.pathname !== "/") {
    return NextResponse.redirect("/auth/signin")
  }
})
