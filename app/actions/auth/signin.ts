"use server"

import { AuthError } from "next-auth"
import { signIn } from "@/utils/auth/auth"

export async function signin({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    await signIn("credentials", {
      email,
      password,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error
  }
}
