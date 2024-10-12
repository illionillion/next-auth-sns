// src/services/authService.ts
import { comparePassword } from "../password"
import { getUserByEmail } from "@/data/user"
import { SigninSchema } from "@/schema/auth"

export async function authorizeUser(
  credentials: Partial<Record<"email" | "password", unknown>>,
) {
  // 型チェック
  const { success, data } = SigninSchema.safeParse(credentials)

  if (!success) {
    return null
  }

  const user = await getUserByEmail(data.email)

  if (!user) {
    return null
  }

  const isValidPassword = comparePassword(data.password, user.password)

  if (!isValidPassword) {
    return null
  }

  return user
}
