"use server"

import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"
import { signIn } from "@/utils/auth/auth"

export async function signin({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }

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
