"use client"

import {
  Button,
  Container,
  ErrorMessage,
  FormControl,
  Heading,
  Input,
} from "@yamada-ui/react"
import Link from "next/link"
import type { FormEvent} from "react";
import { useState } from "react"
import { Layout } from "@/components/layouts"

const Page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name || !email || !password) {
      setError("セットされてません")
      return
    }
    // const result = await signIn("credentials", {
    //     redirectTo: "/",
    //     email,
    //     password,
    // })

    // if (result?.error) {
    //     setError(result.error)
    // } else {
    //     // ログイン成功後の処理
    //     console.log("Logged in successfully")
    // }
  }
  return (
    <Layout>
      <Container as="form" m="auto" onSubmit={handleSubmit}>
        <Heading textAlign="center">サインアップ</Heading>
        <FormControl label="Name">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormControl>
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
        <Button type="submit">サインアップ</Button>
        <Button variant="link" as={Link} href="/auth/signin">
          サインイン
        </Button>
      </Container>
    </Layout>
  )
}

export default Page
