// src/services/authService.ts
import { comparePassword } from "../password"
import { prisma } from "../prisma"

export async function authorizeUser(
  credentials: Partial<Record<"email" | "password", unknown>>,
) {
  // 型チェック
  if (
    typeof credentials?.email !== "string" ||
    typeof credentials?.password !== "string"
  ) {
    console.log("1")

    throw new Error("Invalid credentials format")
  }

  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  })

  if (!user) {
    console.log("2")

    throw new Error("No user found with the provided email")
  }

  const isValidPassword = comparePassword(credentials.password, user.password)

  if (!isValidPassword) {
    console.log("3") // ここでエラー出る

    throw new Error("Invalid password")
  }

  return user
}
