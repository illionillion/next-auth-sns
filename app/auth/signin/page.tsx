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
import { useState } from "react"
import { useForm } from "react-hook-form"
import { signin } from "@/app/actions/auth/signin"
import { Layout } from "@/components/layouts"
import type { SigninForm} from "@/schema/auth";
import { SigninSchema } from "@/schema/auth"

const Page = () => {
  const [error, setError] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninForm>({
    resolver: zodResolver(SigninSchema),
  })

  const onSubmit = async (values: SigninForm) => {
    setError("")
    const { email, password } = values
    const result = await signin({ email, password })
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <Layout>
      <Container as="form" m="auto" onSubmit={handleSubmit(onSubmit)}>
        <Heading textAlign="center">サインイン</Heading>
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
        {error ? <Text color="danger">{error}</Text> : undefined}
        <Button type="submit" isLoading={isSubmitting}>
          サインイン
        </Button>
        <Button variant="link" as={Link} href="/auth/signup">
          サインアップ
        </Button>
      </Container>
    </Layout>
  )
}

export default Page
