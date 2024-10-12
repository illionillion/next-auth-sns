"use server"

import { AuthError } from "next-auth"
import { getUserByEmail } from "@/data/user"
import type { SigninForm} from "@/schema/auth";
import { SigninSchema } from "@/schema/auth"
import { signIn } from "@/utils/auth/auth"

export async function signin(values: SigninForm) {
  const validatedFields = SigninSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid email or password" }
  }

  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
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
