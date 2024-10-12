import { z } from "zod"

export const SigninSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
})

export type SigninForm = z.infer<typeof SigninSchema>
