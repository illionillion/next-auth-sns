"use client"

import {
  Button,
  Container,
  ErrorMessage,
  FormControl,
  Input,
} from "@yamada-ui/react"
import { signIn } from "next-auth/react"
import type { FormEvent } from "react"
import { useState } from "react"
import { Layout } from "@/components/layouts"

const Page = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError(result.error)
    } else {
      // ログイン成功後の処理
      console.log("Logged in successfully")
    }
  }

  return (
    <Layout>
      <Container as="form" m="auto" onSubmit={handleSubmit}>
        <FormControl label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormControl>
        <FormControl label="Password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormControl>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Login</Button>
      </Container>
    </Layout>
  )
}

export default Page
