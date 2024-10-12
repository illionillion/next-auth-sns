"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Button,
  Container,
  FormControl,
  Heading,
  Input,
  Text,
} from "@yamada-ui/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { signup } from "@/app/actions/auth/signup"
import { Layout } from "@/components/layouts"
import type { SignupForm} from "@/schema/auth";
import { SignupSchema } from "@/schema/auth"

const Page = () => {
  const router = useRouter()
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    resolver: zodResolver(SignupSchema),
  })

  const onSubmit = async (values: SignupForm) => {
    setError("")
    const { success, error } = await signup(values)

    if (error) {
      setError(error)
    }

    if (success) {
      router.push("/auth/signin")
    }
  }

  return (
    <Layout>
      <Container as="form" m="auto" onSubmit={handleSubmit(onSubmit)}>
        <Heading textAlign="center">サインアップ</Heading>
        <FormControl
          label="Name"
          isInvalid={!!errors.name}
          errorMessage={errors.name ? errors.name.message : undefined}
        >
          <Input type="text" {...register("name")} />
        </FormControl>
        <FormControl
          label="Email"
          isInvalid={!!errors.email}
          errorMessage={errors.email ? errors.email.message : undefined}
        >
          <Input type="text" {...register("email")} />
        </FormControl>
        <FormControl
          label="Password"
          isInvalid={!!errors.password}
          errorMessage={errors.password ? errors.password.message : undefined}
        >
          <Input type="password" {...register("password")} />
        </FormControl>
        {error && <Text color="danger">{error}</Text>}
        <Button type="submit" isLoading={isSubmitting}>
          サインアップ
        </Button>
        <Button variant="link" as={Link} href="/auth/signin">
          サインイン
        </Button>
      </Container>
    </Layout>
  )
}

export default Page
