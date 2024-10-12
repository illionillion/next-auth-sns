"use server"

import { createUser, getUserByEmail } from "@/data/user"
import type { SignupForm } from "@/schema/auth"
import { SignupSchema } from "@/schema/auth"
import { hashPassword } from "@/utils/password"

export const signup = async (value: SignupForm) => {
  const { success, error, data } = SignupSchema.safeParse(value)

  if (!success) {
    return {
      success: false,
      error: "Invalid fields", // 一般的なエラーメッセージ
      errors: error.errors, // 詳細なエラー配列
    }
  }

  const { name, email, password } = data

  try {
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return {
        success: false,
        error: "Email already exists",
        errors: [], // 同じemailの存在は特定のフィールドエラーではないため、空の配列を返す
      }
    }

    const hashedPassword = hashPassword(password)

    await createUser(name, email, hashedPassword)

    return { success: true }
  } catch (err) {
    console.error("Signup: ", err)

    return {
      success: false,
      error: "Server error",
      errors: [], // サーバーエラー時に詳細なエラーメッセージは不要な場合は空配列
    }
  }
}
