// src/services/authService.ts
import { comparePassword } from "../password"
import { getUserByEmail } from "@/data/user"

export async function authorizeUser(
  credentials: Partial<Record<"email" | "password", unknown>>,
) {
  // 型チェック
  if (
    typeof credentials?.email !== "string" ||
    typeof credentials?.password !== "string"
  ) {
    return null
  }

  const user = await getUserByEmail(credentials.email)

  if (!user) {
    return null
  }

  const isValidPassword = comparePassword(credentials.password, user.password)

  if (!isValidPassword) {
    return null
  }

  return user
}
