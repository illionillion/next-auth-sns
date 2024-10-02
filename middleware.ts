import { NextResponse } from "next/server"
import { auth as middleware } from "@/utils/auth/auth"

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

export default middleware((req) => {
  const reqUrl = new URL(req.url)

  console.log("auth", reqUrl.pathname)

  if (!req.auth && reqUrl?.pathname === "/") {
    return NextResponse.redirect(new URL("/auth/signin", req.url))
  } else if (req.auth && reqUrl?.pathname === "/auth/signin") {
    return NextResponse.redirect(new URL("/", req.url))
  }
})
