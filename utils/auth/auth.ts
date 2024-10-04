import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthConfig } from "next-auth"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "../prisma"
import { authorizeUser } from "./auth-service"

const config: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // `credentials`に型を付与
      async authorize(credentials) {
        return await authorizeUser(credentials)
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session }) {
      // if (session?.user?.id) {
      //   session.user.id = token.id;
      // }
      return session
    },
  },
  // debug: process.env.NODE_ENV === "development",
  debug: true,
  basePath: "/api/auth",
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(config)
